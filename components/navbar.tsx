"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Shield, Terminal, Code, Lock, User, Home, BookOpen, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`border-b border-green-500/30 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90" : "bg-black/80"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-purple-600 rounded-lg blur opacity-25"></div>
              <span className="relative text-2xl font-bold text-green-400 neon-text font-mono">
                &lt;CipherHacker/&gt;
              </span>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-green-400 hover:text-green-300 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1 items-center">
            <NavLink href="/" icon={<Home size={16} />} active={pathname === "/"}>
              Home
            </NavLink>

            <NavLink href="/ciphers" icon={<Lock size={16} />} active={pathname === "/ciphers"}>
              Cipher Games
            </NavLink>

            <NavLink href="/cybersecurity" icon={<Shield size={16} />} active={pathname === "/cybersecurity"}>
              Cybersecurity
            </NavLink>

            <NavLink href="/dsa" icon={<Code size={16} />} active={pathname === "/dsa"}>
              DSA Visualizer
            </NavLink>

            <NavLink href="/terminal" icon={<Terminal size={16} />} active={pathname === "/terminal"}>
              Terminal
            </NavLink>

            <NavLink href="/profile" icon={<User size={16} />} active={pathname === "/profile"}>
              Profile
            </NavLink>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-2 border-green-500/30 text-green-400">
                  <BookOpen size={16} className="mr-2" /> Resources <ChevronDown size={14} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border border-green-500/30">
                <DropdownMenuItem className="text-green-400 hover:text-green-300 focus:text-green-300 hover:bg-green-900/20 focus:bg-green-900/20">
                  <Link href="/resources/cryptography" className="flex w-full">
                    Cryptography Basics
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-green-400 hover:text-green-300 focus:text-green-300 hover:bg-green-900/20 focus:bg-green-900/20">
                  <Link href="/resources/network-security" className="flex w-full">
                    Network Security
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-green-400 hover:text-green-300 focus:text-green-300 hover:bg-green-900/20 focus:bg-green-900/20">
                  <Link href="/resources/web-security" className="flex w-full">
                    Web Security
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3">
            <MobileNavLink href="/" onClick={toggleMenu} icon={<Home size={16} />}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/ciphers" onClick={toggleMenu} icon={<Lock size={16} />}>
              Cipher Games
            </MobileNavLink>
            <MobileNavLink href="/cybersecurity" onClick={toggleMenu} icon={<Shield size={16} />}>
              Cybersecurity
            </MobileNavLink>
            <MobileNavLink href="/dsa" onClick={toggleMenu} icon={<Code size={16} />}>
              DSA Visualizer
            </MobileNavLink>
            <MobileNavLink href="/terminal" onClick={toggleMenu} icon={<Terminal size={16} />}>
              Terminal
            </MobileNavLink>
            <MobileNavLink href="/profile" onClick={toggleMenu} icon={<User size={16} />}>
              Profile
            </MobileNavLink>

            <div className="pt-2 border-t border-green-500/20">
              <div className="px-3 py-2 text-sm text-green-400 font-mono">Resources:</div>
              <MobileNavLink
                href="/resources/cryptography"
                onClick={toggleMenu}
                icon={<BookOpen size={16} />}
                className="pl-6"
              >
                Cryptography Basics
              </MobileNavLink>
              <MobileNavLink
                href="/resources/network-security"
                onClick={toggleMenu}
                icon={<BookOpen size={16} />}
                className="pl-6"
              >
                Network Security
              </MobileNavLink>
              <MobileNavLink
                href="/resources/web-security"
                onClick={toggleMenu}
                icon={<BookOpen size={16} />}
                className="pl-6"
              >
                Web Security
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const NavLink = ({
  href,
  icon,
  active,
  children,
}: { href: string; icon: React.ReactNode; active: boolean; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      className={`text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 relative group px-3 py-2 rounded-md flex items-center ${
        active ? "bg-green-900/20 text-green-300" : "hover:bg-green-900/10"
      }`}
    >
      <span className="mr-2">{icon}</span>
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ${active ? "scale-x-100" : ""}`}
      ></span>
    </Link>
  )
}

const MobileNavLink = ({
  href,
  onClick,
  icon,
  className = "",
  children,
}: {
  href: string
  onClick: () => void
  icon: React.ReactNode
  className?: string
  children: React.ReactNode
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block text-green-400 hover:text-green-300 font-mono text-sm py-2 px-3 rounded hover:bg-green-900/20 transition-colors duration-200 flex items-center ${className}`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  )
}

export default Navbar

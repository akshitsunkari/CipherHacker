"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const CipherTutorials = () => {
  const [activeTab, setActiveTab] = useState("caesar")

  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-400 neon-text font-mono">Cipher Tutorials</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn about different encryption techniques, their history, and how to use them to secure your communications.
        </p>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">cipher-tutorials.sh</div>
        </div>

        <div className="terminal-content">
          <div className="text-green-400 font-mono mb-4">
            <span className="text-purple-400">$</span> ./learn-ciphers --interactive
          </div>

          <Tabs defaultValue="caesar" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black border border-green-500/30 mb-4">
              <TabsTrigger value="caesar" className="data-[state=active]:bg-green-900/20">
                Caesar
              </TabsTrigger>
              <TabsTrigger value="vigenere" className="data-[state=active]:bg-green-900/20">
                Vigenère
              </TabsTrigger>
              <TabsTrigger value="morse" className="data-[state=active]:bg-green-900/20">
                Morse
              </TabsTrigger>
              <TabsTrigger value="xor" className="data-[state=active]:bg-green-900/20">
                XOR
              </TabsTrigger>
              <TabsTrigger value="modern" className="data-[state=active]:bg-green-900/20">
                Modern
              </TabsTrigger>
            </TabsList>

            <TabsContent value="caesar" className="space-y-4">
              <Card className="border-green-500/30 bg-black/70">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Caesar Cipher</h3>
                  <p className="text-gray-300 mb-4">
                    The Caesar cipher is one of the earliest and simplest encryption techniques. Named after Julius
                    Caesar, who reportedly used it to communicate with his generals, this substitution cipher works by
                    shifting each letter in the plaintext by a fixed number of positions down the alphabet.
                  </p>

                  <div className="bg-black border border-green-500/30 rounded-md p-4 mb-4 font-mono">
                    <p className="text-gray-400 mb-2">Example with shift of 3:</p>
                    <p className="text-green-400">Plaintext: HELLO WORLD</p>
                    <p className="text-purple-400">Ciphertext: KHOOR ZRUOG</p>
                  </div>

                  <Accordion type="single" collapsible className="border-green-500/30">
                    <AccordionItem value="algorithm" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">How It Works</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          For each letter in the plaintext, the Caesar cipher substitutes it with a letter that is a
                          fixed number of positions down the alphabet. This fixed number is the "key" or "shift".
                        </p>
                        <p className="mb-2">For example, with a shift of 3:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>A becomes D</li>
                          <li>B becomes E</li>
                          <li>C becomes F</li>
                          <li>...</li>
                          <li>Z becomes C (wrapping around to the beginning)</li>
                        </ul>
                        <p>
                          To decrypt, you simply shift in the opposite direction by the same amount. With 26 letters in
                          the English alphabet, there are only 25 possible shifts to try, making it very easy to break
                          with brute force.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="formula" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Mathematical Formula
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          The Caesar cipher can be expressed mathematically using modular arithmetic:
                        </p>
                        <div className="bg-black border border-green-500/30 rounded-md p-3 mb-2 font-mono">
                          <p>For encryption: E(x) = (x + k) mod 26</p>
                          <p>For decryption: D(x) = (x - k) mod 26</p>
                        </div>
                        <p>
                          Where x is the position of the plaintext letter in the alphabet (0-25), k is the shift value,
                          and mod 26 ensures the result wraps around the alphabet.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Security Analysis
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          The Caesar cipher is extremely weak by modern standards for several reasons:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            Limited keyspace: With only 25 possible keys, an attacker can try all possibilities in
                            seconds.
                          </li>
                          <li>
                            Preserves frequency: Letter frequencies in the ciphertext match those of the language,
                            making it vulnerable to frequency analysis.
                          </li>
                          <li>
                            No diffusion: Each letter is encrypted independently, so patterns in the plaintext remain
                            visible in the ciphertext.
                          </li>
                        </ul>
                        <p>
                          Despite its weakness, the Caesar cipher is an important educational tool and forms the basis
                          for understanding more complex substitution ciphers.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Try It in Cipher Games</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vigenere" className="space-y-4">
              <Card className="border-green-500/30 bg-black/70">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Vigenère Cipher</h3>
                  <p className="text-gray-300 mb-4">
                    The Vigenère cipher is a method of encrypting alphabetic text by using a simple form of
                    polyalphabetic substitution. It was invented by Giovan Battista Bellaso in 1553, but was
                    misattributed to Blaise de Vigenère in the 19th century.
                  </p>

                  <div className="bg-black border border-green-500/30 rounded-md p-4 mb-4 font-mono">
                    <p className="text-gray-400 mb-2">Example with key "KEY":</p>
                    <p className="text-green-400">Plaintext: HELLO WORLD</p>
                    <p className="text-purple-400">Ciphertext: RIJVS UYVJN</p>
                  </div>

                  <Accordion type="single" collapsible className="border-green-500/30">
                    <AccordionItem value="algorithm" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">How It Works</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          The Vigenère cipher uses a keyword that repeats to match the length of the plaintext. Each
                          letter of the keyword determines the shift amount for the corresponding letter in the
                          plaintext.
                        </p>
                        <p className="mb-2">For example, with the keyword "KEY":</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>K shifts by 10 (K is the 11th letter, so shift by 10)</li>
                          <li>E shifts by 4 (E is the 5th letter, so shift by 4)</li>
                          <li>Y shifts by 24 (Y is the 25th letter, so shift by 24)</li>
                        </ul>
                        <p>
                          This pattern repeats for the entire message. So for "HELLO", the shifts would be 10, 4, 24,
                          10, 4 (KEY-KE).
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Security Analysis
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          The Vigenère cipher is significantly stronger than simple substitution ciphers like the Caesar
                          cipher:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            Larger keyspace: The number of possible keys depends on the keyword length, making brute
                            force attacks more difficult.
                          </li>
                          <li>
                            Disrupts frequency analysis: Simple frequency analysis is ineffective because each letter
                            can be encrypted to different ciphertext letters.
                          </li>
                        </ul>
                        <p className="mb-2">However, it still has weaknesses:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            Repeating key: The repeating nature of the key creates patterns that can be exploited using
                            techniques like the Kasiski examination.
                          </li>
                          <li>
                            Known-plaintext attacks: If an attacker knows part of the plaintext, they can determine
                            parts of the key.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="breaking" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Breaking the Cipher
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">The Vigenère cipher can be broken using several methods:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Kasiski examination:</strong> Identifies repeated segments in the ciphertext to
                            determine the key length.
                          </li>
                          <li>
                            <strong>Index of coincidence:</strong> Measures the unevenness of letter frequencies to
                            estimate the key length.
                          </li>
                          <li>
                            <strong>Frequency analysis:</strong> Once the key length is known, the ciphertext can be
                            split into groups, each encrypted with a single shift, which can be analyzed separately.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Try It in Cipher Games</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="morse" className="space-y-4">
              <Card className="border-green-500/30 bg-black/70">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Morse Code</h3>
                  <p className="text-gray-300 mb-4">
                    Morse code is a method of encoding text characters as standardized sequences of two different signal
                    durations, called dots and dashes (or dits and dahs). It was developed by Samuel Morse and Alfred
                    Vail in the 1830s and 1840s for use with the telegraph.
                  </p>

                  <div className="bg-black border border-green-500/30 rounded-md p-4 mb-4 font-mono">
                    <p className="text-gray-400 mb-2">Example:</p>
                    <p className="text-green-400">Plaintext: SOS</p>
                    <p className="text-purple-400">Morse code: ... --- ...</p>
                  </div>

                  <Accordion type="single" collapsible className="border-green-500/30">
                    <AccordionItem value="encoding" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Encoding System
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">Morse code represents characters using:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Dot (.):</strong> A short signal, typically represented visually as a dot
                          </li>
                          <li>
                            <strong>Dash (-):</strong> A longer signal, typically represented visually as a dash
                          </li>
                          <li>
                            <strong>Space:</strong> Used to separate characters and words
                          </li>
                        </ul>
                        <p className="mb-2">Common Morse code patterns:</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p>A: .-</p>
                            <p>B: -...</p>
                            <p>C: -.-.</p>
                            <p>D: -..</p>
                            <p>E: .</p>
                          </div>
                          <div>
                            <p>S: ...</p>
                            <p>O: ---</p>
                            <p>1: .----</p>
                            <p>2: ..---</p>
                            <p>3: ...--</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="history" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Historical Significance
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          Morse code revolutionized long-distance communication in the 19th century. It was widely used
                          for:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Telegraphy:</strong> The primary method of rapid long-distance communication before
                            the telephone
                          </li>
                          <li>
                            <strong>Maritime communication:</strong> Ship-to-shore and ship-to-ship communication
                          </li>
                          <li>
                            <strong>Aviation:</strong> Early aircraft navigation and communication
                          </li>
                          <li>
                            <strong>Military:</strong> Field communications, especially before radio voice transmission
                            was reliable
                          </li>
                        </ul>
                        <p>
                          The famous SOS distress signal (... --- ...) was adopted internationally in 1908 and remains
                          recognizable today.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="modern" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Modern Applications
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          While no longer the primary means of communication, Morse code still has relevant applications
                          today:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Amateur radio:</strong> Still used by ham radio operators worldwide
                          </li>
                          <li>
                            <strong>Accessibility:</strong> Provides communication options for people with certain
                            disabilities
                          </li>
                          <li>
                            <strong>Emergency situations:</strong> Can be transmitted through simple means (light,
                            sound, movement) when other communication methods fail
                          </li>
                          <li>
                            <strong>Cultural references:</strong> Frequently appears in media, puzzles, and games
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Try It in Cipher Games</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="xor" className="space-y-4">
              <Card className="border-green-500/30 bg-black/70">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">XOR Cipher</h3>
                  <p className="text-gray-300 mb-4">
                    The XOR cipher is a simple encryption algorithm that operates on the principle of the exclusive OR
                    (XOR) logical operation. It's a type of additive cipher that forms the basis for many more complex
                    encryption systems.
                  </p>

                  <div className="bg-black border border-green-500/30 rounded-md p-4 mb-4 font-mono">
                    <p className="text-gray-400 mb-2">Example with key value 65 (ASCII 'A'):</p>
                    <p className="text-green-400">Plaintext: HACK</p>
                    <p className="text-purple-400">Ciphertext (hex): 0x08 0x00 0x0F 0x0B</p>
                  </div>

                  <Accordion type="single" collapsible className="border-green-500/30">
                    <AccordionItem value="operation" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">XOR Operation</AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          XOR (exclusive OR) is a binary operation that takes two equal-length bit patterns. If the
                          corresponding bits are different, the result is 1. If they are the same, the result is 0.
                        </p>
                        <p className="mb-2">Truth table for XOR:</p>
                        <div className="bg-black border border-green-500/30 rounded-md p-3 mb-2 font-mono">
                          <p>0 ⊕ 0 = 0</p>
                          <p>0 ⊕ 1 = 1</p>
                          <p>1 ⊕ 0 = 1</p>
                          <p>1 ⊕ 1 = 0</p>
                        </div>
                        <p>
                          A key property of XOR is that it's its own inverse: A ⊕ B ⊕ B = A. This makes it perfect for
                          encryption, as the same operation can be used for both encryption and decryption.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="cipher" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        How the Cipher Works
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">The XOR cipher works as follows:</p>
                        <ol className="list-decimal list-inside mb-2">
                          <li>Each byte of the plaintext is XORed with a key value</li>
                          <li>The result is the ciphertext</li>
                          <li>To decrypt, XOR the ciphertext with the same key</li>
                        </ol>
                        <p className="mb-2">Example with the ASCII value of 'A' (65) as the key:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            'H' (72) XOR 'A' (65) = 9 (or 0x09 in hex)
                            <br />
                            <span className="text-xs">01001000 (H) ⊕ 01000001 (A) = 00001001 (9)</span>
                          </li>
                          <li>
                            To decrypt: 9 XOR 'A' (65) = 'H' (72)
                            <br />
                            <span className="text-xs">00001001 (9) ⊕ 01000001 (A) = 01001000 (H)</span>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Security Considerations
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">The security of the XOR cipher depends on how it's implemented:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Single-byte key:</strong> Extremely weak, equivalent to a substitution cipher
                          </li>
                          <li>
                            <strong>Multi-byte key:</strong> Stronger, but still vulnerable if the key is reused
                          </li>
                          <li>
                            <strong>One-time pad:</strong> If the key is truly random, as long as the message, and used
                            only once, the XOR cipher becomes unbreakable (one-time pad)
                          </li>
                        </ul>
                        <p>
                          XOR is a fundamental operation in many modern cryptographic algorithms, including AES, but is
                          never used alone in serious cryptographic applications.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Try It in Cipher Games</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modern" className="space-y-4">
              <Card className="border-green-500/30 bg-black/70">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Modern Cryptography</h3>
                  <p className="text-gray-300 mb-4">
                    Modern cryptography goes far beyond simple substitution ciphers, employing complex mathematical
                    functions, computational hardness assumptions, and rigorous security proofs to protect data in our
                    digital world.
                  </p>

                  <Accordion type="single" collapsible className="border-green-500/30">
                    <AccordionItem value="symmetric" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Symmetric Key Cryptography
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          Symmetric key algorithms use the same key for both encryption and decryption. Modern examples
                          include:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>AES (Advanced Encryption Standard):</strong> The current standard for symmetric
                            encryption, with key sizes of 128, 192, or 256 bits
                          </li>
                          <li>
                            <strong>ChaCha20:</strong> A high-speed stream cipher popular in mobile and low-power
                            applications
                          </li>
                          <li>
                            <strong>3DES (Triple DES):</strong> An older standard that applies DES three times to each
                            data block
                          </li>
                        </ul>
                        <p>
                          Symmetric algorithms are fast and efficient but require a secure method to share the secret
                          key between parties.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="asymmetric" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Asymmetric Key Cryptography
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          Asymmetric (or public-key) cryptography uses a pair of keys: a public key for encryption and a
                          private key for decryption. Major algorithms include:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>RSA:</strong> Based on the difficulty of factoring large prime numbers
                          </li>
                          <li>
                            <strong>ECC (Elliptic Curve Cryptography):</strong> Based on the algebraic structure of
                            elliptic curves, offering smaller key sizes for equivalent security
                          </li>
                          <li>
                            <strong>Diffie-Hellman:</strong> A key exchange protocol that allows two parties to securely
                            establish a shared secret over an insecure channel
                          </li>
                        </ul>
                        <p>
                          Asymmetric cryptography solves the key distribution problem but is computationally more
                          intensive than symmetric methods.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="hash" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Hash Functions
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          Cryptographic hash functions convert data of any size into a fixed-size output (hash) with
                          these properties:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>One-way:</strong> It's computationally infeasible to reverse the process
                          </li>
                          <li>
                            <strong>Deterministic:</strong> The same input always produces the same output
                          </li>
                          <li>
                            <strong>Collision-resistant:</strong> It's extremely difficult to find two different inputs
                            that produce the same hash
                          </li>
                        </ul>
                        <p className="mb-2">Common hash functions include:</p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>SHA-256:</strong> Part of the SHA-2 family, widely used in security applications
                          </li>
                          <li>
                            <strong>SHA-3:</strong> The newest member of the Secure Hash Algorithm family
                          </li>
                          <li>
                            <strong>BLAKE2:</strong> A high-speed cryptographic hash function
                          </li>
                        </ul>
                        <p>
                          Hash functions are essential for digital signatures, password storage, data integrity
                          verification, and blockchain technology.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="future" className="border-green-500/30">
                      <AccordionTrigger className="text-green-400 hover:text-green-300">
                        Future of Cryptography
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300">
                        <p className="mb-2">
                          The field of cryptography continues to evolve, with several emerging areas:
                        </p>
                        <ul className="list-disc list-inside mb-2">
                          <li>
                            <strong>Post-Quantum Cryptography:</strong> Developing algorithms resistant to quantum
                            computing attacks
                          </li>
                          <li>
                            <strong>Homomorphic Encryption:</strong> Performing computations on encrypted data without
                            decrypting it
                          </li>
                          <li>
                            <strong>Zero-Knowledge Proofs:</strong> Proving knowledge of a value without revealing the
                            value itself
                          </li>
                          <li>
                            <strong>Secure Multi-party Computation:</strong> Allowing multiple parties to jointly
                            compute a function over their inputs while keeping those inputs private
                          </li>
                        </ul>
                        <p>
                          These advanced techniques are enabling new applications in privacy-preserving computation,
                          secure cloud storage, and decentralized systems.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Learn More About Modern Cryptography
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default CipherTutorials

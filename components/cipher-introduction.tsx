import { Lock, Shield, Key } from "lucide-react"

const CipherIntroduction = () => {
  return (
    <section className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">
          Cryptography & Cipher Games
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn the art and science of secure communication through interactive cipher challenges and tutorials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="hacker-card p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">What is Cryptography?</h2>
            <p className="text-gray-300 mb-4">
              Cryptography is the practice and study of techniques for secure communication in the presence of
              adversaries. It's about constructing and analyzing protocols that prevent third parties from reading
              private messages.
            </p>
            <p className="text-gray-300 mb-4">
              Modern cryptography exists at the intersection of mathematics, computer science, electrical engineering,
              and physics. Applications include electronic commerce, chip-based payment cards, digital currencies,
              computer passwords, and military communications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Lock className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Encryption</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  The process of converting information into a code to prevent unauthorized access. It transforms
                  readable data (plaintext) into an unreadable format (ciphertext).
                </p>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Key className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Decryption</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  The reverse process of encryption, converting ciphertext back to plaintext using the appropriate key
                  or algorithm.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hacker-purple-card p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-purple-400 mr-2" />
            <h2 className="text-xl font-bold text-purple-400">Why Learn Ciphers?</h2>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Understand the foundation of modern security systems</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Develop critical thinking and problem-solving skills</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Appreciate the mathematics behind encryption</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Learn to analyze and break simple encryption systems</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Gain insights into the evolution of cryptography</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Build a foundation for advanced security concepts</p>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-md">
            <p className="text-gray-300 text-sm italic">
              "Cryptography is the essential building block of independence for organizations on the Internet, just like
              armies are the essential building blocks of states."
              <span className="block mt-2 text-right text-purple-400">— Julian Assange</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hacker-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Types of Ciphers</h2>
        <p className="text-gray-300 mb-6">
          Ciphers can be categorized in several ways based on their operation, key usage, and historical period. Here
          are some of the main types you'll explore in our interactive games:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Substitution Ciphers</h3>
            <p className="text-gray-400 text-sm">
              Replace units of plaintext with ciphertext according to a fixed system. Examples include Caesar cipher,
              Atbash cipher, and simple substitution.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Transposition Ciphers</h3>
            <p className="text-gray-400 text-sm">
              Rearrange the order of units of plaintext without changing the actual units. Examples include Rail Fence
              cipher and Columnar Transposition.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Polyalphabetic Ciphers</h3>
            <p className="text-gray-400 text-sm">
              Use multiple substitution alphabets. The Vigenère cipher is a classic example, using a keyword to
              determine which alphabet to use for each letter.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Stream Ciphers</h3>
            <p className="text-gray-400 text-sm">
              Encrypt each digit of plaintext one at a time. XOR cipher is a simple example, while RC4 is a more complex
              modern stream cipher.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Block Ciphers</h3>
            <p className="text-gray-400 text-sm">
              Operate on fixed-length groups of bits. Modern examples include AES (Advanced Encryption Standard) and DES
              (Data Encryption Standard).
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <h3 className="text-green-400 font-bold mb-2">Public Key Cryptography</h3>
            <p className="text-gray-400 text-sm">
              Uses pairs of keys: public keys for encryption and private keys for decryption. RSA is one of the most
              widely used public key algorithms.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 border border-green-500/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Ready to Start Your Cryptography Journey?</h2>
          <p className="text-gray-300">
            Explore our interactive cipher games below to learn through practice, or dive into our comprehensive
            tutorials to understand the theory behind each cipher.
          </p>
        </div>
      </div>
    </section>
  )
}

export default CipherIntroduction

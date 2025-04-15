import { Code, BrainCircuit, Cpu, Network, BarChart, GitBranch } from "lucide-react"

const DSAIntroduction = () => {
  return (
    <section className="py-12">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">
          Data Structures & Algorithms
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Visualize and understand the building blocks of computer science through interactive animations and
          explanations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="hacker-card p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Why DSA Matters in Cybersecurity</h2>
            <p className="text-gray-300 mb-4">
              Data Structures and Algorithms (DSA) form the foundation of computer science and are particularly crucial
              in cybersecurity. Understanding DSA helps security professionals analyze code for vulnerabilities, develop
              efficient security tools, and comprehend how attacks and defenses work at a fundamental level.
            </p>
            <p className="text-gray-300 mb-4">
              For example, knowledge of tree structures is essential for understanding certificate hierarchies in PKI
              (Public Key Infrastructure), while graph algorithms are used in network security for threat detection and
              analysis. Sorting and searching algorithms are fundamental to log analysis and incident response.
            </p>
            <p className="text-gray-300">
              Our interactive visualizer allows you to see these concepts in action, making it easier to understand how
              they work and how they can be applied to cybersecurity challenges.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <BrainCircuit className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Algorithm Analysis</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Understanding time and space complexity helps evaluate the efficiency of security algorithms and
                  identify potential performance bottlenecks in security systems.
                </p>
              </div>

              <div className="bg-green-900/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center mb-2">
                  <Network className="h-5 w-5 text-green-400 mr-2" />
                  <h3 className="text-green-400 font-bold">Network Algorithms</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Graph algorithms like shortest path and network flow are used in network security for traffic
                  analysis, intrusion detection, and optimizing security infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hacker-purple-card p-6">
          <div className="flex items-center mb-4">
            <Code className="h-6 w-6 text-purple-400 mr-2" />
            <h2 className="text-xl font-bold text-purple-400">DSA in Cryptography</h2>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Hash tables are fundamental to implementing hash functions for data integrity</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Number theory algorithms form the basis of public key cryptography</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Tree structures are used in certificate validation and PKI</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Sorting algorithms help in efficient key management</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Graph algorithms are used in analyzing cryptographic protocols</p>
            </li>
            <li className="flex items-start">
              <div className="text-purple-400 mr-2">•</div>
              <p>Dynamic programming optimizes many cryptographic operations</p>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-md">
            <p className="text-gray-300 text-sm italic">
              "Algorithms + Data Structures = Programs"
              <span className="block mt-2 text-right text-purple-400">— Niklaus Wirth</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hacker-card p-6 mb-12">
        <h2 className="text-2xl font-bold text-green-400 mb-4">Key Data Structures & Algorithms</h2>
        <p className="text-gray-300 mb-6">
          Our interactive visualizer covers these essential data structures and algorithms, allowing you to see how they
          work step-by-step:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <BarChart className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Sorting Algorithms</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Visualize how different sorting methods work, including Bubble Sort, Merge Sort, Quick Sort, and Heap
              Sort. Understand their efficiency and use cases in security applications.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <GitBranch className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Tree Structures</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Explore Binary Search Trees, AVL Trees, and B-Trees. Learn how these structures are used in databases,
              file systems, and security applications like certificate validation.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Network className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Graph Algorithms</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Understand Breadth-First Search, Depth-First Search, Dijkstra's Algorithm, and more. See how these
              algorithms apply to network security and threat analysis.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Cpu className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Search Algorithms</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Visualize Linear Search, Binary Search, and Hash-based searching. Learn how these techniques are used in
              security for efficient data retrieval and analysis.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <Code className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Dynamic Programming</h3>
            </div>
            <p className="text-gray-400 text-sm">
              See how complex problems can be broken down into simpler subproblems. Understand applications in
              cryptography, pattern matching, and optimization problems in security.
            </p>
          </div>

          <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
            <div className="flex items-center mb-3">
              <BrainCircuit className="h-6 w-6 text-green-400 mr-2" />
              <h3 className="text-green-400 font-bold">Linked Data Structures</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Explore Linked Lists, Stacks, and Queues. Learn how these fundamental structures are used in memory
              management, process scheduling, and security monitoring.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-900/20 to-purple-900/20 rounded-xl p-8 border border-green-500/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">Interactive Learning Experience</h2>
          <p className="text-gray-300">
            Our DSA Visualizer provides an interactive way to understand complex algorithms and data structures. Watch
            algorithms execute step-by-step, control the animation speed, and see the code in action.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DSAIntroduction

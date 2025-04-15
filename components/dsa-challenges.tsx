"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CheckCircle, XCircle, Code, Trophy, Clock, Brain, HelpCircle } from "lucide-react"

type Challenge = {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  hints: string[]
  sampleInput?: string
  sampleOutput?: string
  testCases: {
    input: string
    expectedOutput: string
  }[]
  solution: string
  explanation: string
}

const DSAChallenges = () => {
  const [activeTab, setActiveTab] = useState("arrays")
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)
  const [userCode, setUserCode] = useState("")
  const [userOutput, setUserOutput] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const challenges: Record<string, Challenge[]> = {
    arrays: [
      {
        id: "array-1",
        title: "Find the Missing Number",
        description:
          "You are given an array containing n distinct numbers taken from 0, 1, 2, ..., n. One number is missing from the array. Find the missing number.",
        difficulty: "easy",
        category: "Arrays",
        hints: [
          "Try to think about the expected sum of all numbers from 0 to n.",
          "The sum of numbers from 0 to n should be n*(n+1)/2.",
          "Compare the expected sum with the actual sum of the array.",
        ],
        sampleInput: "[3, 0, 1]",
        sampleOutput: "2",
        testCases: [
          {
            input: "[3, 0, 1]",
            expectedOutput: "2",
          },
          {
            input: "[9, 6, 4, 2, 3, 5, 7, 0, 1]",
            expectedOutput: "8",
          },
          {
            input: "[0]",
            expectedOutput: "1",
          },
        ],
        solution: `function findMissingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`,
        explanation:
          "This solution uses the mathematical formula for the sum of consecutive integers from 0 to n, which is n*(n+1)/2. By calculating the expected sum and subtracting the actual sum of the array, we can find the missing number. This approach has O(n) time complexity and O(1) space complexity.",
      },
      {
        id: "array-2",
        title: "Two Sum",
        description:
          "Given an array of integers and a target sum, find two numbers in the array that add up to the target. Return their indices.",
        difficulty: "easy",
        category: "Arrays",
        hints: [
          "Consider using a hash map to store values you've seen so far.",
          "For each number, check if the complement (target - current number) exists in the hash map.",
          "Remember to handle the case where the same element can't be used twice.",
        ],
        sampleInput: "Array: [2, 7, 11, 15], Target: 9",
        sampleOutput: "[0, 1]",
        testCases: [
          {
            input: "Array: [2, 7, 11, 15], Target: 9",
            expectedOutput: "[0, 1]",
          },
          {
            input: "Array: [3, 2, 4], Target: 6",
            expectedOutput: "[1, 2]",
          },
          {
            input: "Array: [3, 3], Target: 6",
            expectedOutput: "[0, 1]",
          },
        ],
        solution: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return null; // No solution found
}`,
        explanation:
          "This solution uses a hash map to store each number and its index as we iterate through the array. For each number, we check if its complement (target - current number) exists in the hash map. If it does, we've found our pair and return their indices. This approach has O(n) time complexity and O(n) space complexity.",
      },
    ],
    trees: [
      {
        id: "tree-1",
        title: "Binary Tree Inorder Traversal",
        description:
          "Given the root of a binary tree, return the inorder traversal of its nodes' values. Inorder traversal visits left subtree, then root, then right subtree.",
        difficulty: "medium",
        category: "Trees",
        hints: [
          "Think about using recursion to solve this problem.",
          "The order of traversal is: left subtree, current node, right subtree.",
          "You can also solve this iteratively using a stack.",
        ],
        sampleInput: "Root = [1, null, 2, 3]",
        sampleOutput: "[1, 3, 2]",
        testCases: [
          {
            input: "Root = [1, null, 2, 3]",
            expectedOutput: "[1, 3, 2]",
          },
          {
            input: "Root = []",
            expectedOutput: "[]",
          },
          {
            input: "Root = [1]",
            expectedOutput: "[1]",
          },
        ],
        solution: `function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    
    // Visit left subtree
    traverse(node.left);
    
    // Visit current node
    result.push(node.val);
    
    // Visit right subtree
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}`,
        explanation:
          "This solution uses a recursive approach to perform an inorder traversal of the binary tree. We first visit the left subtree, then the current node, and finally the right subtree. The time complexity is O(n) where n is the number of nodes in the tree, as we visit each node exactly once. The space complexity is O(h) where h is the height of the tree, due to the recursion stack.",
      },
    ],
    graphs: [
      {
        id: "graph-1",
        title: "Number of Islands",
        description:
          "Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
        difficulty: "medium",
        category: "Graphs",
        hints: [
          "Consider using depth-first search (DFS) or breadth-first search (BFS).",
          "When you find a land cell ('1'), explore all connected land cells and mark them as visited.",
          "Each time you start a new exploration, increment your island counter.",
        ],
        sampleInput: `[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
        sampleOutput: "1",
        testCases: [
          {
            input: `[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]`,
            expectedOutput: "1",
          },
          {
            input: `[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]`,
            expectedOutput: "3",
          },
        ],
        solution: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;
  
  function dfs(r, c) {
    // Check boundaries and if current cell is land
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }
    
    // Mark as visited by changing '1' to '0'
    grid[r][c] = '0';
    
    // Explore all 4 directions
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  
  return count;
}`,
        explanation:
          "This solution uses depth-first search (DFS) to explore each island. When we find a land cell ('1'), we increment our island counter and use DFS to mark all connected land cells as visited (by changing them to '0'). This ensures we don't count the same island multiple times. The time complexity is O(m*n) where m is the number of rows and n is the number of columns, as we potentially visit each cell once. The space complexity is O(m*n) in the worst case due to the recursion stack.",
      },
    ],
    sorting: [
      {
        id: "sort-1",
        title: "Merge Sorted Arrays",
        description:
          "Given two sorted arrays nums1 and nums2, merge nums2 into nums1 as one sorted array. Assume nums1 has enough space at the end to hold all elements from nums2.",
        difficulty: "easy",
        category: "Sorting",
        hints: [
          "Start from the end of both arrays and work backwards.",
          "Compare elements from both arrays and place the larger one at the end of nums1.",
          "Handle the case when one array is exhausted but elements remain in the other.",
        ],
        sampleInput: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        sampleOutput: "[1,2,2,3,5,6]",
        testCases: [
          {
            input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
            expectedOutput: "[1,2,2,3,5,6]",
          },
          {
            input: "nums1 = [1], m = 1, nums2 = [], n = 0",
            expectedOutput: "[1]",
          },
          {
            input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
            expectedOutput: "[1]",
          },
        ],
        solution: `function merge(nums1, m, nums2, n) {
  let p1 = m - 1; // Pointer for nums1
  let p2 = n - 1; // Pointer for nums2
  let p = m + n - 1; // Pointer for the end of nums1
  
  while (p2 >= 0) {
    if (p1 >= 0 && nums1[p1] > nums2[p2]) {
      nums1[p] = nums1[p1];
      p1--;
    } else {
      nums1[p] = nums2[p2];
      p2--;
    }
    p--;
  }
  
  return nums1;
}`,
        explanation:
          "This solution uses a two-pointer approach, starting from the end of both arrays. We compare elements from both arrays and place the larger one at the end of nums1. This way, we avoid overwriting elements in nums1 that we still need to consider. The time complexity is O(m+n) where m and n are the lengths of the arrays, as we process each element once. The space complexity is O(1) as we modify nums1 in-place.",
      },
    ],
    dp: [
      {
        id: "dp-1",
        title: "Climbing Stairs",
        description:
          "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        difficulty: "easy",
        category: "Dynamic Programming",
        hints: [
          "Think about the base cases: how many ways to climb 1 step? 2 steps?",
          "For any step n, you can reach it either from step n-1 or step n-2.",
          "This is similar to the Fibonacci sequence.",
        ],
        sampleInput: "n = 3",
        sampleOutput: "3",
        testCases: [
          {
            input: "n = 2",
            expectedOutput: "2",
          },
          {
            input: "n = 3",
            expectedOutput: "3",
          },
          {
            input: "n = 4",
            expectedOutput: "5",
          },
        ],
        solution: `function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev1 = 1; // Ways to climb 1 step
  let prev2 = 2; // Ways to climb 2 steps
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev1 = prev2;
    prev2 = current;
  }
  
  return prev2;
}`,
        explanation:
          "This solution uses dynamic programming with a bottom-up approach. For any step n, the number of ways to reach it is the sum of ways to reach step n-1 and step n-2. This is because you can either take a single step from n-1 or a double step from n-2. We optimize the space complexity by only keeping track of the previous two values instead of an entire array. The time complexity is O(n) and the space complexity is O(1).",
      },
    ],
  }

  const handleChallengeSelect = (challenge: Challenge) => {
    setSelectedChallenge(challenge)
    setUserCode("")
    setUserOutput("")
    setIsCorrect(null)
    setShowHint(false)
    setCurrentHintIndex(0)
    setShowSolution(false)
  }

  const handleRunCode = () => {
    if (!selectedChallenge) return

    try {
      // This is a simplified evaluation for demonstration purposes
      // In a real application, you would need a more secure way to evaluate code
      const userFunction = new Function(`return ${userCode}`)()

      // Test against all test cases
      let allPassed = true
      let output = ""

      for (const testCase of selectedChallenge.testCases) {
        // Parse input based on challenge type
        let input
        if (selectedChallenge.category === "Arrays" || selectedChallenge.category === "Sorting") {
          if (testCase.input.includes("Target:")) {
            // Handle two sum case
            const parts = testCase.input.split("Target:")
            const arrayStr = parts[0].replace("Array:", "").trim()
            const target = Number.parseInt(parts[1].trim())
            const array = JSON.parse(arrayStr)
            input = [array, target]
          } else if (testCase.input.includes("nums1")) {
            // Handle merge sorted arrays case
            const regex = /nums1 = (.*?), m = (\d+), nums2 = (.*?), n = (\d+)/
            const matches = testCase.input.match(regex)
            if (matches) {
              const nums1 = JSON.parse(matches[1])
              const m = Number.parseInt(matches[2])
              const nums2 = JSON.parse(matches[3])
              const n = Number.parseInt(matches[4])
              input = [nums1, m, nums2, n]
            }
          } else {
            // Handle regular array case
            input = [JSON.parse(testCase.input)]
          }
        } else if (selectedChallenge.category === "Dynamic Programming") {
          // Handle climbing stairs case
          const n = Number.parseInt(testCase.input.replace("n = ", ""))
          input = [n]
        } else {
          // Default case
          input = [testCase.input]
        }

        // Call user function with parsed input
        const result = userFunction(...input)
        const resultStr = JSON.stringify(result)

        // Compare with expected output
        const passed = resultStr === testCase.expectedOutput
        allPassed = allPassed && passed

        output += `Test case: ${testCase.input}\n`
        output += `Your output: ${resultStr}\n`
        output += `Expected: ${testCase.expectedOutput}\n`
        output += `Result: ${passed ? "✓ Passed" : "✗ Failed"}\n\n`
      }

      setUserOutput(output)
      setIsCorrect(allPassed)
    } catch (error) {
      setUserOutput(`Error: ${error.message}`)
      setIsCorrect(false)
    }
  }

  const handleShowNextHint = () => {
    if (!selectedChallenge) return

    if (currentHintIndex < selectedChallenge.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-900/30 text-green-400 border-green-500/30"
      case "medium":
        return "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
      case "hard":
        return "bg-red-900/30 text-red-400 border-red-500/30"
      default:
        return "bg-gray-900/30 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <section id="dsa-challenges" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">DSA Challenges</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Test your understanding of data structures and algorithms with these interactive coding challenges. Solve
          problems, get instant feedback, and improve your problem-solving skills.
        </p>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">dsa-challenges.sh</div>
        </div>

        <div className="terminal-content">
          <div className="text-green-400 font-mono mb-4">
            <span className="text-purple-400">$</span> ./solve-challenges --interactive
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Tabs defaultValue="arrays" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-black border border-green-500/30 mb-4 w-full">
                  <TabsTrigger value="arrays" className="data-[state=active]:bg-green-900/20 flex-1">
                    Arrays
                  </TabsTrigger>
                  <TabsTrigger value="trees" className="data-[state=active]:bg-green-900/20 flex-1">
                    Trees
                  </TabsTrigger>
                  <TabsTrigger value="graphs" className="data-[state=active]:bg-green-900/20 flex-1">
                    Graphs
                  </TabsTrigger>
                  <TabsTrigger value="sorting" className="data-[state=active]:bg-green-900/20 flex-1">
                    Sorting
                  </TabsTrigger>
                  <TabsTrigger value="dp" className="data-[state=active]:bg-green-900/20 flex-1">
                    DP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="arrays" className="space-y-3">
                  {challenges.arrays.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSelect={() => handleChallengeSelect(challenge)}
                      isSelected={selectedChallenge?.id === challenge.id}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="trees" className="space-y-3">
                  {challenges.trees.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSelect={() => handleChallengeSelect(challenge)}
                      isSelected={selectedChallenge?.id === challenge.id}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="graphs" className="space-y-3">
                  {challenges.graphs.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSelect={() => handleChallengeSelect(challenge)}
                      isSelected={selectedChallenge?.id === challenge.id}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="sorting" className="space-y-3">
                  {challenges.sorting.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSelect={() => handleChallengeSelect(challenge)}
                      isSelected={selectedChallenge?.id === challenge.id}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="dp" className="space-y-3">
                  {challenges.dp.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      onSelect={() => handleChallengeSelect(challenge)}
                      isSelected={selectedChallenge?.id === challenge.id}
                    />
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-2">
              {selectedChallenge ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-green-400">{selectedChallenge.title}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge className={getDifficultyColor(selectedChallenge.difficulty)}>
                          {selectedChallenge.difficulty}
                        </Badge>
                        <Badge className="bg-purple-900/30 text-purple-400 border-purple-500/30">
                          {selectedChallenge.category}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/30 text-green-400"
                      onClick={() => setSelectedChallenge(null)}
                    >
                      Back to List
                    </Button>
                  </div>

                  <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
                    <p className="text-gray-300 whitespace-pre-line">{selectedChallenge.description}</p>
                  </div>

                  {(selectedChallenge.sampleInput || selectedChallenge.sampleOutput) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedChallenge.sampleInput && (
                        <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
                          <div className="text-sm text-gray-400 mb-1">Sample Input:</div>
                          <div className="font-mono text-green-400 text-sm">{selectedChallenge.sampleInput}</div>
                        </div>
                      )}
                      {selectedChallenge.sampleOutput && (
                        <div className="bg-black/50 border border-green-500/30 rounded-md p-4">
                          <div className="text-sm text-gray-400 mb-1">Sample Output:</div>
                          <div className="font-mono text-green-400 text-sm">{selectedChallenge.sampleOutput}</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm text-gray-400">Your Solution:</label>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-yellow-500/30 text-yellow-400"
                          onClick={() => setShowHint(!showHint)}
                        >
                          <HelpCircle className="h-4 w-4 mr-1" /> Hint
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 text-purple-400"
                          onClick={() => setShowSolution(!showSolution)}
                        >
                          <Code className="h-4 w-4 mr-1" /> {showSolution ? "Hide" : "Show"} Solution
                        </Button>
                      </div>
                    </div>

                    {showHint && (
                      <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-yellow-400 font-bold flex items-center">
                            <HelpCircle className="h-4 w-4 mr-1" /> Hint {currentHintIndex + 1}/
                            {selectedChallenge.hints.length}
                          </h4>
                          {currentHintIndex < selectedChallenge.hints.length - 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-yellow-400 hover:text-yellow-300 p-0 h-6"
                              onClick={handleShowNextHint}
                            >
                              Next Hint
                            </Button>
                          )}
                        </div>
                        <p className="text-gray-300">{selectedChallenge.hints[currentHintIndex]}</p>
                      </div>
                    )}

                    <Textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="Write your solution here..."
                      className="font-mono bg-black border-green-500/30 min-h-[200px]"
                    />

                    <div className="flex justify-end">
                      <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700 text-black">
                        Run Code
                      </Button>
                    </div>

                    {userOutput && (
                      <div className="bg-black/70 border border-green-500/30 rounded-md p-4 font-mono text-sm">
                        <div className="text-gray-400 mb-2">Output:</div>
                        <pre className="text-gray-300 whitespace-pre-wrap">{userOutput}</pre>
                        {isCorrect !== null && (
                          <div
                            className={`mt-4 p-3 rounded-md ${
                              isCorrect
                                ? "bg-green-900/20 border border-green-500/30"
                                : "bg-red-900/20 border border-red-500/30"
                            }`}
                          >
                            <div className="flex items-center">
                              {isCorrect ? (
                                <>
                                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                                  <span className="text-green-400">All test cases passed! Great job!</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5 text-red-400 mr-2" />
                                  <span className="text-red-400">
                                    Some test cases failed. Check your solution and try again.
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {showSolution && (
                      <div className="bg-purple-900/10 border border-purple-500/30 rounded-md p-4">
                        <h4 className="text-purple-400 font-bold mb-2 flex items-center">
                          <Code className="h-4 w-4 mr-1" /> Solution
                        </h4>
                        <pre className="font-mono text-gray-300 text-sm bg-black/50 p-3 rounded-md overflow-x-auto">
                          {selectedChallenge.solution}
                        </pre>
                        <h4 className="text-purple-400 font-bold mt-4 mb-2">Explanation</h4>
                        <p className="text-gray-300 text-sm">{selectedChallenge.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full border border-green-500/30 rounded-md p-8 bg-black/30">
                  <Code className="h-16 w-16 text-green-400 mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Select a Challenge</h3>
                  <p className="text-gray-400 text-center mb-6">
                    Choose a challenge from the list on the left to start coding and test your DSA skills.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                    <StatCard
                      icon={<Brain className="h-5 w-5" />}
                      title="Problem Solving"
                      value="Improve your algorithmic thinking"
                    />
                    <StatCard
                      icon={<Clock className="h-5 w-5" />}
                      title="Time Complexity"
                      value="Optimize your solutions"
                    />
                    <StatCard
                      icon={<Trophy className="h-5 w-5" />}
                      title="Challenges"
                      value={`${Object.values(challenges).flat().length} Total`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ChallengeCard = ({
  challenge,
  onSelect,
  isSelected,
}: {
  challenge: Challenge
  onSelect: () => void
  isSelected: boolean
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-900/30 text-green-400"
      case "medium":
        return "bg-yellow-900/30 text-yellow-400"
      case "hard":
        return "bg-red-900/30 text-red-400"
      default:
        return "bg-gray-900/30 text-gray-400"
    }
  }

  return (
    <div
      className={`p-4 rounded-md cursor-pointer transition-all ${
        isSelected
          ? "bg-green-900/20 border-2 border-green-500"
          : "bg-black/50 border border-green-500/30 hover:bg-green-900/10"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-green-400">{challenge.title}</h4>
        <div className={`px-2 py-0.5 rounded text-xs ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty}
        </div>
      </div>
      <p className="text-gray-400 text-sm line-clamp-2">{challenge.description}</p>
    </div>
  )
}

const StatCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => {
  return (
    <div className="bg-black/50 border border-green-500/30 rounded-md p-4 text-center">
      <div className="flex justify-center text-green-400 mb-2">{icon}</div>
      <h4 className="text-green-400 font-bold text-sm mb-1">{title}</h4>
      <p className="text-gray-400 text-xs">{value}</p>
    </div>
  )
}

export default DSAChallenges

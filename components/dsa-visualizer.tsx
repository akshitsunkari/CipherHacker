"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, SkipForward, ChevronRight, ArrowUpDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DSAVisualizer = () => {
  const [activeTab, setActiveTab] = useState("bubble-sort")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [visualizationData, setVisualizationData] = useState<any[]>([])
  const animationRef = useRef<number | null>(null)
  const lastStepTimeRef = useRef<number>(0)

  // Generate random array for sorting algorithms
  const generateRandomArray = (length: number, max: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * max) + 10)
  }

  // Initialize visualization data based on active tab
  useEffect(() => {
    resetVisualization()
  }, [activeTab])

  // Optimize the DSA visualizer to prevent potential memory leaks or performance issues
  // Update the animation loop in the useEffect hook

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      let animationFrameId: number

      const animate = (timestamp: number) => {
        if (!lastStepTimeRef.current) {
          lastStepTimeRef.current = timestamp
        }

        const elapsed = timestamp - lastStepTimeRef.current
        const stepDuration = 1000 - speed * 9 // Map 1-100 to 1000-100ms

        if (elapsed > stepDuration) {
          if (currentStep < totalSteps - 1) {
            setCurrentStep((prev) => prev + 1)
            lastStepTimeRef.current = timestamp
          } else {
            setIsPlaying(false)
            return
          }
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId)
        }
      }
    }
  }, [isPlaying, currentStep, totalSteps, speed])

  const resetVisualization = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    lastStepTimeRef.current = 0

    let initialData: any[] = []
    let steps: any[] = []

    switch (activeTab) {
      case "bubble-sort":
        initialData = generateRandomArray(10, 40)
        steps = generateBubbleSortSteps([...initialData])
        break
      case "merge-sort":
        initialData = generateRandomArray(8, 40)
        steps = generateMergeSortSteps([...initialData])
        break
      case "binary-search":
        initialData = Array.from({ length: 15 }, (_, i) => (i + 1) * 5)
        steps = generateBinarySearchSteps([...initialData], 45) // Search for 45
        break
      case "bst-traversal":
        initialData = generateBST()
        steps = generateBSTTraversalSteps(initialData)
        break
      case "linked-list":
        initialData = generateLinkedList(6)
        steps = generateLinkedListSteps(initialData)
        break
    }

    setVisualizationData(steps)
    setTotalSteps(steps.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    lastStepTimeRef.current = 0
  }

  const handleStepForward = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    lastStepTimeRef.current = 0
  }

  // Bubble Sort Algorithm
  const generateBubbleSortSteps = (arr: number[]) => {
    const steps = [{ array: [...arr], comparing: [], swapped: false }]

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Add step showing comparison
        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          swapped: false,
          description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        })

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

          // Add step showing swap
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: true,
            description: `Swapped ${arr[j]} and ${arr[j + 1]}`,
          })
        } else {
          steps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapped: false,
            description: `No swap needed, ${arr[j]} ≤ ${arr[j + 1]}`,
          })
        }
      }

      // Add step showing one element in its final position
      steps.push({
        array: [...arr],
        comparing: [],
        sorted: arr.length - i - 1,
        description: `Element ${arr[arr.length - i - 1]} is now in its correct position`,
      })
    }

    // Final sorted array
    steps.push({
      array: [...arr],
      comparing: [],
      sorted: "all",
      description: "Array is now fully sorted",
    })

    return steps
  }

  // Merge Sort Algorithm
  const generateMergeSortSteps = (arr: number[]) => {
    const steps: any[] = [
      {
        array: [...arr],
        ranges: [],
        description: "Initial array",
      },
    ]

    const merge = (left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)

      steps.push({
        array: [...arr],
        ranges: [
          { start: left, end: mid, color: "green" },
          { start: mid + 1, end: right, color: "purple" },
        ],
        description: `Dividing array into left (${leftArr.join(", ")}) and right (${rightArr.join(", ")})`,
      })

      let i = 0,
        j = 0,
        k = left

      while (i < leftArr.length && j < rightArr.length) {
        steps.push({
          array: [...arr],
          comparing: [left + i, mid + 1 + j],
          ranges: [
            { start: left, end: mid, color: "green" },
            { start: mid + 1, end: right, color: "purple" },
          ],
          description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
        })

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i]
          i++
        } else {
          arr[k] = rightArr[j]
          j++
        }

        steps.push({
          array: [...arr],
          updated: k,
          ranges: [
            { start: left, end: mid, color: "green" },
            { start: mid + 1, end: right, color: "purple" },
          ],
          description: `Placing ${arr[k]} at position ${k}`,
        })

        k++
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i]
        steps.push({
          array: [...arr],
          updated: k,
          ranges: [
            { start: left, end: mid, color: "green" },
            { start: mid + 1, end: right, color: "purple" },
          ],
          description: `Placing remaining left element ${arr[k]} at position ${k}`,
        })
        i++
        k++
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j]
        steps.push({
          array: [...arr],
          updated: k,
          ranges: [
            { start: left, end: mid, color: "green" },
            { start: mid + 1, end: right, color: "purple" },
          ],
          description: `Placing remaining right element ${arr[k]} at position ${k}`,
        })
        j++
        k++
      }

      steps.push({
        array: [...arr],
        ranges: [{ start: left, end: right, color: "blue" }],
        description: `Merged subarray: ${arr.slice(left, right + 1).join(", ")}`,
      })
    }

    const mergeSort = (left: number, right: number) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)

        steps.push({
          array: [...arr],
          ranges: [{ start: left, end: right, color: "yellow" }],
          description: `Splitting array from index ${left} to ${right}`,
        })

        mergeSort(left, mid)
        mergeSort(mid + 1, right)
        merge(left, mid, right)
      }
    }

    mergeSort(0, arr.length - 1)

    steps.push({
      array: [...arr],
      sorted: "all",
      description: "Array is now fully sorted",
    })

    return steps
  }

  // Binary Search Algorithm
  const generateBinarySearchSteps = (arr: number[], target: number) => {
    const steps: any[] = [
      {
        array: [...arr],
        description: `Searching for ${target} in sorted array`,
        searchRange: { left: 0, right: arr.length - 1 },
      },
    ]

    let left = 0
    let right = arr.length - 1
    let found = false

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        array: [...arr],
        current: mid,
        searchRange: { left, right },
        description: `Checking middle element at index ${mid}: ${arr[mid]}`,
      })

      if (arr[mid] === target) {
        steps.push({
          array: [...arr],
          found: mid,
          description: `Found ${target} at index ${mid}!`,
        })
        found = true
        break
      } else if (arr[mid] < target) {
        steps.push({
          array: [...arr],
          eliminated: { left, right: mid },
          searchRange: { left: mid + 1, right },
          description: `${target} > ${arr[mid]}, so search right half`,
        })
        left = mid + 1
      } else {
        steps.push({
          array: [...arr],
          eliminated: { left: mid, right },
          searchRange: { left, right: mid - 1 },
          description: `${target} < ${arr[mid]}, so search left half`,
        })
        right = mid - 1
      }
    }

    if (!found) {
      steps.push({
        array: [...arr],
        notFound: true,
        description: `${target} not found in the array`,
      })
    }

    return steps
  }

  // Binary Search Tree
  const generateBST = () => {
    return {
      value: 50,
      left: {
        value: 30,
        left: {
          value: 20,
          left: null,
          right: null,
        },
        right: {
          value: 40,
          left: null,
          right: null,
        },
      },
      right: {
        value: 70,
        left: {
          value: 60,
          left: null,
          right: null,
        },
        right: {
          value: 80,
          left: null,
          right: null,
        },
      },
    }
  }

  // BST Traversal
  const generateBSTTraversalSteps = (root: any) => {
    const steps: any[] = [
      {
        tree: root,
        visited: [],
        current: null,
        description: "Starting BST traversal",
      },
    ]

    // In-order traversal (left, root, right)
    const inOrderTraversal = (node: any, visited: number[] = []) => {
      if (!node) return visited

      // Visit left subtree
      if (node.left) {
        steps.push({
          tree: root,
          visited: [...visited],
          current: node,
          next: node.left,
          description: `Moving to left child of ${node.value}`,
        })
        visited = inOrderTraversal(node.left, visited)
      }

      // Visit current node
      steps.push({
        tree: root,
        visited: [...visited],
        current: node,
        description: `Visiting node ${node.value}`,
      })

      visited.push(node.value)

      // Visit right subtree
      if (node.right) {
        steps.push({
          tree: root,
          visited: [...visited],
          current: node,
          next: node.right,
          description: `Moving to right child of ${node.value}`,
        })
        visited = inOrderTraversal(node.right, visited)
      }

      return visited
    }

    const finalVisited = inOrderTraversal(root)

    steps.push({
      tree: root,
      visited: finalVisited,
      current: null,
      description: `In-order traversal complete: ${finalVisited.join(" → ")}`,
    })

    return steps
  }

  // Linked List
  const generateLinkedList = (length: number) => {
    const list = []
    for (let i = 0; i < length; i++) {
      list.push({
        value: String.fromCharCode(65 + i), // A, B, C, ...
        next: i < length - 1 ? i + 1 : null,
      })
    }
    return list
  }

  // Linked List Operations
  const generateLinkedListSteps = (list: any[]) => {
    const steps: any[] = [
      {
        list: [...list],
        current: null,
        description: "Initial linked list",
      },
    ]

    // Traversal
    for (let i = 0; i < list.length; i++) {
      steps.push({
        list: [...list],
        current: i,
        description: `Traversing to node ${list[i].value}`,
      })
    }

    // Insertion at the middle
    const newNode = { value: "X", next: 3 }
    const updatedList1 = [...list]
    updatedList1[2].next = updatedList1.length
    updatedList1.push(newNode)

    steps.push({
      list: [...updatedList1],
      current: 2,
      highlight: updatedList1.length - 1,
      description: `Inserting node X after node ${list[2].value}`,
    })

    // Deletion
    const updatedList2 = [...updatedList1]
    updatedList2[1].next = updatedList2[2].next

    steps.push({
      list: [...updatedList2],
      current: 1,
      deleted: 2,
      description: `Deleting node ${updatedList1[2].value}`,
    })

    // Final list
    steps.push({
      list: updatedList2.filter((_, i) => i !== 2),
      current: null,
      description: "Final linked list after operations",
    })

    return steps
  }

  // Render current visualization based on active tab and current step
  const renderVisualization = () => {
    if (
      !visualizationData ||
      !Array.isArray(visualizationData) ||
      visualizationData.length === 0 ||
      currentStep >= visualizationData.length
    ) {
      return <div className="text-center text-gray-400">No data to visualize</div>
    }

    const currentData = visualizationData[currentStep] || {}

    switch (activeTab) {
      case "bubble-sort":
      case "merge-sort":
        return renderSortingVisualization(currentData)
      case "binary-search":
        return renderBinarySearchVisualization(currentData)
      case "bst-traversal":
        return renderBSTVisualization(currentData)
      case "linked-list":
        return renderLinkedListVisualization(currentData)
      default:
        return <div className="text-center text-gray-400">Select an algorithm to visualize</div>
    }
  }

  // Render sorting visualization (Bubble Sort and Merge Sort)
  const renderSortingVisualization = (data: any) => {
    if (!data.array || !Array.isArray(data.array) || data.array.length === 0) {
      return <div className="text-center text-gray-400">No array data to visualize</div>
    }

    const maxValue = Math.max(...data.array)

    return (
      <div className="p-4">
        <div className="mb-4 h-64 flex items-end justify-center gap-1">
          {data.array.map((value: number, index: number) => {
            const height = (value / maxValue) * 100

            let bgColor = "bg-gray-700"

            // For Bubble Sort
            if (data.comparing && data.comparing.includes(index)) {
              bgColor = data.swapped ? "bg-red-500" : "bg-yellow-500"
            }

            if (data.sorted === "all" || (typeof data.sorted === "number" && index >= data.sorted)) {
              bgColor = "bg-green-500"
            }

            // For Merge Sort
            if (data.ranges) {
              for (const range of data.ranges) {
                if (index >= range.start && index <= range.end) {
                  bgColor =
                    range.color === "green"
                      ? "bg-green-500/70"
                      : range.color === "purple"
                        ? "bg-purple-500/70"
                        : range.color === "blue"
                          ? "bg-blue-500/70"
                          : "bg-yellow-500/70"
                }
              }
            }

            if (data.updated === index) {
              bgColor = "bg-blue-500"
            }

            return (
              <div
                key={index}
                className={`dsa-bar ${bgColor} w-8 rounded-t-md flex items-end justify-center transition-all`}
                style={{ height: `${height}%` }}
              >
                <span className="text-xs text-white font-mono mb-1">{value}</span>
              </div>
            )
          })}
        </div>
        <div className="text-center text-gray-300 mt-4 min-h-[3rem]">{data.description}</div>
      </div>
    )
  }

  // Render Binary Search visualization
  const renderBinarySearchVisualization = (data: any) => {
    if (!data.array || !Array.isArray(data.array) || data.array.length === 0) {
      return <div className="text-center text-gray-400">No array data to visualize</div>
    }

    return (
      <div className="p-4">
        <div className="mb-4 flex justify-center gap-1">
          {data.array.map((value: number, index: number) => {
            let bgColor = "bg-gray-700"
            let textColor = "text-white"

            if (data.searchRange && index >= data.searchRange.left && index <= data.searchRange.right) {
              bgColor = "bg-gray-600"
            }

            if (data.eliminated && index >= data.eliminated.left && index <= data.eliminated.right) {
              bgColor = "bg-gray-900/50"
              textColor = "text-gray-500"
            }

            if (data.current === index) {
              bgColor = "bg-yellow-500"
              textColor = "text-black"
            }

            if (data.found === index) {
              bgColor = "bg-green-500"
              textColor = "text-black"
            }

            return (
              <div
                key={index}
                className={`${bgColor} ${textColor} w-12 h-12 rounded-md flex items-center justify-center font-mono transition-all`}
              >
                {value}
              </div>
            )
          })}
        </div>

        {data.searchRange && !data.found && !data.notFound && (
          <div className="flex justify-center items-center mb-4">
            <div className="flex items-center">
              <div className="text-green-400 font-mono">left: {data.searchRange.left}</div>
              <ArrowUpDown className="mx-2 h-4 w-4 text-gray-400" />
              <div className="text-purple-400 font-mono">right: {data.searchRange.right}</div>
            </div>
          </div>
        )}

        <div className="text-center text-gray-300 mt-4 min-h-[3rem]">{data.description}</div>
      </div>
    )
  }

  // Render BST visualization
  const renderBSTVisualization = (data: any) => {
    if (!data.tree) {
      return <div className="text-center text-gray-400">No tree data to visualize</div>
    }

    const renderNode = (node: any, x: number, y: number, level = 0) => {
      if (!node) return null

      const isCurrentNode = data.current && node && data.current.value === node.value
      const isNextNode = data.next && node && data.next.value === node.value
      const isVisited = data.visited && Array.isArray(data.visited) && node && data.visited.includes(node.value)

      const nodeSize = 40
      const horizontalSpacing = 60 / (level + 1)
      const verticalSpacing = 80

      const elements = []

      // Node circle
      elements.push(
        <div
          key={`node-${node.value}`}
          className={`absolute dsa-node rounded-full flex items-center justify-center font-mono text-sm transition-all ${
            isCurrentNode
              ? "bg-yellow-500 text-black"
              : isNextNode
                ? "bg-blue-500 text-white"
                : isVisited
                  ? "bg-green-500/70 text-white"
                  : "bg-gray-700 text-white"
          }`}
          style={{
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
            left: `${x - nodeSize / 2}px`,
            top: `${y - nodeSize / 2}px`,
          }}
        >
          {node.value}
        </div>,
      )

      // Left child edge and node
      if (node.left) {
        const childX = x - horizontalSpacing
        const childY = y + verticalSpacing

        // Edge to left child
        elements.push(
          <div
            key={`edge-left-${node.value}`}
            className={`absolute dsa-arrow h-0.5 transition-all ${
              isCurrentNode && data.next && data.next.value === node.left.value ? "bg-blue-500" : "bg-gray-600"
            }`}
            style={{
              width: `${Math.sqrt(Math.pow(horizontalSpacing, 2) + Math.pow(verticalSpacing, 2))}px`,
              left: `${x}px`,
              top: `${y}px`,
              transformOrigin: "top left",
              transform: `rotate(${Math.atan2(verticalSpacing, -horizontalSpacing)}rad)`,
            }}
          />,
        )

        // Recursively render left child
        elements.push(...renderNode(node.left, childX, childY, level + 1))
      }

      // Right child edge and node
      if (node.right) {
        const childX = x + horizontalSpacing
        const childY = y + verticalSpacing

        // Edge to right child
        elements.push(
          <div
            key={`edge-right-${node.value}`}
            className={`absolute dsa-arrow h-0.5 transition-all ${
              isCurrentNode && data.next && data.next.value === node.right.value ? "bg-blue-500" : "bg-gray-600"
            }`}
            style={{
              width: `${Math.sqrt(Math.pow(horizontalSpacing, 2) + Math.pow(verticalSpacing, 2))}px`,
              left: `${x}px`,
              top: `${y}px`,
              transformOrigin: "top left",
              transform: `rotate(${Math.atan2(verticalSpacing, horizontalSpacing)}rad)`,
            }}
          />,
        )

        // Recursively render right child
        elements.push(...renderNode(node.right, childX, childY, level + 1))
      }

      return elements
    }

    return (
      <div className="p-4">
        <div className="relative h-80 mb-4">
          <div className="absolute inset-0 flex justify-center">{renderNode(data.tree, 300, 50)}</div>
        </div>

        <div className="flex justify-center items-center mb-4">
          <div className="text-gray-400 mr-2">Visited:</div>
          <div className="flex flex-wrap gap-2">
            {data.visited && Array.isArray(data.visited) && data.visited.length > 0 ? (
              data.visited.map((value: number, index: number) => (
                <div key={index} className="bg-green-500/70 text-white px-2 py-1 rounded-md font-mono text-sm">
                  {value}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No nodes visited yet</div>
            )}
          </div>
        </div>

        <div className="text-center text-gray-300 mt-4 min-h-[3rem]">{data.description}</div>
      </div>
    )
  }

  // Render Linked List visualization
  const renderLinkedListVisualization = (data: any) => {
    if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
      return <div className="text-center text-gray-400">No linked list data to visualize</div>
    }

    return (
      <div className="p-4">
        <div className="flex justify-center items-center mb-8 overflow-x-auto py-4">
          {data.list.map((node: any, index: number) => {
            if (!node) return null

            const isCurrentNode = data.current === index
            const isHighlighted = data.highlight === index
            const isDeleted = data.deleted === index

            return (
              <div key={index} className="flex items-center">
                <div
                  className={`w-16 h-16 rounded-md flex flex-col items-center justify-center font-mono transition-all ${
                    isDeleted
                      ? "bg-red-500/50 text-red-200 border border-red-500"
                      : isCurrentNode
                        ? "bg-yellow-500 text-black"
                        : isHighlighted
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 text-white"
                  }`}
                >
                  <div className="text-lg">{node.value}</div>
                  <div className="text-xs mt-1">{index}</div>
                </div>

                {node.next !== null && (
                  <div className="flex items-center mx-2">
                    <div
                      className={`w-12 h-0.5 ${
                        isDeleted
                          ? "bg-red-500/50"
                          : isCurrentNode || (data.current === index - 1 && data.highlight)
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    ></div>
                    <ChevronRight
                      className={`h-4 w-4 ${
                        isDeleted
                          ? "text-red-500/50"
                          : isCurrentNode || (data.current === index - 1 && data.highlight)
                            ? "text-yellow-500"
                            : "text-gray-500"
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center text-gray-300 mt-4 min-h-[3rem]">{data.description}</div>
      </div>
    )
  }

  return (
    <section id="dsa-visualizer" className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 neon-text font-mono">DSA Visualizer Zone</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Visualize and understand data structures and algorithms through interactive animations. See how sorting
          algorithms work, explore binary search trees, and more.
        </p>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red"></div>
          <div className="terminal-button terminal-button-yellow"></div>
          <div className="terminal-button terminal-button-green"></div>
          <div className="terminal-title">dsa-visualizer.sh</div>
        </div>

        <div className="terminal-content">
          <div className="text-green-400 font-mono mb-4">
            <span className="text-purple-400">$</span> ./visualize --algorithm=dsa --interactive
          </div>

          <Tabs defaultValue="bubble-sort" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-black border border-green-500/30 mb-4">
              <TabsTrigger value="bubble-sort" className="data-[state=active]:bg-green-900/20">
                Bubble Sort
              </TabsTrigger>
              <TabsTrigger value="merge-sort" className="data-[state=active]:bg-green-900/20">
                Merge Sort
              </TabsTrigger>
              <TabsTrigger value="binary-search" className="data-[state=active]:bg-green-900/20">
                Binary Search
              </TabsTrigger>
              <TabsTrigger value="bst-traversal" className="data-[state=active]:bg-green-900/20">
                BST Traversal
              </TabsTrigger>
              <TabsTrigger value="linked-list" className="data-[state=active]:bg-green-900/20">
                Linked List
              </TabsTrigger>
            </TabsList>

            <div className="border border-green-500/30 rounded-md bg-black/50 overflow-hidden">
              <div className="p-4">{renderVisualization()}</div>

              <div className="border-t border-green-500/30 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={togglePlayPause}
                      className="h-8 w-8 border-green-500/30 text-green-400"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleStepForward}
                      disabled={currentStep >= totalSteps - 1}
                      className="h-8 w-8 border-green-500/30 text-green-400"
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleReset}
                      className="h-8 w-8 border-green-500/30 text-green-400"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-400">Speed:</span>
                    <Slider
                      value={[speed]}
                      min={1}
                      max={100}
                      step={1}
                      onValueChange={(value) => setSpeed(value[0])}
                      className="w-32"
                    />
                  </div>

                  <div className="text-xs text-gray-400">
                    Step: {currentStep + 1} / {totalSteps}
                  </div>
                </div>

                <div className="text-sm text-gray-400">
                  <h3 className="font-bold text-green-400 mb-2">
                    About{" "}
                    {activeTab === "bubble-sort"
                      ? "Bubble Sort"
                      : activeTab === "merge-sort"
                        ? "Merge Sort"
                        : activeTab === "binary-search"
                          ? "Binary Search"
                          : activeTab === "bst-traversal"
                            ? "Binary Search Tree Traversal"
                            : "Linked List"}
                  </h3>

                  {activeTab === "bubble-sort" && (
                    <p>
                      Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list,
                      compares adjacent elements, and swaps them if they are in the wrong order. The pass through the
                      list is repeated until the list is sorted. Time complexity: O(n²).
                    </p>
                  )}

                  {activeTab === "merge-sort" && (
                    <p>
                      Merge Sort is an efficient, stable, comparison-based, divide and conquer sorting algorithm. It
                      divides the input array into two halves, recursively sorts them, and then merges the sorted
                      halves. Time complexity: O(n log n).
                    </p>
                  )}

                  {activeTab === "binary-search" && (
                    <p>
                      Binary Search is a fast search algorithm that works on sorted arrays. It repeatedly divides the
                      search interval in half, eliminating half of the remaining elements each time. Time complexity:
                      O(log n).
                    </p>
                  )}

                  {activeTab === "bst-traversal" && (
                    <p>
                      Binary Search Tree (BST) is a node-based binary tree data structure that has properties which make
                      searching efficient. In-order traversal of a BST produces sorted output. Time complexity for
                      traversal: O(n).
                    </p>
                  )}

                  {activeTab === "linked-list" && (
                    <p>
                      A Linked List is a linear data structure where elements are stored in nodes, and each node points
                      to the next node in the sequence. Operations like insertion and deletion can be efficient, but
                      random access is not. Time complexity for traversal: O(n).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

export default DSAVisualizer

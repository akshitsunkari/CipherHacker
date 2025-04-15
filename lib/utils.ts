import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add error handling utility
export function handleError(error: unknown): string {
  if (error instanceof Error) {
    console.error("Error occurred:", error.message)
    return error.message
  }
  console.error("Unknown error:", error)
  return "An unknown error occurred"
}

// Add safe JSON parse utility to prevent crashes
export function safeJsonParse(jsonString: string, fallback: any = null) {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error("JSON parse error:", error)
    return fallback
  }
}

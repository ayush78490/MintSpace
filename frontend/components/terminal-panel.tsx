"use client"

import { useEffect, useRef } from "react"
import { Terminal } from "lucide-react"

interface TerminalPanelProps {
  output: string[]
}

export default function TerminalPanel({ output }: TerminalPanelProps) {
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center">
        <Terminal className="h-4 w-4 mr-2 text-gray-400" />
        <h3 className="text-sm font-medium">Terminal</h3>
      </div>
      <div ref={terminalRef} className="flex-1 p-4 font-mono text-sm overflow-auto bg-gray-900">
        {output.map((line, index) => (
          <div key={index} className="mb-1">
            {line.startsWith("ERROR:") ? (
              <span className="text-red-400">{line}</span>
            ) : line.startsWith("SUCCESS:") ? (
              <span className="text-green-400">{line}</span>
            ) : line.startsWith("INFO:") ? (
              <span className="text-blue-400">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

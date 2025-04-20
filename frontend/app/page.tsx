"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import WalletConnection from "@/components/wallet-connection"
import CodeEditorPanel from "@/components/code-editor-panel"
import TerminalPanel from "@/components/terminal-panel"
import ActionButtons from "@/components/action-buttons"
import { WalletProvider } from "@/context/wallet-context"
import { SdkVersionProvider } from "@/context/sdk-version-context"

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [editorHeight, setEditorHeight] = useState("calc(100vh - 200px)")
  const [terminalHeight, setTerminalHeight] = useState("300px")
  const [isDragging, setIsDragging] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Welcome to MintSpace IDE",
    "Connect your wallet to start coding Soroban smart contracts",
  ])

  // Handle resizing panels
  const handleMouseDown = () => {
    setIsDragging(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const containerHeight = window.innerHeight - 200 // Account for header and other elements
        const newTerminalHeight = Math.max(100, Math.min(containerHeight - 200, containerHeight - e.clientY + 100))
        setTerminalHeight(`${newTerminalHeight}px`)
        setEditorHeight(`calc(100vh - 200px - ${newTerminalHeight}px)`)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  // Add log to terminal
  const addLog = (message: string) => {
    setTerminalOutput((prev) => [...prev, message])
  }

  return (
    <WalletProvider>
      <SdkVersionProvider>
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
          <Header />
          <main className="flex-1 flex flex-col overflow-hidden">
            <WalletConnection isConnected={isWalletConnected} setIsConnected={setIsWalletConnected} />

            <div className="flex-1 flex flex-col overflow-hidden">
              {isWalletConnected ? (
                <>
                  <div className="flex-1 overflow-hidden" style={{ height: editorHeight }}>
                    <CodeEditorPanel />
                  </div>

                  <div className="h-1 bg-gray-700 cursor-row-resize hover:bg-blue-500" onMouseDown={handleMouseDown} />

                  <div className="bg-gray-800 overflow-hidden" style={{ height: terminalHeight }}>
                    <TerminalPanel output={terminalOutput} />
                  </div>

                  <ActionButtons addLog={addLog} />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-8 max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Welcome to MintSpace IDE</h2>
                    <p className="mb-6 text-gray-400">
                      Connect your wallet to start writing, compiling, and deploying Soroban smart contracts on the
                      Stellar network.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </SdkVersionProvider>
    </WalletProvider>
  )
}

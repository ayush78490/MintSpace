"use client"

import { useState } from "react"
import axios from "axios"

interface ActionButtonProps {
  currentCode: string  // Accept current code from the parent (CodeEditorPanel)
}

export default function ActionButton({ currentCode }: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string>("")

  // Function to send the code to the backend for deployment/compilation
  const sendCodeToBackend = async () => {
    setIsLoading(true)
    setStatusMessage("Deploying...")
  
    try {
      // Ensure the URL matches your backend's API route
      const response = await axios.post("http://localhost:8080/compile", { code: currentCode, sdk_version: "0.1.0" })
      console.log("Backend response:", response.data)
      setStatusMessage("Contract deployed successfully!")
    } catch (error) {
      console.log("Sending code is : ",currentCode)
      console.error("Error sending code to backend:", error)
      setStatusMessage("Deployment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="p-4 bg-gray-800">
      <button
        onClick={sendCodeToBackend}
        disabled={isLoading}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:bg-gray-600"
      >
        {isLoading ? "Deploying..." : "Deploy Contract"}
      </button>
      {statusMessage && (
        <div className="mt-2 text-sm text-white">
          {statusMessage}
        </div>
      )}
    </div>
  )
}

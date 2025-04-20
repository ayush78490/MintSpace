"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"
import { getSdkCodeExample } from "@/lib/code-examples"

interface SdkVersionContextType {
  sdkVersion: string
  setSdkVersion: (version: string) => void
  codeExample: string
}

const SdkVersionContext = createContext<SdkVersionContextType>({
  sdkVersion: "1.0.0",
  setSdkVersion: () => {},
  codeExample: "",
})

export const useSdkVersion = () => useContext(SdkVersionContext)

interface SdkVersionProviderProps {
  children: ReactNode
}

export const SdkVersionProvider = ({ children }: SdkVersionProviderProps) => {
  const [sdkVersion, setSdkVersion] = useState("1.0.0")
  const [codeExample, setCodeExample] = useState("")

  useEffect(() => {
    // Update code example when SDK version changes
    setCodeExample(getSdkCodeExample(sdkVersion))
  }, [sdkVersion])

  return (
    <SdkVersionContext.Provider
      value={{
        sdkVersion,
        setSdkVersion,
        codeExample,
      }}
    >
      {children}
    </SdkVersionContext.Provider>
  )
}

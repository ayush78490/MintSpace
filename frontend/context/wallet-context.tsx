"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { isConnected, requestAccess } from "@stellar/freighter-api"

interface WalletContextType {
  walletAddress: string | null
  testnetBalance: string
  mainnetBalance: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  testnetBalance: "0",
  mainnetBalance: "0",
  connectWallet: async () => {},
  disconnectWallet: () => {},
})

export const useWallet = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [testnetBalance, setTestnetBalance] = useState("0")
  const [mainnetBalance, setMainnetBalance] = useState("0")

  // Connect to Freighter wallet
  const connectWallet = async () => {
    try {
      // Check if Freighter is connected
      const isAppConnected = await isConnected()

      if ("isConnected" in isAppConnected && isAppConnected.isConnected) {
        alert("User has Freighter!")
      } else {
        alert("Please install the Freighter wallet extension.")
        return
      }

      // Request access to Freighter and get the public key
      const accessObj = await requestAccess()
      if (accessObj.error) {
        console.error("Error requesting access:", accessObj.error)
        return
      }

      const address = accessObj.address
      setWalletAddress(address)

      // You can fetch balance here if necessary
      // Example fetch balance (you need to implement this function)
      // const testBal = await fetchBalance(address, true) // Fetch testnet balance
      // const mainBal = await fetchBalance(address, false) // Fetch mainnet balance
      // setTestnetBalance(testBal)
      // setMainnetBalance(mainBal)

    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect to Freighter wallet.")
    }
  }

  // Disconnect the wallet
  const disconnectWallet = () => {
    setWalletAddress(null)
    setTestnetBalance("0")
    setMainnetBalance("0")
  }

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        testnetBalance,
        mainnetBalance,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

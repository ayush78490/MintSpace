import { Rocket } from "lucide-react"
import SdkVersionSelector from "@/components/sdk-version-selector"

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6">
      <div className="flex items-center">
        <Rocket className="h-6 w-6 text-blue-400 mr-2" />
        <h1 className="text-xl font-bold text-white">MintSpace IDE</h1>

        <div className="ml-auto flex items-center space-x-4">
          <SdkVersionSelector />
          <a
            href="https://soroban.stellar.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/stellar/soroban-examples"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-300 hover:text-white transition-colors"
          >
            Examples
          </a>
        </div>
      </div>
    </header>
  )
}

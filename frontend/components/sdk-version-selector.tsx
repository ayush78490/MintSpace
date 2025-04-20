"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSdkVersion } from "@/context/sdk-version-context"

export default function SdkVersionSelector() {
  const { sdkVersion, setSdkVersion } = useSdkVersion()
  const [open, setOpen] = useState(false)

  const versions = [
    { value: "1.0.0", label: "Soroban SDK 1.0.0 (Latest)" },
    { value: "0.11.0", label: "Soroban SDK 0.11.0" },
    { value: "0.10.0", label: "Soroban SDK 0.10.0" },
    { value: "0.9.0", label: "Soroban SDK 0.9.0" },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700">
          <span>SDK: {sdkVersion}</span>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px] bg-gray-800 border-gray-700">
        {versions.map((version) => (
          <DropdownMenuItem
            key={version.value}
            className={`flex items-center justify-between ${
              sdkVersion === version.value ? "bg-gray-700" : ""
            } hover:bg-gray-700 text-gray-200`}
            onClick={() => {
              setSdkVersion(version.value)
              setOpen(false)
            }}
          >
            {version.label}
            {sdkVersion === version.value && <Check className="h-4 w-4 text-green-500" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

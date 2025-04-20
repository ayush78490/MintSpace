"use client"

import { useRef, useEffect, useState } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { useSdkVersion } from "@/context/sdk-version-context"
import { getTokenContractExample, getMarketplaceContractExample } from "@/lib/code-examples"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActionButton from "@/components/action-buttons"  // Import ActionButton
import { editor } from "monaco-editor"

export default function CodeEditorPanel() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { sdkVersion, codeExample } = useSdkVersion()
  const [currentCode, setCurrentCode] = useState(codeExample)
  const [selectedTemplate, setSelectedTemplate] = useState("hello")

  // Update editor content when SDK version changes
  useEffect(() => {
    if (selectedTemplate === "hello") {
      setCurrentCode(codeExample)
    } else if (selectedTemplate === "token") {
      setCurrentCode(getTokenContractExample(sdkVersion))
    } else if (selectedTemplate === "marketplace") {
      setCurrentCode(getMarketplaceContractExample(sdkVersion))
    }
  }, [sdkVersion, codeExample, selectedTemplate])

  // Configure Monaco editor on mount
  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor

    // Set editor options
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, 'Courier New', monospace",
      fontSize: 14,
      lineHeight: 1.5,
      fontLigatures: true,
      renderLineHighlight: "all",
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
      smoothScrolling: true,
    })
  }

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    if (template === "hello") {
      setCurrentCode(codeExample)
    } else if (template === "token") {
      setCurrentCode(getTokenContractExample(sdkVersion))
    } else if (template === "marketplace") {
      setCurrentCode(getMarketplaceContractExample(sdkVersion))
    }
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <Tabs defaultValue="hello" value={selectedTemplate} onValueChange={handleTemplateChange} className="w-full">
          <TabsList className="bg-gray-700">
            <TabsTrigger value="hello" className="data-[state=active]:bg-gray-600">
              Hello Contract
            </TabsTrigger>
            <TabsTrigger value="token" className="data-[state=active]:bg-gray-600">
              Token Contract
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-gray-600">
              Marketplace Contract
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          language="rust"
          value={currentCode}
          theme="vs-dark"
          options={{
            readOnly: false,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            wrappingIndent: "same",
            minimap: { enabled: true },
          }}
          onMount={handleEditorDidMount}
          onChange={(value) => setCurrentCode(value || "")}
        />
      </div>
      <ActionButton currentCode={currentCode} /> {/* Pass currentCode to ActionButton */}
    </div>
  )
}

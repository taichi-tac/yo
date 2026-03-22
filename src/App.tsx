import { useState } from 'react'
import ScriptGenerator from './components/ScriptGenerator'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            YouTube台本ジェネレーター
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            タイトルを入力するだけで、AIが魅力的な台本を自動生成
          </p>
        </header>

        <ScriptGenerator />

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Anthropic Claude API</p>
        </footer>
      </div>
    </div>
  )
}

export default App

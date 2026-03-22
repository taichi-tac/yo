import { useState } from 'react'
import { generateScript } from '../services/api'
import TitleInput from './TitleInput'
import ScriptDisplay from './ScriptDisplay'
import LoadingSpinner from './LoadingSpinner'

export default function ScriptGenerator() {
  const [title, setTitle] = useState('')
  const [script, setScript] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError('タイトルを入力してください')
      return
    }

    if (title.length > 200) {
      setError('タイトルは200文字以内で入力してください')
      return
    }

    setIsLoading(true)
    setError(null)
    setScript('')

    try {
      const generatedScript = await generateScript(title)
      setScript(generatedScript)
    } catch (err) {
      setError(err instanceof Error ? err.message : '台本の生成に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <TitleInput
        value={title}
        onChange={setTitle}
        onGenerate={handleGenerate}
        disabled={isLoading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="mt-8">
          <LoadingSpinner />
        </div>
      )}

      {script && !isLoading && (
        <div className="mt-8">
          <ScriptDisplay script={script} title={title} />
        </div>
      )}
    </div>
  )
}

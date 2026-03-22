interface TitleInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  disabled: boolean
}

export default function TitleInput({ value, onChange, onGenerate, disabled }: TitleInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          動画タイトル
        </label>
        <input
          id="title"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="例: 初心者でもわかるプログラミング入門"
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          maxLength={200}
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {value.length} / 200文字
        </p>
      </div>

      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-purple-600 disabled:hover:to-pink-600 shadow-lg hover:shadow-xl"
      >
        {disabled ? '生成中...' : '台本を生成する'}
      </button>
    </form>
  )
}

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 font-medium">
        AIが台本を生成しています...
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        30秒ほどお待ちください
      </p>
    </div>
  )
}

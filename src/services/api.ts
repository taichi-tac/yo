const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || '/api/generate-script'

export async function generateScript(title: string): Promise<string> {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.script
}

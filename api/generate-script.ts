import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SCRIPT_PROMPT = `あなたは優秀なYouTubeコンテンツクリエイターです。
以下のタイトルの動画用の台本を作成してください。

台本の構成:
1. 【オープニング】(30秒)
   - 視聴者の注意を引くフック
   - 簡単な自己紹介

2. 【本編】(5-8分)
   - 導入: 問題提起
   - 解決策1: 具体的な方法（実例やデータを含む）
   - 解決策2: 別のアプローチ
   - 解決策3: 追加のヒントやコツ
   - まとめ

3. 【クロージング】(30秒-1分)
   - 要点のまとめ
   - 視聴者へのCTA（チャンネル登録、コメント促進）
   - 次回予告

要件:
- 視聴者に語りかける口調で書く
- 具体例を豊富に含める
- 各セクションの目安時間を記載
- 5-10分程度の動画を想定
- 視聴者が最後まで見たくなる構成にする

タイトル: {TITLE}

台本を作成してください。`

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title } = req.body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required' })
    }

    if (title.length > 200) {
      return res.status(400).json({ error: 'Title is too long (max 200 characters)' })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: 'API key not configured' })
    }

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: SCRIPT_PROMPT.replace('{TITLE}', title),
        },
      ],
    })

    const script = message.content[0].type === 'text'
      ? message.content[0].text
      : ''

    return res.status(200).json({ script })
  } catch (error) {
    console.error('Error generating script:', error)
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to generate script',
    })
  }
}

import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// AI / answer-engine crawlers we explicitly welcome. The wildcard rule below
// already permits them, but naming each one makes the intent unambiguous to
// audits and to crawlers that look for an explicit allow.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI / ChatGPT
  'OAI-SearchBot', // OpenAI search
  'ChatGPT-User', // ChatGPT browsing
  'ClaudeBot', // Anthropic / Claude
  'anthropic-ai', // Anthropic (legacy UA)
  'Claude-Web', // Claude browsing
  'PerplexityBot', // Perplexity
  'Google-Extended', // Google AI (Gemini / AI Overviews training)
  'CCBot', // Common Crawl (feeds many LLMs)
  'Applebot-Extended', // Apple AI
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Explicit allow for AI / answer-engine crawlers.
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: SITE_URL + '/sitemap.xml',
    host: SITE_URL,
  }
}

import type { Metadata } from 'next'
import ChatbotAdmin from '@/components/ChatbotAdmin'

// Protected by middleware.ts (HTTP Basic Auth). Never indexed.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Chatbot Editor',
  robots: { index: false, follow: false },
}

export default function ChatbotAdminPage() {
  return <ChatbotAdmin />
}

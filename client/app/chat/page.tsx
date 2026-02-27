'use client';

import { useState } from 'react';
import { sendChatMessage } from '@/lib/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    const userMessage = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendChatMessage(prompt);
      console.log('API Response:', response);

      if (response.error) {
        setError(response.error);
      } else {
        const outputText = response.output_text || '';
        const messageItem = response.output?.find((item: any) => item.type === 'message');
        const textContent = messageItem?.content?.find((c: any) => c.type === 'output_text');
        const content = outputText || textContent?.text || 'No response';
        const assistantMessage = { role: 'assistant', content };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>

      <div className="space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-gray-100'
            }`}
          >
            <p className="font-semibold text-sm">{message.role}</p>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
        >
          {loading && (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

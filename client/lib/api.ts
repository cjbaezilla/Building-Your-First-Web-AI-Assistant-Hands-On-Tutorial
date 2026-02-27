export interface ChatRequest {
  prompt: string;
}

export interface ChatResponse {
  id?: string;
  model?: string;
  output_text?: string;
  output?: Array<{
    type?: string;
    role?: string;
    content?: Array<{
      type: string;
      text?: string;
    }>;
  }>;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  };
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function sendChatMessage(prompt: string): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to the server');
    }
    throw error;
  }
}

import { useState, useRef, useEffect, useCallback } from 'react';
import MessageList from './MessageList';

function Chat({ apiKey, onClearKey }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const textareaRef = useRef(null);

  // Set up stream listeners
  useEffect(() => {
    const unsubChunk = window.electronAPI.onStreamChunk((chunk) => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && last.role === 'assistant') {
          last.content += chunk;
        }
        return [...updated];
      });
    });

    const unsubDone = window.electronAPI.onStreamDone(() => {
      setIsStreaming(false);
    });

    const unsubError = window.electronAPI.onStreamError((err) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: `❌ Error: ${err}`, error: true }]);
      setIsStreaming(false);
    });

    return () => {
      unsubChunk();
      unsubDone();
      unsubError();
    };
  }, []);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    setInput('');
    setIsStreaming(true);

    // Build the messages array for the API
    const apiMessages = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    window.electronAPI.streamChat({ apiKey, messages: apiMessages, model: 'deepseek-chat' });
  }, [input, isStreaming, messages, apiKey]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 150) + 'px';
    }
  }, [input]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>
          <span className="dot" />
          BYOK Chat
          <span className="model-badge">deepseek-chat</span>
        </h2>
        <button onClick={onClearKey}>Change API Key</button>
      </div>

      <MessageList messages={messages} isStreaming={isStreaming} />

      <div className="input-container">
        <div className="input-row">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            rows={1}
            disabled={isStreaming}
          />
          <button onClick={handleSend} disabled={!input.trim() || isStreaming}>
            {isStreaming ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

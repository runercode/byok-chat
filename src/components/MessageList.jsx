import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function TypingIndicator() {
  return (
    <div className="message assistant">
      <div className="avatar">🤖</div>
      <div className="bubble">
        <div className="typing-indicator">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

function MessageList({ messages, isStreaming }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  if (messages.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">💬</div>
        <h3>Start a conversation</h3>
        <p>Send a message below to chat with DeepSeek. Your API key is stored locally and never leaves your machine.</p>
      </div>
    );
  }

  return (
    <div className="messages-container">
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.role}`}>
          <div className="avatar">{msg.role === 'user' ? '👤' : '🤖'}</div>
          <div className="bubble">
            {msg.role === 'assistant' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            ) : (
              <p>{msg.content}</p>
            )}
          </div>
        </div>
      ))}
      {isStreaming && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;

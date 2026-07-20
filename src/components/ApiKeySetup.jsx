import { useState } from 'react';

function ApiKeySetup({ onSetKey }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed) {
      setError('Please enter your API key.');
      return;
    }
    if (!trimmed.startsWith('sk-')) {
      setError('Invalid key format. DeepSeek keys start with "sk-".');
      return;
    }
    setError('');
    onSetKey(trimmed);
  };

  return (
    <div className="setup-container">
      <h1>BYOK Chat</h1>
      <p>
        Bring your own DeepSeek API key to start chatting.
        Get one at{' '}
        <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noreferrer">
          platform.deepseek.com
        </a>
        . Your key is stored <strong>locally only</strong> — never sent anywhere else.
      </p>

      <form onSubmit={handleSubmit} className="key-input-group">
        <input
          type="password"
          placeholder="sk-..."
          value={key}
          onChange={(e) => { setKey(e.target.value); setError(''); }}
          autoFocus
        />
        <button type="submit">Connect</button>
      </form>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default ApiKeySetup;

import { useState, useEffect, useCallback } from 'react';
import ApiKeySetup from './components/ApiKeySetup';
import Chat from './components/Chat';

function App() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('byok_deepseek_key');
    if (stored) setApiKey(stored);
  }, []);

  const handleSetKey = useCallback((key) => {
    localStorage.setItem('byok_deepseek_key', key);
    setApiKey(key);
  }, []);

  const handleClearKey = useCallback(() => {
    localStorage.removeItem('byok_deepseek_key');
    setApiKey(null);
  }, []);

  if (!apiKey) {
    return <ApiKeySetup onSetKey={handleSetKey} />;
  }

  return <Chat apiKey={apiKey} onClearKey={handleClearKey} />;
}

export default App;

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Send a chat message to DeepSeek (non-streaming)
  chat: (params) => ipcRenderer.invoke('deepseek-chat', params),

  // Stream a chat message from DeepSeek
  streamChat: (params) => ipcRenderer.send('deepseek-stream', params),

  // Listen for stream chunks
  onStreamChunk: (callback) => {
    const handler = (_event, chunk) => callback(chunk);
    ipcRenderer.on('deepseek-stream-chunk', handler);
    return () => ipcRenderer.removeListener('deepseek-stream-chunk', handler);
  },

  // Listen for stream completion
  onStreamDone: (callback) => {
    const handler = () => callback();
    ipcRenderer.on('deepseek-stream-done', handler);
    return () => ipcRenderer.removeListener('deepseek-stream-done', handler);
  },

  // Listen for stream errors
  onStreamError: (callback) => {
    const handler = (_event, error) => callback(error);
    ipcRenderer.on('deepseek-stream-error', handler);
    return () => ipcRenderer.removeListener('deepseek-stream-error', handler);
  },
});

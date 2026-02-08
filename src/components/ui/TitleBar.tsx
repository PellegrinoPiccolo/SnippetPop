import React from 'react'

const TitleBar = () => {
  const handleMinimize = () => {
    window.electronAPI.minimize();
  };

  const handleMaximize = () => {
    window.electronAPI.maximize();
  };

  const handleClose = () => {
    window.electronAPI.close();
  };

  return (
    <header className="custom-titlebar">
      <div className="drag-region">
        <span className="app-title">SnippetPop</span>
      </div>
      <div className="window-controls">
        <button onClick={handleMinimize} className="control-btn">—</button>
        <button onClick={handleMaximize} className="control-btn">▢</button>
        <button onClick={handleClose} className="control-btn close-btn">✕</button>
      </div>
    </header>
  );
}

export default TitleBar
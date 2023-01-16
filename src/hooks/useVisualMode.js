import { useState } from 'react';

export  function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(changedMode, replace = false) {
    if (!replace) {
      setHistory([...history, changedMode])
      setMode(changedMode);
    } else {
      const tempHistory = [...history];
      tempHistory.pop();
      tempHistory.push(changedMode);
      setHistory([...tempHistory])
      setMode(changedMode);
    }
  }

  function back() {
    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setHistory([...tempHistory]);
      setMode(tempHistory[tempHistory.length - 1]);

    }
  }

  return { mode, transition, back };
}

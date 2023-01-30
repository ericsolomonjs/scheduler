import { useState } from 'react';

export  function useVisualMode(initialMode) {

  //initialize states
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //transition fn used to switch between VisualModes
  function transition(changedMode, replace = false) {

      if (!replace) {
        setHistory((prev) => [...prev, changedMode])
      } else {
        setHistory((prev) => {
          const tempHistory = [...prev];
          tempHistory[tempHistory.length-1] = changedMode;
          return tempHistory;
        })
      }

      setMode(changedMode);
      
  }

  //back function to return to previous History state
  function back() {
    if (history.length > 1) {

      setHistory((prev) => {
        const tempHistory = [...prev];
        tempHistory.pop();
        setMode(tempHistory[tempHistory.length-1]);
        return tempHistory;
      })


    }
  }

  return { mode, transition, back };
}

import React, { useState } from 'react';

const JoinLobby = ({ onSubmit }) => {
    const [lobbyKey, setLobbyKey] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validate and process the website list
      if (lobbyKey.trim() !== '') {
        onSubmit(lobbyKey);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Please Enter Lobby Key:
          <textarea
            value={lobbyKey}
            onChange={(e) => setLobbyKey(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default JoinLobby;
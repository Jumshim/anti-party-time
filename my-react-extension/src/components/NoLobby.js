import React, { useState } from 'react';
import SiteListForm from './SiteListForm';
import "./buttons.css";

const NoLobby = () => {
    const [showForm, setShowForm] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [lobbyKey, setLobbyKey] = useState('');

    const handleFormSubmit = (websiteList) => {
        // Process the website list and obtain the lobby key (replace with your logic)
        const generatedLobbyKey = 'your_generated_lobby_key';
        setLobbyKey(generatedLobbyKey);
      };
    
    const handleCreateClick = () => {
        setShowForm(true);
    };

    const handleJoinClick = () => {
        setShowJoin(true);
    }

    const handleBack = () => {
        setShowForm(false);
        setShowJoin(false);
    };


    return (
        <div>

            <button 
            className={`lobbyButton back ${(showForm || showJoin) ? 'slide-in' : 'slide-out'}`}
            onClick={handleBack}
            >

                Back

            </button>

            <button 
            className={`lobbyButton ${(showForm || showJoin) ? 'slide-out' : 'slide-in'}`}
            onClick={handleCreateClick}
            >
                Create Lobby
            </button>


            <button 
            className={`lobbyButton ${(showForm || showJoin) ? 'slide-out' : 'slide-in'}`}
            >
                Join Lobby
            </button>

            {showForm && (<SiteListForm onSubmit={handleFormSubmit}/>)}



        </div>
    );

};

export default NoLobby;
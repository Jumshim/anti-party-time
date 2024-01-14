import React, { useState } from 'react';
import SiteListForm from './SiteListForm';
import JoinLobby from './joinLobby';
import cslFuncs from './cslFuncs';
import "./buttons.css";

const NoLobby = () => {
    const [showForm, setShowForm] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [lobbyKey, setLobbyKey] = useState('');
    const [submittedData, setSubmittedData] = useState(null);
    const [keyData, setKeyData] = useState('');

    const initWebsites = (lobbyKey) => {

        const websites = ['youtube','facebook','instagram'] //note*** replace with post call to get websites with lobbyKey 
        const webDict = {};

        websites.forEach(website => {
            webDict[website] = 0;
        });
        
        cslFuncs.initialize('sites', webDict);

    };

    const handleFormSubmit = (websiteList) => {
        // Process the website list and obtain the lobby key (replace with your logic)
        console.log(websiteList);
        const generatedLobbyKey = 'your_generated_lobby_key';
        setLobbyKey(generatedLobbyKey);
        setSubmittedData(websiteList);
    };

    const handleJoinSubmit = (keyData) => {
        setKeyData(keyData);
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
            onClick={handleJoinClick}
            >
                Join Lobby
            </button>

            {showForm && (<SiteListForm onSubmit={handleFormSubmit}/>)}

            {showJoin && (<JoinLobby onSubmit={handleJoinSubmit}/>)}
            
            {submittedData && (
                <p>Submitted Data: {submittedData}</p>
            )}

            {keyData && (
                <p>Key Data: {keyData}</p>
            )}



        </div>
    );

};

export default NoLobby;
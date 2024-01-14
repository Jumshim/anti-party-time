import logo from "./logo.svg";
import "./App.css";
import NoLobby from './components/NoLobby';
import HasLobby from './components/HasLobby';
import Login from "./Login";
import { useEffect } from "react";
import UserProvider from "./assets/js/UserProvider";

const STORAGE = chrome.storage.local;
// const chrome = window.chrome || chrome;

let hasLobby = false;
const getData = (key) => {
  return new Promise((resolve) => {
      STORAGE.get(key, result => (result[key] ? resolve(result[key]) : resolve({})));
  });
};

let lobby = await getData("lobby");

if (lobby["id"]) hasLobby = true;

function App() {
  return (
    <UserProvider>
      <div className="App">
        <header className="App-header">
          {hasLobby ? (<HasLobby />) : (<NoLobby />)}
          <Login/>
        </header>
      </div>
    </UserProvider>
  );
}

export default App;

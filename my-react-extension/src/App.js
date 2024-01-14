import logo from "./logo.svg";
import "./App.css";

import Login from "./Login";
import { useEffect } from "react";
import UserProvider from "./assets/js/UserProvider";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Login />
        </header>
      </div>
    </UserProvider>
  );
}

export default App;

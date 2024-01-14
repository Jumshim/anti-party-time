import "./App.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./assets/js/UserProvider";
import Authenticate from "./components/Authenticate";
import NoLobby from "./components/NoLobby";
import CreateLobby from "./components/CreateLobby";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/no_lobby" element={<NoLobby />} />
            <Route path="/create_lobby" element={<CreateLobby />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

import "./App.css";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./assets/js/UserProvider";
import Authenticate from "./components/Authenticate";
import NoLobby from "./components/NoLobby";
import CreateLobby from "./components/CreateLobby";
import AddSites from "./components/AddSites";
import Profile from "./components/Profile";
import JoinLobby from "./components/JoinLobby";
import Ranking from "./components/Ranking";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Authenticate />} />
            <Route path="/no_lobby" element={<NoLobby />} />
            <Route path="/add_sites" element={<AddSites />} />
            <Route path="/create_lobby" element={<CreateLobby />} />
            <Route path="/join_lobby" element={<JoinLobby />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

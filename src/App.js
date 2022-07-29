import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }] = useStateValue();
  return (
    <div className="App">
      <div className="app__body">
        {!user ? (
          <>
            <Login />
          </>
        ) : (
          <Routes>
            <Route exact path="/" element={<Sidebar />}>
              <Route path="/chats/:id" element={<Chat />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;

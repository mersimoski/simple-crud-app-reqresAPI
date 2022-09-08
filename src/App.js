import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Routes>
      <Route exact path={`/`} element={user ? <Homepage /> : <Login />} />
      <Route path={`/login`} element={user ? <Homepage /> : <Login />} />
      <Route path={`/register`} element={user ? <Homepage /> : <Register />} />
    </Routes>
  );
}

export default App;


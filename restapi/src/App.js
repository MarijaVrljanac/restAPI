import './App.css';
import HomePage from "./components/HomePage";
import User from "./components/User";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
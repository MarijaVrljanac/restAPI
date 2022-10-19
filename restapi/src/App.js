import './App.css';
import HomePage from "./components/HomePage";
import User from "./components/User";
import Users from "./components/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        {/* <Route path="/user/:login" element={<User/>}/> */}
        <Route path="/users/:login" element={<Users/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
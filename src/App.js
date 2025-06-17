import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'; // Import the Menu component
import AddUser from "./components/AddUser";


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

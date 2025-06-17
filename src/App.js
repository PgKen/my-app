import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home'; // Import the Menu component
import AddUser from "./components/AddUser";
import AddTicket from "./components/AddTicket";


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/addticket" element={<AddTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

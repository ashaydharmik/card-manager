
import './App.css';
import Home from './components/Home/Home';
import {Routes,Route} from "react-router-dom"
import ListUsers from "./components/ListUser/ListUsers"
function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/listUsers" element={<ListUsers/>}/>
    
    </Routes>
    </>
  );
}

export default App;

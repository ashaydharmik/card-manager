
import './App.css';
import Home from './components/Home/Home';
import {Routes,Route} from "react-router-dom"
import ListUsers from "./components/ListUser/ListUsers"
import Teams from './components/Teams/Teams';
function App() {
  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/listUsers" element={<ListUsers/>}/>
    <Route path='/teams' element={<Teams/>}/>
    </Routes>
    </>
  );
}

export default App;


import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path="/login"  Component={Login} />
    <Route path="/signup"  Component={Signup}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;

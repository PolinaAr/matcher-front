import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import CreateUser from './components/users/CreateUser';
import GetAllUsers from './components/users/GetAllUsers';
import NavBar from './components/NavBar';
import GeneratePair from './components/generator/GeneratePair';
import ChoosePeople from './components/generator/ChoosePeople';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/register' element={<CreateUser />} />
          <Route path='/users' element={<GetAllUsers />} />
          <Route path='/choose' element={<ChoosePeople />} />
          <Route path='/pairs' element={<GeneratePair />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

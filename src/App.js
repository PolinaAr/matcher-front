import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import CreateUser from './components/users/CreateUser';
import GetAllUsers from './components/users/GetAllUsers';
import NavBar from './components/NavBar';
import GeneratePair from './components/generator/GeneratePair';
import ChoosePeople from './components/generator/ChoosePeople';
import CreateTeam from './components/teams/CreateTeam';
import UpdateUserTeam from './components/users/UpdateUserTeam';
import AddIndividualMark from './components/marks/AddIndividualMark';
import GetAllMarks from './components/marks/GetAllMarks';

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
          <Route path='/team' element={<CreateTeam />} />
          <Route path="/users/:id" element={<UpdateUserTeam />}  />
          <Route path='/users/:id/marks/add' element={<AddIndividualMark />} />
          <Route path='/users/:id/marks' element={<GetAllMarks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

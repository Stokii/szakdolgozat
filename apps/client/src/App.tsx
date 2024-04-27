import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './components/data/EmpListing';
import EmpCreate from './components/data/EmpCreate';
import EmpDetails from './components/data/EmpDetails';
import EmpEdit from './components/data/EmpEdit';

function App() {
  return (
    <>
      <h1>Hello world!</h1>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<EmpListing />}></Route>
            <Route path='/employee/create' element={<EmpCreate />}></Route>
            <Route path='/employee/details/:empid' element={<EmpDetails />}></Route>
            <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

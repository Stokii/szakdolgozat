import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmpListing from './components/data/EmpListing';

function App() {
  return (
    <>
      <h1>Hello world!</h1>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<EmpListing />}>

            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App

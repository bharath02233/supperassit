import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/createQuiz" element={<CreateQuiz/>}></Route>
        <Route path="/takeQuiz" element={<TakeQuiz/>}></Route>
        
      </Routes>
      <Outlet/>
    </>
  )
}

export default App

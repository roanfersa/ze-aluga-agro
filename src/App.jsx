import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignInPage from './pages/signin/SignInPage'
import SupportPage from './pages/support/SupportPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/support" element={<SupportPage/>}/>
      </Routes>
    </>
  )
}

export default App

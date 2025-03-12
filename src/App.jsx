import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignInPage from './pages/signin/SignInPage'
import SupportPage from './pages/support/SupportPage'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/support" element={<SupportPage/>}/>
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  )
}

export default App

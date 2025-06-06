import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomPage from './components/pages/WelcomPage'
import CLPage from './components/pages/CLPage'

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<WelcomPage />} />
          <Route path="/User-login" element={<CLPage />} />
        </Routes>
    </>
  )
}

export default App;

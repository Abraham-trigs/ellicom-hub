import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomPage from './components/pages/WelcomPage'
import CTLPage from './components/pages/CTLPage'
import SLpage from './components/pages/SLPage';
import Home from './components/pages/Home';
import SDashboard from './components/pages/SDashboard';
import CTDashboard from './components/pages/CTDashboard';

function App() {
  return (
    <>
        <LayoutWithNav>
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/User-login" element={<CTLPage />} />
            <Route path="/Staff-Login" element={<SLpage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Staff-Dashboard" element={<SDashboard />} />
            <Route path="/User-Dashboard" element={<CTDashboard />} />

          </Routes>
        </LayoutWithNav>
    </>
  )
}

export default App;

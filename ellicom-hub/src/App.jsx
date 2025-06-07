import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomPage from './components/pages/WelcomPage'
import CLPage from './components/pages/CLPage'
import SLpage from './components/pages/SLPage';
import Home from './components/pages/Home';

function App() {
  return (
    <>
    <router>
        <LayoutWithNav>
          <Routes>
            <Route path="/" element={<WelcomPage />} />
            <Route path="/User-login" element={<CLPage />} />
            <Route path="/Staff-Login" element={<SLpage />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </LayoutWithNav>
      </router>
    </>
  )
}

export default App;

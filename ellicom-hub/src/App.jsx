import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomPage from './components/pages/WelcomPage'
import CTLPage from './components/pages/CTLPage'
import SLpage from './components/pages/SLPage';
import Home from './components/pages/Home';
import SDashboard from './components/pages/SDashboard';
import CTDashboard from './components/pages/CTDashboard';
import CTJobCard from './components/UI/CTJobCard';
import CTJobList from './components/UI/CTJobList';


function App() {
  return (
    <>
        <LayoutWithNav>
          <Routes>
            
            {/* Admin */}

            {/*Guest Routes  */}
            <Route path="/" element={<WelcomPage />} />

            {/* Staff Routes */}
            <Route path="Staff/Login" element={<SLpage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Staff/Dashboard" element={<SDashboard />} />

            {/* Client Routes */}
            <Route path="Client/login" element={<CTLPage />} />
            <Route path="/Client/JobCard" element={<CTJobCard />} />
            <Route path="/Client/Dashboard" element={<CTDashboard/>} />
            <Route path="/Client/JobCard/Joblist" element={<CTJobList/>} />
          </Routes>
        </LayoutWithNav>
    </>
  )
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomPage from './components/pages/WelcomPage'
import CTLPage from './components/pages/CTLPage'
import SLpage from './components/pages/SLPage';
import Home from './components/pages/Home';
import SDashboard from './components/pages/SDashboard';
import CTJobCard from './components/UI/CTJobCard';
import CTJobList from './components/pages/CTJobList';
import AddJob from './components/pages/AddJob';


function App() {
  return (
    <>
      <LayoutWithNav>
        <Routes>
          {/* Operator Routes  */}
          <Route path="/" element={<WelcomPage />} />
          
          {/* Admin */}
          <Route path="/" element={<WelcomPage />} />d

          {/*Guest Routes  */}
          <Route path="/" element={<WelcomPage />} />

          {/* Staff Routes */}
          <Route path="Staff/Login" element={<SLpage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Staff/Dashboard" element={<SDashboard />} />

          {/* Client Routes */}
          <Route path="Client/login" element={<CTLPage />} />
          <Route path="/Client/JobCard" element={<CTJobCard />} />
          <Route path="/Client/Dashboard" element={<CTJobList/>} />
          <Route path="/Client/JobList" element={<CTJobList/>} />
          <Route path="/Client/Add-Job" element={<AddJob/>} />
          <Route path="/Client/JobList" element={<CTJobList/>} />
          <Route path="/Client/Job-Details" element={<AddJob/>} />

        </Routes>
      </LayoutWithNav>
    </>
  )
}

export default App;

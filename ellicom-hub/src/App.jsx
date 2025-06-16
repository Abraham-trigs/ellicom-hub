import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutWithNav from './components/UI/LayoutWithNavBar';
import WelcomPage from './components/pages/WelcomPage'
import CTLPage from './components/pages/ClientPages/CTLPage';
import SLpage from './components/pages/StaffPages/SLPage';
import Home from './components/pages/StaffPages/Home';
import SDashboard from './components/pages/STaffPages/SDashboard';
import CTJobCard from './components/UI/CLIENT-UI/CTJobCard';
import AddJobPage from './components/pages/AddJobPage';
import JobCard from './components/UI/CLIENT-UI/JobCard';
import CTJobList from './components/pages/ClientPages/CTJobList';
import JobDetailsPage from './components/pages/JobDetailsPage';


function App() {
  return (
    <>
      <LayoutWithNav>
        <Routes>
          {/* Operator Routes  */}
          <Route path="/" element={<WelcomPage />} />
          
          {/* Admin */}
          <Route path="/" element={<WelcomPage />} />

          {/*Guest Routes  */}
          <Route path="/" element={<WelcomPage />} />
          <Route path="/Guest/Add-Job" element={<AddJobPage/>} />


          {/* Staff Routes */}
          <Route path="Staff/Login" element={<SLpage />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Staff/Dashboard" element={<SDashboard />} />

          {/* Client Routes */}
          <Route path="Client/login" element={<CTLPage />} />
          <Route path="/Client/JobCard" element={<CTJobCard />} />
          <Route path="/Client/Dashboard" element={<CTJobList/>} />
          <Route path="/Client/JobList" element={<CTJobList/>} />
          <Route path="/Client/Add-Job" element={<AddJobPage/>} />
          <Route path="/Client/JobList" element={<CTJobList/>} />
          <Route path="/client/JobID/JobDetails" element={<JobDetailsPage />} />

        </Routes>
      </LayoutWithNav>
    </>
  )
}

export default App;

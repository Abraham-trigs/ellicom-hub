import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomPage from './components/pages/WelcomPage';
import CLPage from './components/pages/CLPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomPage />} />
        <Route path="/Login" element={<CLPage />} />
      </Routes>
    </Router>
  );
}

export default App;

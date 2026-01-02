import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Backrooms from './pages/Backrooms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backrooms" element={<Backrooms />} />
      </Routes>
    </Router>
  );
}

export default App;

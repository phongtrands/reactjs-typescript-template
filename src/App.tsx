
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin';
import PrivateRoute from './component/PrivateRoute';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './component/Signup';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import PrivateRoute from './PrivateRoute';
import Alldata from './component/Alldata';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/alldata' element={<Alldata />} />
          <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

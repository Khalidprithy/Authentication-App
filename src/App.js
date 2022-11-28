import './App.css';
import NavigationBar from './Shared/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Footer from './Shared/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Login from './Authentication/Login';
import SignUp from './Authentication/SignUp';
import RequireAuth from './Shared/RequireAuth';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from './Shared/ForgotPassword';
import Profile from './Pages/Profile';

function App() {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/profile' element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
      </Routes>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
}

export default App;

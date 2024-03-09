import './App.css';
// import Navbar from './components/Navbar'
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import StaffMain from './components/StaffMain';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Footer from './components/Footer';
import AdminStaffInfo from './components/AdminStaffInfo';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/StaffMain' element={<StaffMain/>}/>
        <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
        <Route path='/StaffDashboard' element={<StaffDashboard/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Signup' element={<SignUp/>}/>
        <Route path='/AdminStaffInfo' element={<AdminStaffInfo/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

import './App.css';
import Login from './components/account/login';
import DataProvider from './context/Dataprovider';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Header from './components/header/Header';
import { useState } from 'react';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailsView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import { ToastContainer } from 'react-toastify';

const PrivateRoute = ({isAuthenticated, ...props}) => {

  return isAuthenticated ?
  <>
    <Header />
    <Outlet />
  </>
  : <Navigate to='/api/login' />
}


function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  
  return (
    
    <DataProvider>
      <ToastContainer autoClose="2000"/>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path='/api/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

          <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/' element={ <Home />} />
          </Route>

          <Route path='/api/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/api/create' element={ <CreatePost />} />
          </Route>

          <Route path='/api/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/api/details/:id' element={ <DetailView />} />
          </Route>

          <Route path='/api/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/api/update/:id' element={ <Update />} />
          </Route>

          <Route path='/api/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/api/about' element={ <About />} />
          </Route>

          <Route path='/api/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>} >
            <Route path='/api/contact' element={ <Contact />} />
          </Route>

        </Routes>
      </div>
      </BrowserRouter>
    </DataProvider>
    
  );
}

export default App;

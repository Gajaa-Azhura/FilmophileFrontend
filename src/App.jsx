     import React, { useState, useEffect } from 'react';
     import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
     import Home from './pages/Home';
     import UserDashboard from './pages/UserDashboard';
     import ArtProviderDashboard from './pages/ArtProviderDashboard';
     import AdminDashboard from './pages/AdminDashboard';
     import Payment from './pages/Payment';
     import About from './pages/About';
     import FilmsList from '../src/pages/FilmList';
     import FilmDetail from './pages/FilmDetail';
     import SearchResults from './pages/SearchResults';
     import Contact from './pages/Contact';
     import ArtProviderProfile from './pages/ArtProviderProfile';
     import UserProfile from './pages/UserProfile';
     import AdminProfile from './pages/AdminProfile';
     import Watch from './pages/Watch'; // Import the Watch page
     import Login from './pages/Login'; // Import the Login page
     import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component
     import Loader from './components/Loader'; // Import the Loader component

     const AppContent = () => {
       const [loading, setLoading] = useState(true);
       const location = useLocation();

       useEffect(() => {
         setLoading(true);
         const timer = setTimeout(() => {
           setLoading(false);
         }, 1000); // 1 second loader on page change
         return () => clearTimeout(timer);
       }, [location]);

       return (
         <>
           {loading ? (
             <div className="loader-container">
               <Loader />
             </div>
           ) : (
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/user-dashboard" element={<PrivateRoute allowedRoles={['user']}><UserDashboard /></PrivateRoute>} />
               <Route path="/art-provider-dashboard" element={<PrivateRoute allowedRoles={['provider']}><ArtProviderDashboard /></PrivateRoute>} />
               <Route path="/admin-dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
               <Route path="/payment" element={<Payment />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/art-provider-profile" element={<PrivateRoute allowedRoles={['provider']}><ArtProviderProfile /></PrivateRoute>} />
               <Route path="/profile" element={<PrivateRoute allowedRoles={['user']}><UserProfile /></PrivateRoute>} />
               <Route path="/films" element={<FilmsList />} />
               <Route path="/films/:id" element={<FilmDetail />} />
               <Route path="/search" element={<SearchResults />} />
               <Route path="/admin-profile" element={<PrivateRoute allowedRoles={['admin']}><AdminProfile /></PrivateRoute>} />
               <Route path="/watch" element={<Watch />} /> {/* Add watch route */}
             </Routes>
           )}
         </>
       );
     };

     function App() {
       return (
         <Router>
           <AppContent />
         </Router>
       );
     }

     export default App;
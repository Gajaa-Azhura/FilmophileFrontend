     import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
     import Home from './pages/Home';
     import UserDashboard from './pages/UserDashboard';
     import ArtProviderDashboard from './pages/ArtProviderDashboard';
     import AdminDashboard from './pages/AdminDashboard';
     import Payment from './pages/Payment';
     import About from './pages/About';
     import Contact from './pages/Contact';
     import ArtProviderProfile from './pages/ArtProviderProfile';
     import UserProfile from './pages/UserProfile';
     import AdminProfile from './pages/AdminProfile';
     import Watch from './pages/Watch'; // Import the Watch page
     function App() {
       return (
         <Router>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/user-dashboard" element={<UserDashboard />} />
             <Route path="/art-provider-dashboard" element={<ArtProviderDashboard />} />
             <Route path="/admin-dashboard" element={<AdminDashboard />} />
             <Route path="/payment" element={<Payment />} />
             <Route path="/about" element={<About />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/art-provider-profile" element={<ArtProviderProfile />} />
             <Route path="/profile" element={<UserProfile />} />
             <Route path="/admin-profile" element={<AdminProfile />} />
             <Route path="/watch" element={<Watch />} /> {/* Add watch route */}
           </Routes>
         </Router>
       );
     }

     export default App;
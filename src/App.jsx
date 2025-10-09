



// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

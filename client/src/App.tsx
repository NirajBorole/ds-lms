import React from 'react';
import Nav from './Component/Nav/Nav';
import LandingPage from './Pages/LandingPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Article from './Pages/Article';
import { ProtectedRoute } from './Routes/ProtectedRoutes';
import CoursePlan from './Pages/CoursePlan';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/course' element={<ProtectedRoute />}>
          <Route path='/course' element={<Article />} />
        </Route>
        <Route path='/plan' element={<ProtectedRoute />}>
          <Route path='/plan' element={<CoursePlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

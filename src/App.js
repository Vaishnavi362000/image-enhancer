import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import DashboardPage from './pages/DashboardPage';
import VerifyCodePage from './pages/VerifyCode';
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import ImageUpload from './pages/ImageUpload';
import ImageEditor from './pages/ImageEditor';
import History from './pages/History';



function App() {
  return (
      
        <Routes>
          <Route path="/" element={
            <>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
              <SignedOut>
                <LandingPage />
              </SignedOut>
            </>
          } />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-code" element={<VerifyCodePage />} />
          <Route path="/dashboard" element={
            <SignedIn>
              <Layout>
                <DashboardPage />
              </Layout>
            </SignedIn>   
          } />
          <Route path="/upload" element={
            <SignedIn>      
              <Layout>
                <ImageUpload />
              </Layout>
            </SignedIn> 
          } />
          <Route path="/image-enhancer" element={
            <SignedIn>      
              <Layout>
                <ImageEditor />
              </Layout>
            </SignedIn> 
          } />
          <Route path="/enhancement-history" element={
            <SignedIn>      
              <Layout>
                <History />
              </Layout>
            </SignedIn> 
          } />
        </Routes>
    
  );
}

export default App;
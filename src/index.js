import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/clerk-react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import supabase from './config/supabaseClient';


const PUBLISHABLE_KEY = process.env.REACT_APP_PUBLISHABLE_KEY;
const FRONTEND_API = process.env.REACT_APP_CLERK_FRONTEND_API;


console.log('PUBLISHABLE_KEY:', PUBLISHABLE_KEY);
console.log('FRONTEND_API:', FRONTEND_API);
console.log('SUPABASE:', supabase);


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

if (!FRONTEND_API) {
  throw new Error("Missing Frontend API");
}
 
ReactDOM.render(
  <GoogleOAuthProvider clientId="828806469773-s781pve0ffqghs6me2480ramqk9fajba.apps.googleusercontent.com">
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} frontendApi={FRONTEND_API} afterSignOutUrl="/" >
    
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
   
  </ClerkProvider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);



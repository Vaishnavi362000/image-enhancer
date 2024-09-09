import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Alert, AlertIcon, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn, SignInButton, ClerkLoaded, GoogleOneTap } from '@clerk/clerk-react';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';


function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("Attempting to sign in with:", email);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log("Sign-in result:", result);

      if (result.status === "complete") {
        console.log("Sign-in successful, navigating to dashboard...");
        window.location.href = '/dashboard';
      } else {
        console.log("Sign-in incomplete");
        setError('Sign-in incomplete. Please try again.');
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(error.message || 'Sign-in failed. Please try again.');
    }
  };

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google sign-in successful...");
      console.log("Access Token:", response.access_token);
      try {
          await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
          token: response.access_token
        });
      } catch (error) {
        console.error("Clerk sign-in error:", error);
        setError(error.message || 'Sign-in failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error("Google sign-in error:", error);
      setError(error.message || 'Google sign-in failed. Please try again.');
    }
  });

  const handleGoogleSignInb = async() => {
    console.log("Attempting to sign in with Google...");
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
      redirectUrl: "https://usable-hagfish-53.clerk.accounts.dev/v1/oauth_callback",
      redirectUrlComplete: "/dashboard",
      options: {
        prompt: "select_account"
      } 
    });
  } catch (error) {
    console.error("Google sign-in error:", error);
    setError(error.message || 'Google sign-in failed. Please try again.');
  }
};



  if (!isLoaded) {
    return <div>Loading...</div>; 
  }

  return (
    <Box 
      className="signin-page" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bg="rgba(212, 212, 212, 0.79)" 
      backdropFilter="blur(10px)" 
       
      p={5}
    >
      <Box 
        height="auto"
        width={{ base: "90%", sm: "450px" }}
        boxShadow="lg"
        borderRadius="md" 
        bg="white" 
        p={8}
        mb={10}
      >
        <Heading textAlign="center" mb={4} mt={4}>Welcome Back</Heading>
        <Text textAlign="center" mb={8}>Please sign in to continue.</Text>
        <Box textAlign="center" mb={8}>
          <Button
            leftIcon={<FcGoogle />}
            colorScheme='black'
            size="sm"
            bg="rgba(212, 212, 212, 0.79)"
            boxShadow="sm"
            width="100%"
            height="40px"
            mb={4}
            onClick={handleGoogleSignIn}
          >
            Sign In with Google
          </Button>
          <Box display="flex" alignItems="center" my={2}>
            <Box flex="1" height="1px" bg="gray.300" />
            <Text mx={2}>OR</Text> 
            <Box flex="1" height="1px" bg="gray.300" />
          </Box> 
        </Box>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaEnvelope color="gray.500" />
              </InputLeftElement>
            <Input type="email" name="email" outlineColor="gray" placeholder="Enter your email" required />
            </InputGroup>
          </FormControl>
          <FormControl mb={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
            <InputLeftElement pointerEvents="none">
                <FaLock color="gray.500" />
              </InputLeftElement>
              <Input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                outlineColor="gray"
                placeholder="Enter your password" 
                required 
              />
              <InputRightElement onClick={() => setShowPassword(!showPassword)} cursor="pointer">
                {showPassword ? <FaEye color="gray.500" /> : <FaEyeSlash color="gray.500" />}
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Text mb={4} textAlign="center">
            Don't have an account? <Link to="/signup" style={{color: 'blue'}}>Sign Up</Link>
          </Text>
          <Button 
            className="signin-button" 
            bg="linear-gradient(90deg, rgba(49,115,157,1) 19%, rgba(154,217,255,1) 100%)" 
            _hover={{ bg: "linear-gradient(90deg, rgba(49,115,157,1) 19%, rgba(154,217,255,1) 100%)", opacity: 0.9 }}
            size="lg" 
            width="100%" 
            mt={4} 
            boxShadow="lg" 
            type="submit"
          >
            Sign In
          </Button>
        </form>
        
      </Box> 
    </Box>
  );
}

export default SignInPage;

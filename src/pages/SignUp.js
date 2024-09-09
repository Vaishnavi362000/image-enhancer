import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Heading, Input, Text, Alert, AlertIcon, InputGroup, InputLeftElement, InputRightElement, Divider } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp, useSignIn, SignUpButton, RedirectToSignUp} from '@clerk/clerk-react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin} from '@react-oauth/google';

function SignUpPage() {
  const { signUp, isLoaded } = useSignUp(); 
  const { signInWithRedirect } = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === "complete") {
        console.log("Sign-up successful, navigating to dashboard...");
        navigate('/dashboard');
      } else {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        navigate('/verify-code', { state: { isSignUp: true, email } });
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setError(error.message || 'Sign-up failed. Please try again.');
    }
  };

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google sign-up successful...");
      console.log("Access Token:", response.access_token);
      try {
          await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/dashboard",
          token: response.access_token
        });
      } catch (error) {
        console.error("Clerk sign-Up error:", error);
        setError(error.message || 'Sign-Up failed. Please try again.');
      }
    },
    onError: (error) => {
      console.error("Google sign-in error:", error);
      setError(error.message || 'Google sign-in failed. Please try again.');
    }
  });

  const handleGoogleSignUpp = () => {
    signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "https://usable-hagfish-53.clerk.accounts.dev/v1/oauth_callback",
      redirectUrlComplete: "/dashboard",
      options: {
        prompt: "select_account"
      }
    });
  };


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Box 
      className="signup-page" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bg="rgba(212, 212, 212, 0.79)" 
      backdropFilter="blur(10px)" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }} 
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
        <Heading textAlign="center" mb={4} mt={4}>Create an Account</Heading>
        <Text textAlign="center" mb={8}>Sign up to get started.</Text>
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
            onClick={handleGoogleSignUp}
          >
            Sign Up with Google
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
            <Text fontSize="sm" color="gray.500" mt={1}>
              Password must be at least 8 characters long and contain at least one number or symbol.
            </Text>
          </FormControl>
          <Text mb={4} textAlign="center">
            Already have an account? <Link to="/signin" style={{ color: 'blue' }}>Sign In</Link>
          </Text>
          <Button 
            className="signup-button" 
            bg="linear-gradient(90deg, rgba(49,115,157,1) 19%, rgba(154,217,255,1) 100%)"
            _hover={{ bg: "linear-gradient(90deg, rgba(49,115,157,1) 19%, rgba(154,217,255,1) 100%)", opacity: 0.9 }} 
            size="lg" 
            width="100%" 
            mt={4} 
            boxShadow="lg" 
            type="submit"
          >Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default SignUpPage;
 
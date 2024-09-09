import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';

const MotionBox = motion(Box);

function VerifyCode() {
  const { signUp, isLoaded } = useSignUp();
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const email = location.state?.email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      if (completeSignUp.status === "complete") {
        console.log("Sign-up verification successful, navigating to dashboard...");
        navigate('/dashboard');
      } else {
        console.log("Sign-up verification incomplete");
        setError('Verification incomplete. Please try again.');
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError(error.message || 'Verification failed. Please try again.');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <MotionBox 
      className="verify-page" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      bg="rgba(255, 255, 255, 0.5)" 
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
        <Heading textAlign="center" mb={4} mt={4}>Verify Your Email</Heading>
        <Text textAlign="center" mb={12}>Please enter the verification code sent to {email}.</Text>
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <FormControl mb={6}>
            <FormLabel>Verification Code</FormLabel>
            <Input 
              type="text" 
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              outlineColor="gray" 
              placeholder="Enter verification code" 
              required 
            />
          </FormControl>
          <Button className="verify-button" bg="pink.500" size="lg" width="100%" mt={4} type="submit">Verify</Button>
        </form>
      </Box>
    </MotionBox>
  );
}

export default VerifyCode;
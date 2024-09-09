// src/pages/LandingPage.js
import React from 'react';
import { Box, Button, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionBox = motion(Box);

function LandingPage() {
  return (
    <MotionBox 
      className="landing-page" 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      //bg="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,184,233,1) 100%)"
      //bg="rgba(255, 255, 255, 0.5)"
      bgImage="url('https://images.rawpixel.com/image_600/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjg1Ni1rdWwtMDRhXzJfMS5qcGc.jpg')"
      //bgImage="url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0xODMtbnVubnktMzguanBn.jpg')"
      bgSize="cover" 
      bgPosition="center"
      backdropFilter="blur(10px)" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      p={5} 
    >
      <Box 
        bg="blur(70px)"
        border="2px solid rgba(255, 255, 255, 0.7)"
        backdropFilter="blur(10px)" 
        height="50%"
        width="50%"
        paddingTop="60px"
        borderRadius="lg" 
        alignItems="center" 
        justifyContent="center"
        textAlign="center"
      >
      <Heading mb={4}>Welcome to Our Service</Heading>
      <Text mb={6}>Your journey to excellence starts here.</Text> 
      <Button className="get-started-button" bg="pink.500" size="lg" as={Link} to="/signin">Get Started</Button>
      </Box> 
    </MotionBox>
  );
} 

export default LandingPage; 

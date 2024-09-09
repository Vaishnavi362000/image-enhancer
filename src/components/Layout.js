import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  return (
    <Box 
      alignItems="center" 
      justifyContent="center" 
      height="100vh"
      bgImage="url('https://images.pexels.com/photos/370799/pexels-photo-370799.jpeg?auto=compress&cs=tinysrgb&w=400')"
      bgSize="cover" 
      bgPosition="center"
    >
      
      <Flex>
        <Box
          width="250px"
          bg="rgba(236, 232, 234, 0.79)" 
          backdropFilter="blur(10px)"
          height="100vh"
        >
          <Sidebar />
        </Box>
        <Box
          flex="1"
          p={4}
          bg="rgba(236, 232, 234, 0.79)" 
          backdropFilter="blur(10px)"
        >
          <TopBar />
          {children}
        </Box>
      </Flex>
    </Box>
  ); 
};

export default Layout;
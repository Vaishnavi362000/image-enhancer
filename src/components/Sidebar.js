import { Box, VStack, Button, Text, Icon } from '@chakra-ui/react'; // Added Icon import
import { FaHome, FaUpload, FaEdit, FaHistory, FaSave, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Added icons
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="250px" bg="rgba(12, 11, 11, 0.79)" p={4} boxShadow="md" borderTopRightRadius="lg" borderBottomRightRadius="lg" style={{ boxShadow: '4px 0 10px rgba(0, 0, 0, 2)' }}>
      <VStack spacing={6} align="start" flex="1">
        <Text fontSize="xl" mt={4} color="white" fontWeight="bold">Menu</Text>
        <Link to="/dashboard">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaHome} boxSize={6} borderRadius="full" p={1} />}>Home</Button>
        </Link>
        <Link to="/upload">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaUpload} boxSize={6}borderRadius="full" p={1} />}>Image Upload</Button> 
        </Link>
        <Link to="/image-enhancer">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaEdit} boxSize={6} borderRadius="full" p={1} />}>Editor</Button> 
        </Link>
        <Link to="/enhancement-history">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaHistory} boxSize={6} borderRadius="full" p={1} />}>History</Button>
        </Link>
        <Link to="/saved-presets">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaSave} boxSize={6}  borderRadius="full" p={1} />}>Saved Templates</Button>
        </Link>
        <Link to="/account-settings">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaCog} boxSize={6} borderRadius="full" p={1} />}>Settings</Button>
        </Link>
      </VStack>
      <Button width="100%" colorScheme="pink" onClick={signOut} leftIcon={<Icon as={FaSignOutAlt} boxSize={6}  borderRadius="full" p={1} />}>Sign Out</Button>
    </Box>
  );
};

export default Sidebar;

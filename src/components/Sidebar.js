import React, { useState } from 'react';
import { Box, VStack, Button, Text, Icon, Tooltip } from '@chakra-ui/react';
import { FaHome, FaHistory, FaSave, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Sidebar = () => {
  const { signOut } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const SidebarButton = ({ icon, text, to }) => (
    <Tooltip label={text} placement="right" isDisabled={isExpanded}>
      <Link to={to}>
        <Button
          width="100%"
          variant="ghost"
          justifyContent="flex-start"
          px={2}
          py={6}
          _hover={{ bg: 'whiteAlpha.200' }}
        >
          <Icon as={icon} boxSize={6} />
          {isExpanded && <Text ml={4}>{text}</Text>}
        </Button>
      </Link>
    </Tooltip>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      width={isExpanded ? "250px" : "70px"}
      bg="rgba(12, 11, 11, 0.79)"
      p={4}
      boxShadow="md"
      borderTopRightRadius="lg"
      borderBottomRightRadius="lg"
      transition="width 0.3s"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <VStack spacing={6} align="start" flex="1">
        <SidebarButton icon={FaHome} text="Home" to="/dashboard" />
        <SidebarButton icon={FaHistory} text="History" to="/enhancement-history" />
        <SidebarButton icon={FaSave} text="Saved Templates" to="/saved-presets" />
        <SidebarButton icon={FaCog} text="Settings" to="/account-settings" />
      </VStack>
      <Tooltip label="Sign Out" placement="right" isDisabled={isExpanded}>
        <Button
          width="100%"
          colorScheme="pink"
          onClick={signOut}
          justifyContent="flex-start"
          px={2}
          py={6}
        >
          <Icon as={FaSignOutAlt} boxSize={6} />
          {isExpanded && <Text ml={4}>Sign Out</Text>}
        </Button>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;
{/*const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      height="100vh" 
      width="60px" // Initial width for icons only
      bg="rgba(12, 11, 11, 0.79)" 
      p={4} 
      boxShadow="md" 
      borderTopRightRadius="lg" 
      borderBottomRightRadius="lg" 
      transition="width 0.3s" // Smooth transition for width
      _hover={{ width: "250px" }} // Enlarge on hover
    >
      <VStack spacing={6} align="start" flex="1">
        <Link to="/dashboard">
          <Button width="100%" variant="ghost" leftIcon={<Icon as={FaHome} boxSize={8} borderRadius="full" p={1} />}>
            <Text display="none">Home</Text>
            </Button>
            </Link>
            <Link to="/upload">
              <Button width="100%" variant="ghost" leftIcon={<Icon as={FaUpload} boxSize={8} borderRadius="full" p={1} />}>
                <Text display="none">Image Upload</Text> 
              </Button>
            </Link>
            <Link to="/image-enhancer">
              <Button width="100%" variant="ghost" leftIcon={<Icon as={FaEdit} boxSize={8} borderRadius="full" p={1} />}>
                <Text display="none">Editor</Text> 
              </Button>
            </Link>
            <Link to="/enhancement-history">
              <Button width="100%" variant="ghost" leftIcon={<Icon as={FaHistory} boxSize={8} borderRadius="full" p={1} />}>
                <Text display="none">History</Text>
              </Button>
            </Link>
            <Link to="/saved-presets">
              <Button width="100%" variant="ghost" leftIcon={<Icon as={FaSave} boxSize={8} borderRadius="full" p={1} />}>
                <Text display="none">Saved Templates</Text> 
              </Button>
            </Link>
            <Link to="/account-settings">
              <Button width="100%" variant="ghost" leftIcon={<Icon as={FaCog} boxSize={8} borderRadius="full" p={1} />}>
                <Text display="none">Settings</Text>
              </Button>
            </Link>
          </VStack>
          <Button width="100%" colorScheme="pink" onClick={signOut} leftIcon={<Icon as={FaSignOutAlt} boxSize={8} borderRadius="full" p={1} />}>
            <Text display="none">Sign Out</Text>
          </Button>
        </Box>
      );
    };
  */}
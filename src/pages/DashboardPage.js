import React from 'react';
import { Box, Heading, Text, Button, Grid, Image, VStack } from '@chakra-ui/react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const { user } = useUser();
  const clerk = useClerk();
  const navigate = useNavigate();


  const recentActivity = [
    { id: 1, title: 'Image 1', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-01' },
    { id: 2, title: 'Image 2', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-02' },
    { id: 3, title: 'Image 3', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-03' },
  ];

  const statistics = {
    totalImages: 150,
    favoriteTools: ['Enhancer', 'Resizer', 'Filter'],
  };

  return (
    <Box p={8}>
    

      <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
        <Box>
          <Heading size="lg" mb={4}>Recent Activity</Heading>
          <VStack spacing={4} align="start">
            {recentActivity.map(activity => (
              <Box key={activity.id} backdropFilter="blur(10px)" borderRadius="md" p={4} boxShadow="md"  display="flex" alignItems="center">
                <Image src={activity.thumbnail} alt={activity.title} boxSize="100px" borderRadius="md" />
                <Box ml={4}>
                  <Text fontWeight="bold">{activity.title}</Text>
                  <Text color="gray.500">{activity.date}</Text>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>

        <Box>
          <Heading size="lg" mb={4}>Statistics</Heading>
          <Text>Total Images Processed: {statistics.totalImages}</Text>
          <Text>Favorite Tools: {statistics.favoriteTools.join(', ')}</Text>
        </Box>
      </Grid>

      <Box mt={8}>
        <Heading size="lg" mb={4}>Quick Access</Heading>
        <Button colorScheme="teal" mr={4}>Upload New Image</Button>
        <Button colorScheme="blue">Access Tools</Button>
      </Box>
    </Box>
  );
}

export default DashboardPage;

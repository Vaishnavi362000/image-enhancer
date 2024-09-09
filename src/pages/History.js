import React, { useState } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Image, SimpleGrid } from '@chakra-ui/react';

const mockHistoryData = [
  { id: 1, name: 'Image 1', date: '2023-10-01', thumbnail: 'image1-url.jpg' },
  { id: 2, name: 'Image 2', date: '2023-10-02', thumbnail: 'image2-url.jpg' },
  { id: 3, name: 'Image 3', date: '2023-10-03', thumbnail: 'image3-url.jpg' },
  // Add more mock data as needed
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyData, setHistoryData] = useState(mockHistoryData);

  const filteredHistory = historyData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.date.includes(searchTerm)
  );

  const handleDownload = (id) => {
    // Logic to download the image
    console.log(`Downloading image with id: ${id}`);
  };

  const handleReEdit = (id) => {
    // Logic to re-edit the image
    console.log(`Re-editing image with id: ${id}`);
  };

  return (
    <VStack spacing={4} p={5}>
      <HStack spacing={4} width="100%">
        <Input
          placeholder="Search by name or date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button colorScheme="teal">Search</Button>
      </HStack>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
        {filteredHistory.map(item => (
          <Box key={item.id} borderWidth={1} borderRadius="md" overflow="hidden" p={2}>
            <Image src={item.thumbnail} alt={item.name} boxSize="100%" objectFit="cover" />
            <Text fontWeight="bold">{item.name}</Text>
            <Text color="gray.500">{item.date}</Text>
            <HStack spacing={2} mt={2}>
              <Button colorScheme="blue" onClick={() => handleDownload(item.id)}>Download</Button>
              <Button colorScheme="yellow" onClick={() => handleReEdit(item.id)}>Re-edit</Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default History;
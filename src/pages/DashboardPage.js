import React, { useState } from 'react';
import { Box, Button, Input, Image, VStack, HStack, useToast, Icon, Text, Heading, Select, Flex, Textarea, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { FiUpload, FiDownload, FiEye, FiImage } from 'react-icons/fi';
import axios from 'axios';
import { useLoading } from '../context/LoadingContext';
import { BackgroundGradient } from '../components/BackgroundGradient';

const recentActivity = [
  { id: 1, title: 'Image 1', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-01' },
  { id: 2, title: 'Image 2', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-02' },
  { id: 3, title: 'Image 3', thumbnail: 'https://via.placeholder.com/100', date: '2023-10-03' },
];

const DashboardPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const {isLoading, setIsLoading} = useLoading();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [style, setStyle] = useState('');
  const [subject, setSubject] = useState('');
  const [mood, setMood] = useState('');
  const [lighting, setLighting] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [promptType, setPromptType] = useState('guided');
  const [uploadedImagePath, setUploadedImagePath] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setUploadedImagePath(response.data.imagePath);
        setSelectedFile(URL.createObjectURL(file));
        setGeneratedImage(URL.createObjectURL(file));
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: "Failed to upload image. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async (useCustomPrompt = false) => {
    setIsLoading(true);
    try {
      const promptData = useCustomPrompt
        ? { customPrompt, imagePath: uploadedImagePath }
        : { style, subject, mood, lighting, imagePath: uploadedImagePath };
      const response = await axios.post('http://localhost:5000/generate-image', promptData);
      
      const generatedImageUrl = response.data[0];
      setGeneratedImage(generatedImageUrl);

      toast({
        title: "Image Generated",
        description: "Your image has been successfully generated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex>
     
      <VStack spacing={6} align="center" p={5} flex={1}>
        <Box position="relative" width="100%" height="100%" maxWidth="1000px" maxHeight="400px" overflow="hidden">
          {generatedImage && (
            <>
              <Image src={generatedImage} alt="Generated Image" width="100%" borderRadius="md" onClick={onOpen} cursor="pointer" />
              <Button
                leftIcon={<Icon as={FiDownload} boxSize={6} borderRadius="full" p={1}color="white" />}
                variant="ghost"
                
                position="absolute"
                top="4"
                right="4"
                onClick={handleDownload}
                maxW="100%"
              >
              </Button>
              <Box
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0,0,0,0.7)"
                color="white"
                p={2}
                fontSize="sm"
              >
                
                {promptType === 'guided' ? (
                  <Text>{`${style} ${subject} with ${mood} mood and ${lighting} lighting`}</Text>
                ) : (
                  <Text>{customPrompt}</Text>
                )}
              </Box>
            </>
          )}
        </Box>
        
        <HStack spacing={4} width="100%" maxWidth="300px">
          
          <Button
            colorScheme={promptType === 'guided' ? 'blue' : 'gray'}
            color="black"
            onClick={() => setPromptType('guided')}
            flex={1}
            borderRadius="full"
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
        >
            <Icon as={FiImage} mr={2} /> 
            Guided
          </Button>
         
          <Button
              colorScheme={promptType === 'custom' ? 'blue' : 'gray'}
              color="black"
              onClick={() => setPromptType('custom')}
              flex={1}
              borderRadius="full"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
          >
              <Icon as={FiUpload} mr={2} />
              Custom
          </Button>
         
        </HStack>

        {promptType === 'guided' ? (
          <VStack spacing={4} width="100%" maxWidth="600px">
            <HStack width="100%">
              <Select placeholder="Style" bg="transparent" borderBottomColor="gray.500" color="black"  value={style} onChange={(e) => setStyle(e.target.value)}>
                <option value="realistic">Realistic</option>
                <option value="cartoon">Cartoon</option>
                <option value="abstract">Abstract</option>
              </Select>
              <Select placeholder="Mood" borderBottomColor="gray.500" color="black" value={mood} onChange={(e) => setMood(e.target.value)}>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="energetic">Energetic</option>
              </Select>
              <Select placeholder="Lighting" borderBottomColor="gray.500" color="black" value={lighting} onChange={(e) => setLighting(e.target.value)}>
                <option value="bright">Bright</option>
                <option value="dim">Dim</option>
                <option value="dramatic">Dramatic</option>
              </Select>
            </HStack>
            <Input placeholder="Enter subject" bg="white" color="black" boxShadow="md" value={subject} spellCheck="true" onChange={(e) => setSubject(e.target.value)} />
            <BackgroundGradient containerClassName="w-full">
            <Button 
            
              color="black"
              borderRadius="full"
              boxShadow="md"
              onClick={() => handleGenerate(false)} 
              isDisabled={!style || !subject || !mood || !lighting || isLoading}
              isLoading={isLoading}
              width="100%"
            >
              Generate
            </Button>
            </BackgroundGradient>
          </VStack>
        ) : (
          <VStack spacing={4} width="100%" maxWidth="600px">
            <Box position="relative" width="100%">
              <Textarea 
                placeholder="Enter your custom prompt here" 
                value={customPrompt} 
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={2}
                bg="white"
                color="black"
                boxShadow="md"
                pr="40px"
                spellCheck="true"
              />
              <Box as="label" htmlFor="file-upload" position="absolute" top="2" right="2" cursor="pointer">
                <Icon as={FiUpload} boxSize={6} color="gray.500" />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </Box>
            </Box>
            <Button 
              colorScheme="blue" 
              color="black"
              border
              boxShadow="md"
              onClick={() => handleGenerate(true)} 
              isDisabled={!customPrompt || isLoading}
              isLoading={isLoading}
              width="100%"
            >
              Generate
            </Button>
          </VStack>
        )}
       
      </VStack>

      <Box width="300px" p={5} borderLeft="1px" borderColor="gray.200">
        <Heading size="lg" mb={4}>Recent Activity</Heading>
        <VStack spacing={4}>
          {recentActivity.map(activity => (
            <Box key={activity.id} borderRadius="md" p={4} boxShadow="md" display="flex" alignItems="center" width="100%" bg="white">
              <Image src={activity.thumbnail} alt={activity.title} boxSize="50px" borderRadius="md" />
              <Box ml={4}>
                <Text fontWeight="bold">{activity.title}</Text>
                <Text color="gray.500" fontSize="sm">{activity.date}</Text>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
    <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
    <ModalContent
        bg="transparent"
        boxShadow="none"
    >
        <ModalCloseButton color="white" /> 
        <ModalBody display="flex" justifyContent="center" alignItems="center" p={0}>
            <Image 
                src={generatedImage} 
                alt="Full-size Generated Image" 
                maxW="90%" 
                maxH="90vh" // Adjust max height as needed
                objectFit="contain" 
            />
        </ModalBody>
    </ModalContent>
</Modal>
   
    </Flex>
  );
};

export default DashboardPage;
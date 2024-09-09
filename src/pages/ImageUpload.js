import React, { useState } from 'react';
import { Box, Button, Input, Image, VStack, HStack, useToast, Icon } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios'; // Make sure to install axios

const API_TOKEN = "r8_BF6tEUmjTcKTytPyCid3vmYUJL686o707hPzq";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.replicate.com/v1/predictions",
        {
          version: "7b3f4d0e6e9c3a5d8c2b1a0e9d8c7b6a",
          input: { prompt: prompt }
        },
        {
          headers: {
            Authorization: `Token ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const predictionId = response.data.id;
      let generatedImageUrl = null;

      while (!generatedImageUrl) {
        const predictionResponse = await axios.get(
          `https://api.replicate.com/v1/predictions/${predictionId}`,
          {
            headers: {
              Authorization: `Token ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (predictionResponse.data.status === "succeeded") {
          generatedImageUrl = predictionResponse.data.output[0];
          setGeneratedImage(generatedImageUrl);
          break;
        } else if (predictionResponse.data.status === "failed") {
          throw new Error("Image generation failed");
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
      }

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
    <VStack spacing={4} align="center" p={5}>
      <Box
        position="relative"
        width="100%"
        maxWidth="600px"
        bg={generatedImage ? `url(${generatedImage})` : selectedFile ? `url(${selectedFile})` : "gray.100"}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="md"
        minHeight="300px"
      >
        <HStack
          position="absolute"
          bottom={4}
          left={4}
          right={4}
          spacing={2}
          bg="white"
          p={2}
          borderRadius="md"
          boxShadow="md"
        >
          <Input
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            flex={1}
          />
          <Box as="label" htmlFor="file-upload" cursor="pointer">
            <Icon as={FiUpload} w={6} h={6} color="gray.500" />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Box>
        </HStack>
      </Box>
      <Button 
        colorScheme="purple" 
        onClick={handleGenerate} 
        isDisabled={!prompt || isLoading}
        isLoading={isLoading}
      >
        Generate
      </Button>
    </VStack>
  );
};

export default ImageUpload;
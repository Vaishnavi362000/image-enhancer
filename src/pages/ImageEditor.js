import React, { useState } from 'react';
import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Text, Image, HStack } from '@chakra-ui/react';

const ImageEditor = () => {
  const [image, setImage] = useState(null); // Placeholder for the uploaded image
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [filteredImage, setFilteredImage] = useState(null); // Placeholder for the enhanced image

  const handleApplyChanges = () => {
    // Logic to apply changes and save the image
    // This is where you would implement the image processing logic
    setFilteredImage(image); // For demonstration, just set the filtered image to the original
  };

  return (
    <HStack spacing={4} p={5}>
      <VStack spacing={4} align="start" width="300px">
        <Text fontSize="lg" fontWeight="bold">Tool Panel</Text>
        <Text>Brightness</Text>
        <Slider value={brightness} onChange={setBrightness} min={0} max={200}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text>Contrast</Text>
        <Slider value={contrast} onChange={setContrast} min={0} max={200}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        {/* Add more tools as needed */}
        <Button colorScheme="teal" onClick={handleApplyChanges}>
          Apply Changes
        </Button>
      </VStack>

      <Box flex="1" p={4} borderWidth={1} borderRadius="md" overflow="hidden">
        <Text fontSize="lg" fontWeight="bold">Image Preview</Text>
        {image && (
          <Image
            src={image}
            alt="Editing"
            boxSize="100%"
            objectFit="contain"
            filter={`brightness(${brightness}%) contrast(${contrast}%)`}
          />
        )}
        {filteredImage && (
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold">Before-After Comparison</Text>
            <Slider defaultValue={0} min={0} max={100} onChange={(value) => {
              const beforeAfter = (value / 100) * (filteredImage - image) + image;
              setFilteredImage(beforeAfter);
            }}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Image
              src={filteredImage}
              alt="Enhanced"
              boxSize="100%"
              objectFit="contain"
              style={{ position: 'absolute', top: 0, left: 0, opacity: 0.5 }}
            />
          </Box>
        )}
      </Box>
    </HStack>
  );
};

export default ImageEditor;
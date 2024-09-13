const express = require('express');
const Replicate = require('replicate');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generatePrompt = (style, subject, mood, lighting, customPrompt) => {
  if (customPrompt) {
    return customPrompt;
  }
  return `Create a ${style} image of ${subject} with a ${mood} mood and ${lighting} lighting.`;
};

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imagePath: req.file.path });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

app.post('/generate-image', async (req, res) => {
  try {
    const { style, subject, mood, lighting, customPrompt, imagePath } = req.body;
    const prompt = generatePrompt(style, subject, mood, lighting, customPrompt);

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          image: imagePath ? `${process.env.SERVER_URL}/${imagePath}` : null,
          prompt: prompt,
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          scheduler: "K_EULER_ANCESTRAL",
        }
      }
    );

    res.json(output);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating the image' });
  }
});

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
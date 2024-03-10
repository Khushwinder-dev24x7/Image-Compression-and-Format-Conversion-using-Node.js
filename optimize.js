// npm install sharp    => run this command first
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Input and output directories
const inputDir = 'input_images'; // Replace 'input_images' with your input directory
const outputDir = 'output_images'; // Replace 'output_images' with your output directory

// Function to optimize images, compress, and convert to WebP format
async function optimizeImages() {
  try {
    // Check if the output directory exists, create it if not
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Get a list of files in the input directory
    const files = fs.readdirSync(inputDir);

    // Process each image file
    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

      // Read input image
      const inputImage = sharp(inputPath);

      // Resize, compress, and convert to WebP format
      await inputImage
        // .resize({ width: 800 }) // Resize if needed
        .webp({ quality: 50 }) // Set quality (0-100)
        .toFile(outputPath); // Save output image

      console.log(`Image optimized and converted to WebP: ${outputPath}`);
    }

    console.log('Image optimization complete.');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Call the function
optimizeImages();

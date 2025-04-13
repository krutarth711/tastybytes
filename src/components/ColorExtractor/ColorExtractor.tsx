import React, { useEffect } from 'react';
import ColorThief from 'colorthief';

interface ColorExtractorProps {
  imageUrl: string;
  onColorExtracted?: (color: string) => void;
}

const ColorExtractor: React.FC<ColorExtractorProps> = ({ imageUrl, onColorExtracted }) => {
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      const colorThief = new ColorThief();
      try {
        const color = colorThief.getColor(img);
        const colorHex = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        if (onColorExtracted) {
          onColorExtracted(colorHex);
        }
      } catch (error) {
        console.error('Error extracting color:', error);
      }
    };

    img.src = imageUrl;
  }, [imageUrl, onColorExtracted]);

  return null;
};

export default ColorExtractor; 
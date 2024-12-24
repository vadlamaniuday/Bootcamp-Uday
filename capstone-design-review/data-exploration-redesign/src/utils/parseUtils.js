// Utility functions for parsing data

export const parseAuthors = (authorsData) => {
  try {
    // If authors is already an array, return it
    if (Array.isArray(authorsData)) {
      return authorsData;
    }

    // If it's a string, try to parse it
    if (typeof authorsData === 'string') {
      // First replace single quotes with double quotes
      const jsonString = authorsData.replace(/'/g, '"');
      
      // Parse the JSON string into an array
      const parsedArray = JSON.parse(jsonString);
      
      // Ensure the result is an array
      if (!Array.isArray(parsedArray)) {
        throw new Error('Parsed result is not an array');
      }
      
      // Decode Unicode escape sequences
      return parsedArray.map(author => 
        author.replace(/\\u([a-fA-F0-9]{4})/g, (match, code) => 
          String.fromCharCode(parseInt(code, 16))
        )
      );
    }

    // If we can't handle the format, return empty array
    throw new Error(`Unsupported authors format: ${typeof authorsData}`);
  } catch (error) {
    console.error('Error parsing authors:', error);
    // Return empty array as fallback
    return [];
  }
};
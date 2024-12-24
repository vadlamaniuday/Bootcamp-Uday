

export const parseAuthors = (authorsData) => {
  try {
    
    if (Array.isArray(authorsData)) {
      return authorsData;
    }

    
    if (typeof authorsData === 'string') {
      
      const jsonString = authorsData.replace(/'/g, '"');
      
      
      const parsedArray = JSON.parse(jsonString);
      
      
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

    
    throw new Error(`Unsupported authors format: ${typeof authorsData}`);
  } catch (error) {
    console.error('Error parsing authors:', error);
    
    return [];
  }
};

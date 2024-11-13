// Normalize text for comparison by removing special characters and converting to lowercase
export const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  };
  
  // Calculate similarity between two strings (0-1)
  export const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = normalizeText(str1);
    const s2 = normalizeText(str2);
    
    if (s1 === s2) return 1;
    if (s1.includes(s2) || s2.includes(s1)) return 0.9;
    
    const pairs1 = getPairs(s1);
    const pairs2 = getPairs(s2);
    
    const union = new Set([...pairs1, ...pairs2]);
    const intersection = new Set([...pairs1].filter(x => pairs2.has(x)));
    
    return intersection.size * 2 / (pairs1.size + pairs2.size);
  };
  
  // Get character pairs from a string
  const getPairs = (str: string): Set<string> => {
    const pairs = new Set<string>();
    for (let i = 0; i < str.length - 1; i++) {
      pairs.add(str.slice(i, i + 2));
    }
    return pairs;
  };
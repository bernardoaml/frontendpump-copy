export const fetchTokens = async (page: number, filters?: { telegram?: boolean; website?: boolean; twitter?: boolean }, query?: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    let url = `${baseUrl}/api/tokens?page=${page}`;
  
    if (filters) {
        if (filters.telegram) url += `&telegram=true`;
        if (filters.website) url += `&website=true`;
        if (filters.twitter) url += `&twitter=true`;
      }

      if (query) {
        url += `&query=${query}`;
      }
    
      try {
        console.log(`Fetching tokens from: ${url}`);
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`Error fetching tokens: ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log('Tokens fetched:', data);
        return {
          data: data.tokens,
          totalPages: data.totalPages,
        };
      } catch (error) {
        console.error(error);
        return { data: [], totalPages: 0 };
      }
    };
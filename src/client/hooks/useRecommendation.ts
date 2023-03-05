import useSWR from 'swr'

export const useRecommendation = () => {
  async function fetcher(url: string): Promise<any | null> {
    const response = await fetch(url);
    return response.json();
  }
  
  const { data: recommendations } = useSWR('/recommendations.json', fetcher);

  if (recommendations == null) {
    return { recommendation: undefined };
  }
  
  const hour = new Date().getHours();

  const recommendation = recommendations[hour % recommendations.length];
  return { recommendation };
};

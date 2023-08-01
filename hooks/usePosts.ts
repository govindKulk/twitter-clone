import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = ( currentPage?: number, perPage?: number, userId?: string,) => {
  
  const queryParams = new URLSearchParams();

  // Conditionally add the userId to the query parameters


  if (userId && userId.trim() !== "") {
    queryParams.append("userId", userId.trim());
  }

  
  if(!currentPage || !perPage){
    
  }else{
    // Add other query parameters (page and perPage)
  queryParams.append("page", String(currentPage || 1));
  queryParams.append("perPage", String(perPage || 10));
  }
 
  

  const apiUrl = `/api/posts?${queryParams.toString()}`;
  const { data,error, isLoading, mutate } = useSWR(apiUrl, fetcher);
  return {
    data: data?.posts  || [],
    error,
    totalPosts: data?.totalPosts || 0,
    isLoading,
    mutate
  }
};

export default usePosts;
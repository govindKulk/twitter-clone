// src/contexts/PostsContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';


interface PostContextProps {
  children: ReactNode;

}

interface PostsContextType {
  allPosts: Record<string,any>[];
  setAllPosts: React.Dispatch<React.SetStateAction<Record<string,any>[]>>;
}

const PostsContext = createContext<PostsContextType>({
  allPosts: [],
  setAllPosts: () => {},
});

export const usePostsContext = () => useContext(PostsContext);

export const PostsProvider: React.FC<PostContextProps> = ({ children }) => {
  const [allPosts, setAllPosts] = useState<Record<string,any>[]>([]);

  return (
    <PostsContext.Provider value={{ allPosts, setAllPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

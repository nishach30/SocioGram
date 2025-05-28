//for infinite scrolling, caching, paging etc
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createUserAccount, signInAccount, signOutAccount, createPost, getRecentPosts, LikePost, SavePost, DeleteSavedPost, getCurrentUser, getPostByID, updatePost, deletePost, getInfinitePosts, searchPosts, getSavedPost, getAllUsers } from '../appwrite/api'
import type { INewPost, INewUser, IUpdatePost } from '../../types'
import { QUERY_KEYS } from './queryKeys'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user),
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
        email: string;
        password: string;
    }) => signInAccount(user),
    });
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn: signOutAccount
    });
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

export const useGetRecentPosts = ()=>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  })
}

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({postId, likesArray}: { postId: string; likesArray: string[]}) => LikePost(postId, likesArray),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export const useSavePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({postId, userId}: { postId: string; userId: string}) => SavePost(postId, userId),
    onSuccess: () => {
       queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (savedRecordId: string) => DeleteSavedPost(savedRecordId),
    onSuccess: () => {
       queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS]
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      })
    }
  })
}

// Query to get all user details like the post user has liked and all.
export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser
  })
}

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostByID(postId),
    enabled: !!postId
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data)=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id]
      })
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({postId, imageId}: {postId: string, imageId: string}) => deletePost(postId, imageId),
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      })
    }
  })
}

export const useGetPosts = () =>{
  return useInfiniteQuery({
    queryKey:[QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage:any)=>{
      if(lastPage && lastPage.documents.length ===0) return null;
      const lastId= lastPage.documents[lastPage?.documents.length-1].$id;
      return lastId
    }
  })
}

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled:!!searchTerm
  })
}

export const useGetSavedPosts = () =>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
    queryFn: ()=> getSavedPost()
  })
}

export const useGetAllUsers = () =>{
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ALL_USERS],
    queryFn: ()=> getAllUsers()
  })
}
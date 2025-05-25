import React, { useState } from 'react'
import { Input } from '../../components/ui/input'
import Searchresults from '../../components/shared/Searchresults';
import GridPostList from '../../components/shared/GridPostList';
import { useGetPosts, userSearchPosts } from '../../lib/react-query/queriesAndMutation';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../../components/shared/Loader';

const Explore = () => {
  const {data:posts , fetchNextPage, hasNextPage}= useGetPosts();
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500);
  const {data:searchedPosts, isFetching:isSearchFetching} = userSearchPosts(debouncedValue)

  if(!posts){
    return(
      <div className='flex-center w-full h-full'>
        <Loader/>
      </div>
    )
  }
  console.log("[] post", posts)
  const shouldShowSearchResults = searchValue !=='';
  console.log("[] shouldShowSearchResults",typeof searchValue, shouldShowSearchResults)
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item)=>{
    console.log("[] items", item?.documents)
    return item?.documents?.length 
  })
  
  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>
          Search posts
        </h2>
        <div className='Flex gap-1 px-4 w-full rounded-lg border-s-gray-900'>
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
          type="text"
          placeholder='search'
          className='explore-search'
          value={searchValue}
          onChange={(e)=> setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
        <div className='flex-center gap-3 bg-gray-900 rounded-xl px-4 py-2 cursor-pointer'>
          <p className='small-medium md:base-medium text-gray-50'>All</p>
          <img
            src="assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"/>
        </div>
      </div>
      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <Searchresults/>
        ):
          shouldShowPosts?posts.pages.map((item, index)=>(
            <GridPostList key={`page-${index}`} posts={item?.documents}/>
          )):
          (<p className='text-gray-100 mt-0 text-center w-full'>End of posts</p>)
        }
      </div>
    </div>
  )
}

export default Explore
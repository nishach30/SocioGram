import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import GridPostList from '@/components/shared/GridPostList';
import {
  useGetPosts,
  useSearchPosts,
} from '@/lib/react-query/queriesAndMutation';
import useDebounce from '@/hooks/useDebounce';
import Loader from '@/components/shared/Loader';
import SearchResults from '@/components/shared/SearchResults';
import { useInView } from 'react-intersection-observer';

const Explore = () => {
  const { ref: ref, inView: inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage();
  }, [inView, searchValue]);
  
  const shouldShowSearchResults = searchValue !== '';

  if (!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-gray-900">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-gray-900 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-gray-50">All</p>
          <img
            src="assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults
          ? (
              searchedPosts && <SearchResults
                isSearchFetching={isSearchFetching}
                searchedPosts={searchedPosts}
              />
            )
          : posts.pages.map((item, index) => (
              <GridPostList
                key={`page-${index}`}
                posts={item?.documents || []}
              />
            ))}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
      {!hasNextPage && !shouldShowSearchResults && (
        <p className="text-gray-100 mt-0 text-center w-full">
          You are all caught up!!
        </p>
      )}
    </div>
  );
};

export default Explore;

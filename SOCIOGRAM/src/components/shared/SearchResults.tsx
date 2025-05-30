import Loader from "./Loader";
import GridPostList from "./GridPostList";
import type { Models } from "appwrite";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document;

};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return (
    <p className="text-gray-100 mt-10 text-center w-full">No results found</p>
  );
};

export default SearchResults;

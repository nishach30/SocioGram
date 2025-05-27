import type { Models } from "appwrite";
import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useGetSavedPosts } from "../../lib/react-query/queriesAndMutation"

const Saved = () => {
  const {data:savedPosts, isFetching: isPostsLoading} = useGetSavedPosts();
  let posts: Models.Document[] = [];
  if(isPostsLoading) return <Loader/>

  return (
    <div className="flex flex-1">
      <div className='home-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>
            Saved Posts
        </h2>
        {savedPosts?.documents.map((post: Models.Document)=> {posts.push(post.post); return null})}
        {posts.length > 0 && <GridPostList posts={posts} showUser={true} showStats={true}/>}
        {posts.length === 0 && <p className='text-gray-100 mt-0 text-center w-full'>No Saved Post Found</p>}
      </div>
    </div>
  )
}

export default Saved

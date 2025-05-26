import GridPostList from "../../components/shared/GridPostList";
import Loader from "../../components/shared/Loader";
import { useGetSavedPosts } from "../../lib/react-query/queriesAndMutation"

const Saved = () => {
  const {data:savedPosts, isFetching:isPostsLoading} = useGetSavedPosts();
  console.log("[] save Posts", savedPosts)
  if(!savedPosts) return <Loader/>
  return (
    <div>
      {savedPosts.map((post: any, index: number)=>(
        //  <GridPostList key={`page-${index}`} posts={post.post}/>
       <p key={index}>{post.post.caption}</p> 
      )  
      )}
    </div>
  )
}

export default Saved

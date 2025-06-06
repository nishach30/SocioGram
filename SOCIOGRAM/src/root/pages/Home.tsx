import Loader from '../../components/shared/Loader';
import { useGetRecentPosts } from '../../lib/react-query/queriesAndMutation';
import type { Models } from 'appwrite';
import PostCard from '../../components/shared/PostCard';

const Home = () => {
  const { data: posts, isPending: isPostLoading } = useGetRecentPosts();
  if (isPostLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

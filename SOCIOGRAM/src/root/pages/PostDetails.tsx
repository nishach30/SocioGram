import { Link, useParams } from 'react-router-dom';
import {
  useDeletePost,
  useGetPostById,
} from '../../lib/react-query/queriesAndMutation';
import Loader from '../../components/shared/Loader';
import { formatDateString } from '../../lib/utils';
import { useUserContext } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import PostStats from '../../components/shared/PostStats';
import { useNavigate } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const navigate = useNavigate();

  if (!post?.$id) {
    return <Loader />;
  }

  const handleDeletePost = async () => {
    deletePost({ postId: post?.$id, imageId: post?.imageId });

    if (!isDeleting) {
      navigate('/');
    }
  };

  return (
    id && (
      <div className="post_details-container">
        {isPending ? (
          <Loader />
        ) : (
          <div className="post_details-card">
            <img src={post?.imageUrl} alt="post" className="post_details-img" />
            <div className="post_details-info">
              <div className="flex-between w-full">
                <Link
                  to={`/profile/${post?.creator.$id}`}
                  className="flex items-center gap-3"
                >
                  <img
                    src={
                      post?.creator?.imageUrl ||
                      '/assets/icons/profile-placeholder.svg'
                    }
                    alt="creator"
                    className="rounded-full w-8 h-8 lf:w-12 lg:h-12"
                  />
                  <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-white">
                      {post?.creator.name}
                    </p>
                    <div className="flex-center gap-2 text-gray-50">
                      <p className="subtle-semibold lg:small-regular">
                        {formatDateString(post?.$createdAt)}
                      </p>
                      -
                      <p className="subtle-semibold lg:small-regular">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="flex-center">
                  <Link
                    to={`/update-post/${post?.$id}`}
                    className={`${user.id !== post?.creator.$id && 'hidden'}`}
                  >
                    <img
                      src="/assets/icons/edit.svg"
                      height={24}
                      width={24}
                      alt="edit"
                    />
                  </Link>
                  <Button
                    onClick={handleDeletePost}
                    variant="ghost"
                    className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}
                  >
                    <img
                      src="/assets/icons/delete.svg"
                      alt="delete"
                      height={24}
                      width={24}
                    />
                  </Button>
                </div>
              </div>

              <hr className="border w-full border-black/80" />
              <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                <p>{post?.caption}</p>
                <ul className="flex gap-1 mt-2">
                  {post?.tags.map((tag: string) => (
                    <li key={tag} className="text-gray-700">
                      #{tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full">
                <PostStats post={post} userId={user.id} />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default PostDetails;

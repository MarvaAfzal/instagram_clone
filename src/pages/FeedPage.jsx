import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Feed from "../components/Feed/Feed.jsx";
import {
  getAllPosts,
  likePost,
  unlikePost,
  addComment,
  toggleLikeLocal,
  updatePost,
} from "../redux/postSlice";

const FeedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts, stories, loading, error } = useSelector((state) => state.posts);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Like/unlike handler
  const handleLike = async (postId, newLiked) => {
    if (!userId) return;

    // Optimistic UI
    dispatch(toggleLikeLocal({ postId, userId }));

    try {
      if (newLiked) {
        await dispatch(likePost(postId)).unwrap();
      } else {
        await dispatch(unlikePost(postId)).unwrap();
      }
    } catch (err) {
      dispatch(toggleLikeLocal({ postId, userId })); // revert if failed
      console.error(err);
    }
  };

  const handleAddComment = async (postId, text) => {
    if (!text?.trim()) return;
    try {
      await dispatch(addComment({ postId, comment: text })).unwrap();
      toast.success("Comment added!");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  const handleAddPost = () => navigate("/createpost");

  const handleUpdatePost = async (postId, formData) => {
    try {
      await dispatch(updatePost({ postId, formData })).unwrap();
      toast.success("Post updated successfully!");
    } catch (err) {
      toast.error("Failed to update post");
    }
  };

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Feed
      stories={stories}
      posts={sortedPosts}
      loading={loading}
      error={error}
      onLike={handleLike}
      onAddComment={handleAddComment}
      onAddPost={handleAddPost}
      onUpdatePost={handleUpdatePost}
    />
  );
};

export default FeedPage;

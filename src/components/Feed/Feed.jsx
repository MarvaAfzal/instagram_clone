import Stories from "./Stories";
import Post from "./Post";
import "./Feed.css";

const Feed = ({ stories, posts, onLike, onAddComment, onAddPost, onUpdatePost }) => {
  return (
    <div className="feed-page">

      {/* ----- STORIES ----- */}
      <Stories stories={stories} onAddPost={onAddPost} />

      {/* ----- ALL POSTS ----- */}
      <div className="posts-wrapper">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              onLike={onLike}
              onAddComment={onAddComment}
              onUpdatePost={onUpdatePost} // ← make sure parent passes this
            />
          ))
        ) : (
          <p className="no-posts">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Feed;

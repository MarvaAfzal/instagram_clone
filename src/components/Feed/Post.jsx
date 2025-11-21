import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faPen } from "@fortawesome/free-solid-svg-icons";

const Post = ({ post, onLike, onAddComment, onUpdatePost }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title || "");
  const [description, setDescription] = useState(post.description || "");
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState("");

  //  Like states
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  // Sync UI with updated post.likes
  useEffect(() => {
    setLiked(post.likes?.includes(userId));
    setLikesCount(post.likes?.length || 0);
  }, [post.likes, userId]);

  // Like / Unlike toggle
  const handleLikeToggle = () => {
    const newLiked = !liked;

    // Update UI immediately
    setLiked(newLiked);

    // Correct like count
    setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));

    // Notify parent to update backend / Redux
    onLike(post._id, newLiked); // <-- pass newLiked
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onAddComment(post._id, comment);
      setComment("");
    }
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    onUpdatePost(post._id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(post.title);
    setDescription(post.description);
    setImage(null);
    setIsEditing(false);
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <span>{post.user?.username || post.user?.fullname || "User"}</span>
        {post.user?._id === userId && !isEditing && (
          <FontAwesomeIcon
            icon={faPen}
            className="edit-icon"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>

      {/* Edit Mode */}
      {isEditing ? (
        <div className="edit-post">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <div className="edit-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {/* Image */}
          {post.image && <img src={`http://localhost:5000/${post.image}`} alt="Post" className="post-img" />}

          {/* Like Button */}
          <div className="post-actions">
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeart}
              onClick={handleLikeToggle}
              style={{
                color: liked ? "red" : "gray",
                cursor: "pointer",
                fontSize: "24px",
                transition: "0.2s",
              }}
            />
          </div>

          {/* Like Count */}
          <p className="likes">{likesCount} {likesCount === 1 ? "Like" : "Likes"}</p>

          {/* Caption */}
          <p className="caption">
            <strong>{post.user?.username || "User"}: </strong>
            {post.description}
          </p>

          {/* Add Comment */}
          <div className="add-comment">
            <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type="button" onClick={handleCommentSubmit}>Post</button>
          </div>

          {/* Comment Count */}
          <p className="comments-count">
            {post.comments?.length || 0} {post.comments?.length === 1 ? "Comment" : "Comments"}
          </p>

          {/* Comment List */}
          <div className="comments-list">
            {post.comments?.map((c, idx) => (
              <div key={idx} className="comment-item">
                <p>
                  <strong>{c.user?.username || "User"}: </strong> {c.text}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;

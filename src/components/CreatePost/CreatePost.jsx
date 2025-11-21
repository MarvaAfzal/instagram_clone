import React from "react";
import "./CreatePost.css";

const CreatePost = ({ formData, setFormData, handleSubmit }) => {
  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      // Safely set file
      setFormData({ ...formData, image: files && files[0] ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Write a caption..."
            value={formData.description || ""}
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

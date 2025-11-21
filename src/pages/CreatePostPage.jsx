import React, { useState } from "react";
import CreatePost from "../components/createpost/CreatePost";
import { createPostService } from "../services/posts/post.services";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      if (formData.image) data.append("image", formData.image);

      await createPostService(data);
      navigate("/feed");
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
    }
  };

  return (
    <CreatePost
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePostPage;

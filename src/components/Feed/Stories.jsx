// src/components/Feed/Stories.jsx
import React from "react";
import LogoutButton from "./LogoutButton";

const Stories = ({ stories, onAddPost }) => {
  if (!stories) return null;

  const addPostStory = stories.find((s) => s.isAddButton);
  const normalStories = stories.filter((s) => !s.isAddButton);

  return (
    <div className="stories-section">
      {addPostStory && (
        <div
          className="story add-post-button"
          onClick={onAddPost} // MUST BE HERE
          style={{ cursor: "pointer" }}
        >
          <span>+</span>
          <p>{addPostStory.username}</p>
        </div>
      )}

      {normalStories.map((story) => (
        <div key={story.id} className="story">
          <img src={story.img} alt={story.username} />
          <p>{story.username}</p>
        </div>
      ))}

      <LogoutButton />
    </div>
  );
};

export default Stories;

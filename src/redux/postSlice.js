// src/redux/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPostService,
  getAllPostsService,
  updatePostService,
  likePostService,
  unlikePostService,
  addCommentService,
} from "../services/posts/post.services.js";

import storyimage1 from "../assets/instagram_story_1.jpg";
import storyimage2 from "../assets/instagram_story_2.jpg";
import storyimage3 from "../assets/instagram_story_3.jpg";
import storyimage4 from "../assets/instagram_story_4.jpg";
import storyimage5 from "../assets/instagram_story_5.jpg";
import storyimage6 from "../assets/instagram_story_6.jpg";

// ===================== ASYNC THUNKS ===================== //

// GET ALL POSTS
export const getAllPosts = createAsyncThunk(
  "posts/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllPostsService();
      const posts = res.posts || [];
      // Newest first
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return posts;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);

// CREATE POST
export const createPost = createAsyncThunk(
  "posts/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await createPostService(formData);
      return res.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post"
      );
    }
  }
);

// UPDATE POST
export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ postId, formData }, { rejectWithValue }) => {
    try {
      const res = await updatePostService(postId, formData);
      return res.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update post"
      );
    }
  }
);

// LIKE POST
export const likePost = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await likePostService(postId);
      return res.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to like post"
      );
    }
  }
);

// UNLIKE POST
export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await unlikePostService(postId);
      return res.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unlike post"
      );
    }
  }
);

// ADD COMMENT
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const res = await addCommentService(postId, comment);
      return res.post;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to add comment"
      );
    }
  }
);

// ===================== INITIAL STATE ===================== //
const initialStories = [
  { id: 0, username: "Add Post", isAddButton: true },
  { id: 1, username: "Sara", img: storyimage1 },
  { id: 2, username: "Fatima", img: storyimage2 },
  { id: 3, username: "Zara", img: storyimage3 },
  { id: 4, username: "Laiba", img: storyimage4 },
  { id: 5, username: "Madiha", img: storyimage5 },
  { id: 6, username: "Ayesha", img: storyimage6 },
];

const initialState = {
  posts: [],
  stories: initialStories,
  loading: false,
  error: null,
};

// ===================== SLICE ===================== //
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Local like/unlike for instant UI feedback
    toggleLikeLocal: (state, action) => {
      const { postId, userId } = action.payload;
      state.posts = state.posts.map((post) => {
        if (post._id !== postId) return post;
        const hasLiked = post.likes?.includes(userId);
        return {
          ...post,
          likes: hasLiked
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId],
        };
      });
    },
  },
  extraReducers: (builder) => {
    // GET ALL POSTS
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE POST
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // UPDATE POST
    builder
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.error = action.payload;
      });

    // LIKE POST
    builder.addCase(likePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });

    // UNLIKE POST
    builder.addCase(unlikePost.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });

    // ADD COMMENT
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    });
  },
});

export const { toggleLikeLocal } = postSlice.actions;
export default postSlice.reducer;

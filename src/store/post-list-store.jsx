import { createContext, useReducer } from "react";
import { useState, useEffect } from "react";
// const DEFAULT_POST_LIST = [{
//     id: '1',
//     title: 'Go To Goa',
//     body: 'Hi, Friends I am going to Goa for vacations',
//     reactions: 0,
//     userId: 'user-1',
//     tags: ['vacation', 'Goa', 'Enjoying']
// },
// {
//     id: '2',
//     title: 'Pass Ho Gaye',
//     body: 'Hi, Chaar saal ki masti ke baad bhi paas go gaye.',
//     reactions: 2,
//     userId: 'user-2',
//     tags: ['pass', 'graduation', 'btech']
// }];

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {}
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type == "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type == "ADD_POST") {
    newPostList = [action.payload.post, ...currPostList];
  } else if (action.type == "ADD_INITIAL_POSTS") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: { postId },
    });
  };

  const addPost = (post) => {
    // if (
    //   userIdVal === "" ||
    //   titleVal === "" ||
    //   bodyVal === "" ||
    //   reactionsVal === "" ||
    //   tagsVal === ""
    // ) {
    //   console.log("some val are null");
    //   return;
    // }
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        post
      },
    });
  };

  const addInitialPost = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts,
      },
    });
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;

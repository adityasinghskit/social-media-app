import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../assets/store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPost } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (postList.length === 0) {
      setFetching(true);
      fetch("https://dummyjson.com/posts", { signal })
        .then((res) => res.json())
        .then((data) => {
          addInitialPost(data.posts);
          setFetching(false);
        });
    }
    return () => {
      console.log("cleaning up useEffect...");
      controller.abort();
    };
  }, []);

  const handleGetPostsClick = () => {};
  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && (
        <WelcomeMessage onGetPostsClick={handleGetPostsClick} />
      )}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};
export default PostList;

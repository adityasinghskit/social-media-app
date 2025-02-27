import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const navigate = useNavigate();
  const userId = useRef();
  const title = useRef();
  const body = useRef();
  const reactions = useRef();
  const tags = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userIdVal = userId.current.value;
    const titleVal = title.current.value;
    const bodyVal = body.current.value;
    const reactionsVal = reactions.current.value;
    const tagsVal = tags.current.value.split(/\s+/);

    userId.current.value = "";
    title.current.value = "";
    body.current.value = "";
    reactions.current.value = "";
    tags.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleVal,
        body: bodyVal,
        reactions: reactionsVal,
        userId: userIdVal,
        tags: tagsVal,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        addPost(res);
      });
      navigate("/");
  };

  return (
    <>
      <form className="createPost" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            userId
          </label>
          <input
            type="text"
            ref={userId}
            className="form-control"
            id="userId"
            placeholder="Enter your user id here"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            ref={title}
            className="form-control"
            id="title"
            placeholder="Enter title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            content
          </label>
          <textarea
            type="text"
            ref={body}
            className="form-control"
            id="body"
            placeholder="How are you feeing..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reactions" className="form-label">
            No of reactions
          </label>
          <input
            type="text"
            ref={reactions}
            className="form-control"
            id="reactions"
            placeholder="99"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            tags
          </label>
          <input
            type="text"
            ref={tags}
            className="form-control"
            id="tags"
            placeholder="Please enter tags using space."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </>
  );
};
export default CreatePost;

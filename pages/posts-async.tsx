import { useEffect } from "react";
import { useStore } from "../store";

export default function PostAsync() {
  const [posts, fetchPosts, loading] = useStore((state) => [
    state.posts,
    state.fetchPosts,
    state.loading,
  ]);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      <div>
        <h1>Posts</h1>
        {loading && <h2>Loading...</h2>}
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

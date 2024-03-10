import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/services";
import { Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
  }, []);
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts && posts.length ? posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
            <PostCard post={post} />
            </div>
          )) : <div className="text-xl flex gap-2">
            <p>you haven't create any post yet for creating the post go to </p>
            <Link to={'/add-post'} className="text-blue-600 font-semibold">Add post</Link>

          </div>}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;

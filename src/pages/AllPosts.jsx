import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function AllPosts() {
  const { handleGetAllPosts } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await handleGetAllPosts();
        setPosts(response?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [handleGetAllPosts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">All Posts</h1>
            <p className="mt-1 text-sm text-emerald-800">See what your network is sharing.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/create-post"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Create Post
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Login
            </Link>
          </div>
        </div>

        {loading && (
          <div className="rounded-xl border border-emerald-100 bg-white p-5 text-sm text-emerald-800 shadow-sm">
            Loading posts...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="rounded-xl border border-emerald-100 bg-white p-6 text-sm text-emerald-800 shadow-sm">
            No posts yet. Be the first to create one.
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post) => {
              const media = Array.isArray(post.media) ? post.media : [];
              return (
                <article
                  key={post._id}
                  className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
                >
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-sm font-bold text-emerald-950">
                        {post?.userId?.name || 'Unknown user'}
                      </h2>
                      <span className="text-xs text-emerald-700/80">
                        {post?.location || 'Unknown location'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-800">{post.caption}</p>
                  </div>

                  {media.length > 0 && (
                    <div className="grid grid-cols-2 gap-1 bg-emerald-50 p-1">
                      {media.map((item, index) => {
                        const isVideo = item?.mediaType === 'video';
                        return isVideo ? (
                          <video
                            key={`${post._id}-media-${index}`}
                            src={item.mediaUrl}
                            controls
                            className="h-48 w-full rounded-md object-cover"
                          />
                        ) : (
                          <img
                            key={`${post._id}-media-${index}`}
                            src={item.mediaUrl}
                            alt={`post-media-${index}`}
                            className="h-48 w-full rounded-md object-cover"
                          />
                        );
                      })}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

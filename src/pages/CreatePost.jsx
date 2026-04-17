import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function CreatePost() {
  const { handleCreatePost } = useContext(UserContext);

  const [formData, setFormData] = useState({
    caption: '',
    location: '',
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const previews = useMemo(
    () => mediaFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [mediaFiles]
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!formData.caption.trim()) {
      setIsError(true);
      setMessage('Caption is required.');
      return;
    }

    if (mediaFiles.length === 0) {
      setIsError(true);
      setMessage('Please upload at least one image or video.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append('caption', formData.caption);
      payload.append('location', formData.location);
      mediaFiles.forEach((file) => payload.append('media', file));

      await handleCreatePost(payload);
      setMessage('Post created successfully.');
      setFormData({ caption: '', location: '' });
      setMediaFiles([]);
    } catch (error) {
      setIsError(true);
      setMessage(error?.response?.data?.message || 'Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-lime-50 to-emerald-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-emerald-950 md:text-3xl">Create Post</h1>
            <p className="mt-1 text-sm text-emerald-800">Share an update with your network.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/all-posts"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              View Posts
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Back
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-900">Caption</label>
            <textarea
              name="caption"
              value={formData.caption}
              onChange={handleChange}
              placeholder="What do you want to share?"
              className="h-28 w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-emerald-500/60 focus:border-emerald-400"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-900">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-emerald-500/60 focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-emerald-900">Upload Media</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaChange}
              className="block w-full rounded-xl border border-emerald-200 bg-white file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-emerald-700"
            />
            <p className="mt-2 text-xs text-emerald-700">You can upload one or more images/videos.</p>
          </div>

          {previews.length > 0 && (
            <div>
              <p className="mb-3 text-sm font-semibold text-emerald-900">Preview</p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {previews.map(({ file, url }) => {
                  const isVideo = file.type.startsWith('video/');
                  return (
                    <div key={`${file.name}-${file.size}`} className="overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50">
                      {isVideo ? (
                        <video src={url} controls className="h-36 w-full object-cover" />
                      ) : (
                        <img src={url} alt={file.name} className="h-36 w-full object-cover" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {message && (
            <div
              className={`rounded-lg px-4 py-3 text-sm font-medium ${
                isError ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
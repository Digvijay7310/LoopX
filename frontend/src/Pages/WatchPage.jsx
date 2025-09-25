import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoData();
  }, [id]);

  const fetchVideoData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/video/${id}`);
      const data = res.data.data;
      setVideo(data.video);
      setRelatedVideos(data.relatedVideos);
      setLikeStatus(data.likes.likeByCurrentUser);
      setSubscribed(data.subscribed);
      setComments(data.comments.list);
    } catch (error) {
      toast.error("Error fetching video");
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async () => {
    try {
      await axiosInstance.post(`/video/${video._id}/like`);
      setLikeStatus(!likeStatus);
      toast.success(likeStatus ? "Like removed" : "Liked video");
    } catch (error) {
      toast.error("Error liking video");
    }
  };

  const handleSubscribeToggle = async () => {
    try {
      await axiosInstance.post(`/video/subscriber${channelId}`);
      setSubscribed(!subscribed);
      toast.success(subscribed ? "Unsubscribed" : "Subscribed");
    } catch (error) {
      toast.error("Error toggling subscription");
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axiosInstance.post(`/video/${video._id}/comment`, { text: comment });
      setComments([res.data.data, ...comments]);
      setComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  if (loading || !video) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Video Player */}
      <div className="flex-1">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-red-600">
          <video
            controls
            src={video.videoUrl}
            className="w-full h-full object-cover bg-black"
          />
        </div>

        <h1 className="text-xl font-semibold mb-2">{video.title}</h1>

        {/* Channel Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={video.owner.avatar}
            alt="avatar"
            className="rounded-full h-10 w-10"
          />
          <div>
            <p className="font-medium">{video.owner.username}</p>
            <p className="text-sm text-gray-500">Category: {video.category}</p>
          </div>
        </div>

        {/* Description toggle */}
        <div className="mb-4">
          <p className="text-gray-700">
            {showFullDesc ? video.description : video.description.slice(0, 150) + "..."}
            <button
              className="text-blue-600 ml-2 text-sm"
              onClick={() => setShowFullDesc(!showFullDesc)}
            >
              {showFullDesc ? "Show less" : "Read more"}
            </button>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-6 text-gray-700 text-lg mb-6">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
            onClick={handleLikeToggle}
          >
            <FaThumbsUp />
            <span className="text-sm">{likeStatus ? "Unlike" : "Like"}</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-green-600"
            onClick={() => document.getElementById('commentInput')?.focus()}
          >
            <FaCommentDots />
            <span className="text-sm">Comment</span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-red-600"
            onClick={handleSubscribeToggle}
          >
            <FaBell />
            <span className="text-sm">{subscribed ? "Unsubscribe" : "Subscribe"}</span>
          </div>
        </div>

        {/* Comment Box */}
        <div className="mb-4">
          <textarea
            id="commentInput"
            className="w-full border rounded p-2"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
            onClick={handleCommentSubmit}
          >
            Post
          </button>
        </div>

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="text-md font-semibold mb-2">Comments</h3>
          {comments.map((c) => (
            <div key={c._id} className="flex gap-3">
              <img src={c.user.avatar} className="h-8 w-8 rounded-full" />
              <div>
                <p className="font-semibold text-sm">{c.user.username}</p>
                <p className="text-sm text-gray-700">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="w-full lg:w-[350px] space-y-4">
        <h2 className="text-lg font-semibold">Suggested Videos</h2>
        {relatedVideos
          .filter((v) => v._id !== video._id)
          .map((v) => (
            <div
              key={v._id}
              className="flex gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
            >
              <div className="w-32 h-20 bg-gray-300 rounded-md overflow-hidden">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium line-clamp-2">{v.title}</p>
                <p className="text-xs text-gray-500">{v.owner.username}</p>
                <p className="text-xs text-gray-500">{v.views} views</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WatchPage;

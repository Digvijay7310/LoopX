import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import SuggestedVideos from '../components/SuggestVideos';
import CommentsSection from '../components/CommentSection';

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
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
      await axiosInstance.post(`/video/subscriber/${video.owner._id}`);
      setSubscribed(!subscribed);
      toast.success(subscribed ? "Unsubscribed" : "Subscribed");
    } catch (error) {
      toast.error("Error toggling subscription");
    }
  };

  if (loading || !video) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left part: Video + details + comments */}
      <div className="flex-1">
        {/* Video player */}
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-red-600">
          <video
            controls
            src={video.videoUrl}
            className="w-full h-full object-cover bg-black"
          />
        </div>

        {/* Video title */}
        <h1 className="text-xl font-semibold mb-0.5">{video.title}</h1>
        <p className='text-xs font-semibold'>views {video.views}</p>

        {/* Channel info */}
        <Link to={`/users/${video.owner.username}`} className="flex items-center gap-3 mb-4">
          <img
            src={video.owner.avatar}
            alt={`${video.owner.username} avatar`}
            className="rounded-full h-10 w-10 border border-red-600"
          />
          <div>
            <p className="font-medium">{video.owner.username}</p>
            <p className="text-sm text-gray-500">Category: {video.category}</p>
          </div>
        </Link>

        {/* Description with toggle */}
        <div className="mb-4">
          <p className="text-gray-700">
            {showFullDesc
              ? video.description
              : video.description.length > 150
              ? video.description.slice(0, 150) + "..."
              : video.description}
            {video.description.length > 150 && (
              <button
                className="text-blue-600 ml-2 text-sm"
                onClick={() => setShowFullDesc(!showFullDesc)}
                aria-expanded={showFullDesc}
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-6 text-gray-700 text-lg mb-6">
          <button
            type="button"
            className="flex items-center shadow-md ring ring-blue-600 px-2 py-1 rounded-4xl gap-2 cursor-pointer hover:text-blue-600"
            onClick={handleLikeToggle}
            aria-pressed={likeStatus}
          >
            <FaThumbsUp className="text-blue-600" />
            <span className="text-sm">{likeStatus ? "Unlike" : "Like"}</span>
          </button>

          <button
            type="button"
            className="flex items-center shadow-md ring ring-green-600 px-2 py-1 rounded-4xl gap-2 cursor-pointer hover:text-green-600"
            onClick={() => document.getElementById('commentInput')?.focus()}
          >
            <FaCommentDots className="text-green-600" />
            <span className="text-sm">Comment</span>
          </button>

          <button
            type="button"
            className="flex items-center shadow-md ring ring-red-600 px-2 py-1 rounded-4xl gap-2 cursor-pointer hover:text-red-600"
            onClick={handleSubscribeToggle}
            aria-pressed={subscribed}
          >
            <FaBell className="text-red-600" />
            <span className="text-sm">{subscribed ? "Unsubscribe" : "Subscribe"}</span>
          </button>
        </div>

        {/* Comments Section */}
        <CommentsSection
          videoId={video._id}
          comments={comments}
          setComments={setComments}
        />
      </div>

      {/* Right part: Suggested Videos */}
      <SuggestedVideos videos={relatedVideos} currentVideoId={video._id} />
    </div>
  );
}

export default WatchPage;

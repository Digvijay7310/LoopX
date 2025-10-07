import React, { useEffect, useState } from 'react';
import { useParams, Link, data } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';

import SuggestedVideos from '../components/SuggestVideos';
import CommentsSection from '../components/CommentSection';
import VideoPlayer from '../components/VideoPlayer';
import { FiBell, FiThumbsUp } from 'react-icons/fi';
import VideoShareButton from '../components/VideoShareButton';

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [randomVideos, setRandomVideos] = useState([]);
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
      setRandomVideos(data.randomVideos); // ✅ Set random suggestions
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
  useEffect(() => {
  if (video?.title) {
    document.title = `LoopX - ${video.title}`; // You can customize this
  }

  return () => {
    document.title = "LoopX"; // Reset to default when navigating away
  };
}, [video]);


  if (loading || !video) return <p className="p-4">Loading...</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left section */}
      <div className="flex-1">

        <VideoPlayer src={video.videoUrl} />

        {/* Video info */}
        <h1 className="text-xl font-semibold mb-0.5">{video.title}</h1>
        <p className='text-xs font-semibold mb-2'>Views: {video.views}</p>

        {/* Channel */}
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

        {/* Description */}
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
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 text-gray-700 text-lg mb-6">
          <button
            type="button"
            onClick={handleLikeToggle}
            className="flex items-center cursor-pointer shadow-md ring ring-red-600 px-2 py-1 rounded-4xl gap-2 hover:text-red-600"
          >
            
            <span className="text-sm">{likeStatus ? (<FaThumbsUp size={20} />) : (<FiThumbsUp size={20} />)}</span>
          </button>

          <button
            type="button"
            onClick={() => document.getElementById('commentInput')?.focus()}
            className="flex items-center cursor-pointer shadow-md ring ring-green-600 px-2 py-1 rounded-4xl gap-2 hover:text-green-600"
          >
            <FaCommentDots className="text-green-600" />
          </button>

          <button
            type="button"
            onClick={handleSubscribeToggle}
            className="flex items-center shadow-md cursor-pointer ring ring-red-600 px-2 py-1 rounded-4xl gap-2 hover:text-red-600"
          >{subscribed ? "Unsubscribe" : "Subscribe"}
            
            <span className="text-sm text-red-500 hover:text-red-600 ">{subscribed ? (<FaBell size={20}  /> ) : (<FiBell size={20}  />)}</span>
          </button>
          <button>
            <VideoShareButton videoId={video._id} />
          </button>
        </div>

        {/* Comments */}
        <CommentsSection
          videoId={video._id}
          comments={comments}
          setComments={setComments}
        />
      </div>

      {/* Right section: Suggestions */}
      <div className="w-full lg:w-[350px] space-y-8">
        <SuggestedVideos
          videos={relatedVideos}
          currentVideoId={video._id}
          title="More from this creator"
        />
        <SuggestedVideos
          videos={randomVideos}
          currentVideoId={video._id}
          title="Explore More Videos"
        />
      </div>
    </div>
  );
}

export default WatchPage;

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/Axios';
import { toast } from 'react-toastify';
import { FaThumbsUp, FaCommentDots, FaBell } from 'react-icons/fa';

import SuggestedVideos from '../components/SuggestVideos';
import CommentsSection from '../components/CommentSection';
import VideoPlayer from '../components/VideoPlayer';
import { FiBell, FiThumbsUp } from 'react-icons/fi';
import VideoShareButton from '../components/VideoShareButton';
import VideoDescription from '../components/VideoDescription';

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [randomVideos, setRandomVideos] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideoData();
  }, [id]);

  const fetchVideoData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/api/video/${id}`);
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
      await axiosInstance.post(`/api/video/${video._id}/like`);
      setLikeStatus(!likeStatus);
      toast.success(likeStatus ? "Like removed" : "Liked video");
    } catch (error) {
      toast.error("Error liking video");
    }
  };

  const handleSubscribeToggle = async () => {
    try {
      await axiosInstance.post(`/api/video/subscriber/${video.owner._id}`);
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
    <div className="flex flex-col lg:flex-row gap-6 p-2 max-w-7xl mx-auto">
      {/* Left section */}
      <div className="flex-1">

        <VideoPlayer src={video.videoUrl} />

        {/* Video info */}
        <h1 className="text-sm font-semibold mb-0.5">{video.title}</h1>
        <p className='text-xs font-semibold mb-2'>Views: {video.views}</p>

      <div className='flex justify-between items-center gap-2'>  
        {/* Channel */}
        <Link to={`/api/users/${video.owner.username}`} className="flex items-center gap-0.5 mb-4">
          <img
            src={video.owner.avatar}
            alt={`${video.owner.username} avatar`}
            className="rounded-full h-10 w-10 border border-red-600"
          />
          <div>
            <p className="text-xs">{video.owner.username}</p>
            <p className="text-xs text-gray-500">Category: {video.category}</p>
          </div>
        </Link> 

         {/* Action Buttons */}
        <div className="flex items-center gap-1 text-gray-700 overflow-x-auto scrollbar mb-6">
  {/* Like Button */}
  <button
    type="button"
    onClick={handleLikeToggle}
    className="flex justify-center items-center gap-0.5 bg-gray-300 px-3 py-1 rounded-2xl hover:text-red-600 transition"
  >
    {likeStatus ? <FaThumbsUp className='text-sm md:text-xl' /> : <FiThumbsUp className='text-sm md:text-xl'  />}
    <span className="text-xs">{likeStatus ? 'Liked' : 'Like'}</span>
  </button>

  {/* Comment Button */}
  <button
    type="button"
    onClick={() => document.getElementById('commentInput')?.focus()}
    className="flex justify-center items-center rounded-2xl bg-gray-300 px-3 py-1 gap-0.5 hover:text-green-600 transition"
  >
    <FaCommentDots className='text-sm md:text-xl'  />
    <span className="text-xs md:sm">Comment</span>
  </button>

  {/* Subscribe Button */}
  <button
    type="button"
    onClick={handleSubscribeToggle}
    className={`flex items-center gap-0.5 px-4 py-1 rounded-full text-sm font-medium transition 
      ${subscribed ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
  >
    {subscribed ? <FaBell size={18} /> : <FiBell size={18} />}
    {subscribed ? 'Subscribed' : 'Subscribe'}
  </button>

  {/* Share Button */}
  <VideoShareButton videoId={video._id} />
</div>
        </div>  

        


        {/* Description */}
        <VideoDescription video={video} />


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

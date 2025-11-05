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
import Loading from '../components/Loading';
import ReportVideoComponent from '../components/ReportVideoComponent';

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
      toast.error('Error fetching video');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = async () => {
    if(!video._id) return;
    try {
      await axiosInstance.post(`/api/video/${video._id}/like`);
      setLikeStatus(!likeStatus);
      toast.success(likeStatus ? 'Like removed' : 'Liked video');
    } catch (error) {
      toast.error('Error liking video');
    }
  };

  const handleSubscribeToggle = async () => {
    try {
      await axiosInstance.post(`/api/video/subscriber/${video.owner._id}`);
      setSubscribed(!subscribed);
      toast.success(subscribed ? 'Unsubscribed' : 'Subscribed');
    } catch (error) {
      toast.error('Error toggling subscription');
    }
  };
  useEffect(() => {
    if (video?.title) {
      document.title = `LoopX - ${video.title}`; // You can customize this
    }

    return () => {
      document.title = 'LoopX'; // Reset to default when navigating away
    };
  }, [video]);

  if (loading || !video)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-1 max-w-7xl mx-auto">
      {/* Left section */}
      <div className="flex-1">
        <VideoPlayer src={video.videoUrl} />

        {/* Video info */}
        <h1 className="text-sm font-semibold mb-0.5 line-clamp-2">{video.title}</h1>
        <p className="text-xs mb-2">Views: {video.views} { " "}
          <span className='font-semibold'>{new Date(video.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </p>

        <div className="flex items-center justify-between gap-2 scrollbar">
          {/* Channel */}
          <Link to={`/users/${video.owner.username}`} className="flex items-center gap-1 mb-4">
            <img
              src={video.owner.avatar}
              alt={`${video.owner.username} avatar`}
              className="rounded-full h-10 w-10 border border-red-600"
              title="username"
            />
            <div>
              <p className="text-xs" title="username">
                {video.owner.username}
              </p>
              <p className="text-xs text-gray-500">Category: {video.category}</p>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 text-gray-700 overflow-x-auto scrollbar mb-6 ml-3">
            {/* Like Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`flex justify-center items-center gap-0.5 bg-gray-300 px-3 py-1 rounded-2xl ${likeStatus ? ("bg-red-600 text-white"): ("")} transition`}
            >
              {likeStatus ? (
                <FaThumbsUp className=" text-white" />
              ) : (
                <FiThumbsUp className="" />
              )}
              <span className="text-xs">{likeStatus ? 'Liked' : 'Like'}</span>
            </button>

            {/* Comment Button */}
            <button
              type="button"
              onClick={() => document.getElementById('commentInput')?.focus()}
              className="flex justify-center items-center rounded-2xl bg-gray-300 px-3 py-1 gap-0.5 hover:text-blue-600 transition"
            >
              <FaCommentDots className="text-sm md:text-xl" />
              <span className="text-xs md:sm">Comment</span>
            </button>

            {/* Subscribe Button */}
            <button
              type="button"
              onClick={handleSubscribeToggle}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition 
                ${subscribed ? 'bg-gray-200 text-black hover:bg-gray-300 animate-pulse' : 'bg-red-600 text-white hover:bg-red-800'}`}
            >

              {subscribed ? <FaBell size={18} /> : <FiBell size={18} />}
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>

            {/* Share Button */}
            <VideoShareButton videoId={video._id} />

            {/* Report Button */}
            <ReportVideoComponent videoId={video._id} videoTitle={video.title} />
          </div>
        </div>

        {/* Description */}
        <VideoDescription video={video} />

        {/* Comments */}
        <CommentsSection videoId={video._id} comments={comments} setComments={setComments} />
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

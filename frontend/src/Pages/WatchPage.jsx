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
import SubscribeButton from '../components/SubscribeButton';

function WatchPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [randomVideos, setRandomVideos] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0)
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
      setSubscriberCount(data.subscriberCount);
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
      await axiosInstance.post(`/video/${video._id}/like`);
      setLikeStatus(!likeStatus);
      toast.success(likeStatus ? 'Like removed' : 'Liked video');
    } catch (error) {
      toast.error('Error liking video');
    }
  };


  useEffect(() => {
    if (video?.title) document.title = `LoopX - ${video.title}`;
      return () => {document.title = 'LoopX'}

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
        <VideoPlayer thumbnail={video.thumbnail} src={video.videoUrl} />

        {/* Video info */}
        <h1 className="font-semibold line-clamp-1">{video.title}</h1>
        <p className="text-xs mb-2">Views: {video.views} { " "}
          <span className='font-semibold'>
            {new Date(video.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
          </span>
        </p>


        <div className="flex items-center justify-between gap-2 overflow-auto scrollbar">
          {/* Channel */}
          <Link to={`/users/${video.owner.username}`} className="flex flex-col items-center mb-4 w-fit">
            <img
              src={video.owner.avatar}
              alt={`${video.owner.username} avatar`}
              className="rounded-full h-10 w-10 border border-red-600"
              title={video.owner.username}
            /> 
            <p className="text-xs text-center w-10" title={video.owner.username}>{video.owner.username}</p>
            <div> 
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 text-gray-700 mb-6 ml-3">
            {/* Like Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className={`flex items-center gap-1 px-3 py-1 rounded-full bg-gray-200 text-sm ${likeStatus ? ("bg-red-600 text-white"): ("")} transition`}
            >
              {likeStatus ? (
                <FaThumbsUp className=" text-white" />
              ) : (
                <FiThumbsUp />
              )}
              <span className="text-xs">{likeStatus ? 'Liked' : 'Like'}</span>
            </button>

            {/* Comment Button */}
            <button
              type="button"
              onClick={() => document.getElementById('commentInput')?.focus()}
              className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-200 hover:text-blue-600 transition"
            >
              <FaCommentDots className="text-sm md:text-xl" />
              <span className="text-xs md:sm">Comment</span>
            </button>

            {/* Subscribe Button */}
            <SubscribeButton channelUsername={video.owner.username}
            initialSubscribed={subscribed} subscriberCount={subscriberCount} setSubscriberCount={setSubscriberCount}
            />

            {/* Share Button */}
            <VideoShareButton showbg={true} videoId={video._id} />

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

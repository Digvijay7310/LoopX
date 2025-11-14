import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import HomePageLoading from '../components/LoadingComponents/HomePageLoading';
import HomePageVideoCard from '../components/HomePageVideoCard';
import UploadLoading from '../components/LoadingComponents/UploadLoading';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true); // infinite scroll stop flag
  const limit = 10; // ek batch me kitni videos fetch karni

  const fetchVideos = async () => {
    if (!hasMore) return;
    try {
      if (lastId) {
        setLoadingMore(true);
      }
      const res = await axiosInstance.get(`/video/home?limit=${limit}${lastId ? '&lastId=' + lastId : ''}`);
      const newVideos = res.data.data;

      if (newVideos.length < limit) setHasMore(false); // agar kam videos aaye to stop
      if (newVideos.length > 0) setLastId(newVideos[newVideos.length - 1]._id);

      setVideos((prev) => [...prev, ...newVideos]);
    } catch (error) {
      console.error('Error fetching videos: ', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loadingMore
      ) {
        fetchVideos();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastId, loadingMore, hasMore]);

  // SEO
  useEffect(() => {
    document.title = 'LoopX - Watch your favourite videos and like comment & Subscribe your favorite creators';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'LoopX - Watch, like, comment & Subscribe trending videos using just your email.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'LoopX - Watch, like, comment & Subscribe trending videos using just your email.';
      document.head.appendChild(meta);
    }
  }, []);

  if (loading && videos.length === 0) return <HomePageLoading />;

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="p-1 top-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.length === 0 ? (
          <p className="w-full text-center font-bold text-3xl">Login to see videos</p>
        ) : (
          videos.map((video) => <HomePageVideoCard key={video._id} video={video} />)
        )}
      </div>
      {loadingMore && <p className="text-center py-5">Loading more videos...</p>}
    </div>
  );
}

export default HomePage;

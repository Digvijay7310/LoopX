import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';
import HomePageLoading from '../components/LoadingComponents/HomePageLoading';
import HomePageVideoCard from '../components/HomePageVideoCard';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get('/video/home');
        if (res.data.data) {
          setVideos(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching videos: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  useEffect(() => {
    document.title = 'LoopX - Watch your favourite videos and like comment & Subscribe you favorite creators';

    const metaDescription = document.querySelector('meta[name="description"]');
    if(metaDescription){
      metaDescription.setAttribute(
        'content',
        'LoopX - Watch, like, comment & Subscribe to trending videos using just you email.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'LoopX - Watch, like, comment & Subscribe trending videos using just your email.'
      document.head.appendChild(meta)
    }
  },[])
  

  if (loading) return <HomePageLoading />;

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="p-1 top-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videos.length === 0 ? (
          <p className="w-full text-center font-bold text-3xl">Login to see videos </p>
        ) : (
          videos.map((video) => <HomePageVideoCard key={video._id} video={video} />)
        )}
      </div>
    </div>
  );
}

export default HomePage;

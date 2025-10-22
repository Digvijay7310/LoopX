import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa';

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play/Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setProgress((video.currentTime / video.duration) * 100);
    setDuration(video.duration);
  };

  // Seek video
  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    video.currentTime = percent * video.duration;
  };

  // Fullscreen toggle
  const handleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if(tagName === 'input' || tagName === "textarea" || e.target.isContainEditable){
      return;
    }
    
    const video = videoRef.current;
    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        video.currentTime += 5;
        break;
      case 'ArrowLeft':
        video.currentTime -= 5;
        break;
      case 'm':
        toggleMute();
        break;
      case 'f':
        handleFullScreen();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format time (e.g. 01:23)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4 group">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
      />

      {/* Controls */}
      <div className="absolute bottom-0 left-0 w-full bg-black/60 p-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="h-0.5 bg-gray-600 rounded cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-red-600 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between text-white text-sm px-2">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={toggleMute}>
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <span>{formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}</span>
          </div>
          <button onClick={handleFullScreen}>
            <FaExpand />
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;

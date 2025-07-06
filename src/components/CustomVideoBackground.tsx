import React, { useRef, useEffect, useState } from 'react';

/**
 * CustomVideoBackground
 * Renders a video as a background with rounded corners, looping forward and backward infinitely.
 * The video does not occupy the full screen and is styled to be visually harmonious.
 *
 * Props:
 * - src: string (video file path)
 * - className?: string (optional additional classes)
 * - children?: React.ReactNode (content to overlay on the video)
 */
const CustomVideoBackground: React.FC<{
  src: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, className = '', children }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrame: number;
    let playing = true;

    const handleEnded = () => {
      setIsReversed((prev) => !prev);
    };

    // For reverse playback
    const reversePlayback = () => {
      if (!video) return;
      if (!isReversed) return;
      if (video.currentTime <= 0) {
        setIsReversed(false);
        video.play();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - 0.033); // ~30fps
      animationFrame = requestAnimationFrame(reversePlayback);
    };

    if (isReversed) {
      video.pause();
      reversePlayback();
    } else {
      video.play();
    }

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationFrame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReversed]);

  // Style: rounded, shadow, not full width, centered
  return (
    <div
      className={`relative mx-auto my-8 rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${className}`}
      style={{ maxWidth: 900, minWidth: 320, aspectRatio: '16/9' }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        style={{
          filter: 'brightness(0.7) blur(0.5px)',
          borderRadius: 'inherit',
        }}
      />
      {children && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomVideoBackground; 
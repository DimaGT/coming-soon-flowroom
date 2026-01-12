'use client';

import { useEffect, useRef, useState } from 'react';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Save music progress to localStorage
  useEffect(() => {
    const saveProgress = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const isPlaying = !audioRef.current.paused;
        localStorage.setItem('musicProgress', currentTime.toString());
        localStorage.setItem('musicIsPlaying', isPlaying.toString());
        localStorage.setItem('musicIsMuted', isMuted.toString());
      }
    };

    // Save progress periodically
    const interval = setInterval(saveProgress, 1000);

    // Save progress before page unload
    window.addEventListener('beforeunload', saveProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveProgress);
    };
  }, [isMuted]);

  // Restore music progress from localStorage on mount
  useEffect(() => {
    const restoreProgress = () => {
      if (audioRef.current) {
        const savedProgress = localStorage.getItem('musicProgress');
        const savedIsPlaying = localStorage.getItem('musicIsPlaying');
        const savedIsMuted = localStorage.getItem('musicIsMuted');

        if (savedProgress) {
          audioRef.current.currentTime = parseFloat(savedProgress);
        }

        if (savedIsMuted === 'true') {
          setIsMuted(true);
        }

        // Restore playing state after user interaction
        if (savedIsPlaying === 'true' && savedIsMuted !== 'true') {
          const handleInteraction = async () => {
            if (audioRef.current) {
              try {
                await audioRef.current.play();
                setHasUserInteracted(true);
              } catch (err) {
                console.error('Failed to restore audio:', err);
              }
            }
          };

          const events = ['click', 'touchstart', 'keydown', 'mousemove'];
          events.forEach(event => {
            document.addEventListener(event, handleInteraction, { once: true });
          });
        }
      }
    };

    // Wait for audio to be ready
    if (audioRef.current) {
      if (audioRef.current.readyState >= 2) {
        // Audio is already loaded
        restoreProgress();
      } else {
        // Wait for audio to load
        audioRef.current.addEventListener('loadedmetadata', restoreProgress, { once: true });
      }
    }
  }, []);

  // Start music on first user interaction (only if not restored from localStorage)
  useEffect(() => {
    // Check if we have saved state - if yes, restoration will handle it
    const savedIsPlaying = localStorage.getItem('musicIsPlaying');
    if (savedIsPlaying === 'true') {
      return; // Let restoration handle it
    }

    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && audioRef.current && !isMuted) {
        try {
          await audioRef.current.play();
          setHasUserInteracted(true);
        } catch (err) {
          console.error('Failed to play audio:', err);
        }
      }
    };

    // Listen for various user interactions
    const events = ['click', 'touchstart', 'keydown', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [hasUserInteracted, isMuted]);

  // Handle mute state changes
  useEffect(() => {
    if (audioRef.current && hasUserInteracted) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Failed to play audio:', err);
        });
      }
    }
  }, [isMuted, hasUserInteracted]);

  // Toggle mute/unmute music
  const toggleMute = async () => {
    if (audioRef.current) {
      if (isMuted) {
        try {
          await audioRef.current.play();
          setIsMuted(false);
          if (!hasUserInteracted) {
            setHasUserInteracted(true);
          }
        } catch (err) {
          console.error('Failed to play audio:', err);
        }
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Audio element for music */}
      <audio ref={audioRef} loop preload='auto' className='hidden'>
        <source src='/audio/soundscape.mp3' type='audio/mpeg' />
        <source src='/audio/soundscape.ogg' type='audio/ogg' />
      </audio>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className='fixed top-4 right-4 z-[100] p-3 bg-black/60 hover:bg-black/80 border-2 border-[#ffda17] rounded-full transition-all duration-300 hover:scale-110 active:scale-95'
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          // Muted icon
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='#ffda17'
            className='w-6 h-6'
          >
            <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
          </svg>
        ) : (
          // Unmuted icon
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='#ffda17'
            className='w-6 h-6'
          >
            <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
          </svg>
        )}
      </button>
    </>
  );
}


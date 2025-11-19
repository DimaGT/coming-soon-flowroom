'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import SplashCursor from '../components/SplashCursor';
import { supabase } from '../lib/supabase/client';

const items = [
  {
    id: 1,
    text: 'A new way to see learning.',
    hasActive: true
  },
  {
    id: 2,
    text: 'An environment that adapts to the child.',
    hasActive: true
  },
  {
    id: 3,
    text: 'Tools for real focus, not forced attention.',
    hasActive: true
  },
  {
    id: 4,
    text: 'Coming soon',
    hasActive: false
  },
  {
    id: 5,
    text: 'Built with teachers, for classrooms.',
    hasActive: true
  },
  {
    id: 6,
    text: 'Opening soon.',
    hasActive: true
  },
  {
    id: 7,
    text: 'Coming soon',
    hasActive: false
  },
  {
    id: 8,
    text: 'Coming soon',
    hasActive: false
  }
];

export default function Home() {
  const [activeItem, setActiveItem] = useState<number>(1);
  const [lastActiveText, setLastActiveText] = useState<string>('A new way to see learning.');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Update last active text when activeItem changes
  useEffect(() => {
    const activeItemData = items.find(item => item.id === activeItem);
    if (activeItemData && activeItemData.hasActive) {
      setLastActiveText(activeItemData.text);
    }
  }, [activeItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          setSubmitStatus('success');
          setEmail('');
        } else {
          setSubmitStatus('error');
        }
      } else {
        setSubmitStatus('success');
        setEmail('');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize SplashCursor to prevent re-renders
  const cursorComponent = useMemo(() => <SplashCursor />, []);

  return (
    <div className='relative md:h-screen w-full overflow-hidden bg-black py-4'>
      {cursorComponent}

      {/* Background images */}
      <div className='absolute inset-0 z-10 flex items-center justify-center'>
        <div className='relative w-full h-full max-w-7xl mx-auto'>
          {/* Roof image at the top */}
          <div className='absolute left-1/2 -translate-x-1/2 w-full max-w-[160px] h-1/2'>
            <Image
              src='/images/window.png'
              alt='Roof'
              fill
              className='object-contain object-top'
              priority
            />
          </div>
        </div>
        {/* City image at the bottom - full width */}
        <div className='absolute bottom-[-5vh] left-0 right-0 w-screen h-1/2'>
          <Image
            src='/images/city.png'
            alt='City'
            fill
            className='object-contain object-bottom'
            priority
          />
        </div>
      </div>

      {/* Content block centered */}
      <div className='relative z-10 flex h-full flex-col items-center  px-4 mt-52'>
        <div className='mb-8 flex flex-col items-center'>
          <span className='text-yellow-300 text-5xl font-bold tracking-wide drop-shadow-lg uppercase'>
            Coming Soon
          </span>
        </div>
        {/* Gallery */}
        <div className='grid sm:grid-cols-4 grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-xl '>
          {items.map(item => {
            const isActive = activeItem === item.id;

            return (
              <div
                key={item.id}
                className='relative flex flex-col items-center transition-all duration-300 cursor-pointer'
                onMouseEnter={() => setActiveItem(item.id)}
              >
                {/* Image container */}
                <div className='relative w-full h-full overflow-hidden min-w-[100px]'>
                  {/* Unactive image */}
                  <Image
                    src={`/images/${item.id}-unactive.jpg`}
                    alt={`Item ${item.id}`}
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      item.hasActive && isActive ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Active image - appears when item is active */}
                  {item.hasActive && (
                    <Image
                      src={`/images/${item.id}-active.jpg`}
                      alt={`Item ${item.id} active`}
                      width={400}
                      height={400}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}
                  {/* Coming soon overlay for items 4,7,8 */}
                  {!item.hasActive && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className='text-yellow-300  font-semibold drop-shadow-lg'>
                        {item.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Text below gallery */}
        <div className='mt-8 text-center h-8 flex items-center justify-center'>
          {(() => {
            const activeItemData = items.find(item => item.id === activeItem);
            const displayText =
              activeItemData && activeItemData.hasActive ? activeItemData.text : lastActiveText;
            return (
              <p className='font-bold text-lg md:text-base uppercase lg:text-2xl text-[#ffda17] drop-shadow-lg opacity-100'>
                {displayText}
              </p>
            );
          })()}
        </div>

        {/* Email subscription form */}
        <div className='mt-4 flex flex-col items-center gap-4'>
          <p className='text-[#ffda17] text-sm md:text-base lg:text-lg drop-shadow-lg text-center transition-opacity duration-300'>
            Let me know when the next flow session begins.
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3 items-center'>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              disabled={isSubmitting}
              className={`px-4 py-2.5 bg-black/80 border-2 text-[#ffda17] placeholder-yellow-300/50 
                focus:outline-none focus:ring-2 focus:ring-[#ffda17] focus:ring-opacity-50
                transition-all duration-300 ease-in-out
                min-w-[250px] sm:min-w-[300px]
                ${
                  isSubmitting
                    ? 'border-yellow-600/30 opacity-50 cursor-not-allowed'
                    : 'border-[#ffda17] hover:border-yellow-400 focus:border-yellow-400'
                }`}
            />
            <button
              type='submit'
              disabled={isSubmitting}
              className={`px-8 py-2.5 font-bold uppercase cursor-pointer
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95 
                ${
                  isSubmitting
                    ? 'bg-yellow-600/30 text-black/40 cursor-wait'
                    : !email
                    ? 'bg-yellow-600/40 text-black/50 cursor-pointer'
                    : 'bg-[#ffda17] text-black hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-400/50 active:bg-yellow-500'
                }`}
            >
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </button>
          </form>
          {submitStatus === 'success' && (
            <p className='text-green-400 text-sm mt-2 transition-opacity duration-300 animate-in fade-in'>
              Thank you! We'll notify you when the next session begins.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className='text-red-400 text-sm mt-2 transition-opacity duration-300 animate-in fade-in'>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

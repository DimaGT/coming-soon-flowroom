'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
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
  const [showWindowTooltip, setShowWindowTooltip] = useState<boolean>(false);
  const [showCrashModal, setShowCrashModal] = useState<boolean>(false);
  const [modalEmail, setModalEmail] = useState<string>('');
  const [isModalSubmitting, setIsModalSubmitting] = useState<boolean>(false);
  const [isPageRestored, setIsPageRestored] = useState<boolean>(false);
  const [isScreenDark, setIsScreenDark] = useState<boolean>(false);

  // Update last active text when activeItem changes
  useEffect(() => {
    const activeItemData = items.find(item => item.id === activeItem);
    if (activeItemData && activeItemData.hasActive) {
      setLastActiveText(activeItemData.text);
    }
  }, [activeItem]);

  // Smoothly restore page to normal position (without fixing window)
  const restorePagePosition = () => {
    document.body.style.transition = 'transform 0.8s ease-out';
    document.body.style.transform = '';
    setIsScreenDark(false);
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    const windowElement = document.querySelector('.window-container') as HTMLElement;
    const cityElement = document.querySelector('.city-container') as HTMLElement;
    const galleryElement = document.querySelector('.gallery-container') as HTMLElement;
    const formElement = document.querySelector('.email-form-container') as HTMLElement;
    const titleElement = document.querySelector('.title-container') as HTMLElement;

    if (mainContent) {
      mainContent.style.transition = 'opacity 0.8s ease-out';
      mainContent.style.opacity = '1';
    }
    if (windowElement) {
      windowElement.style.transition = 'transform 0.8s ease-out';
      windowElement.style.transform = '';
    }
    if (cityElement) {
      cityElement.style.transition = 'transform 0.8s ease-out';
      cityElement.style.transform = '';
    }
    if (galleryElement) {
      galleryElement.style.transition = 'transform 0.8s ease-out';
      galleryElement.style.transform = '';
    }
    if (formElement) {
      formElement.style.transition = 'transform 0.8s ease-out';
      formElement.style.transform = '';
    }
    if (titleElement) {
      titleElement.style.transition = 'transform 0.8s ease-out';
      titleElement.style.transform = '';
    }

    setTimeout(() => {
      document.body.style.transition = '';
      if (mainContent) {
        mainContent.style.transition = '';
      }
      if (windowElement) {
        windowElement.style.transition = '';
      }
      if (cityElement) {
        cityElement.style.transition = '';
      }
      if (galleryElement) {
        galleryElement.style.transition = '';
      }
      if (formElement) {
        formElement.style.transition = '';
      }
      if (titleElement) {
        titleElement.style.transition = '';
      }
    }, 800);
  };

  // Restore page position and fix window (stop flashing)
  const restorePageAndFixWindow = () => {
    document.body.style.transition = 'transform 0.8s ease-out';
    document.body.style.transform = '';
    setIsScreenDark(false);
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    const windowElement = document.querySelector('.window-container') as HTMLElement;
    const cityElement = document.querySelector('.city-container') as HTMLElement;
    const galleryElement = document.querySelector('.gallery-container') as HTMLElement;
    const formElement = document.querySelector('.email-form-container') as HTMLElement;
    const titleElement = document.querySelector('.title-container') as HTMLElement;

    if (mainContent) {
      mainContent.style.transition = 'opacity 0.8s ease-out';
      mainContent.style.opacity = '1';
    }
    if (windowElement) {
      windowElement.style.transition = 'transform 0.8s ease-out';
      windowElement.style.transform = '';
    }
    if (cityElement) {
      cityElement.style.transition = 'transform 0.8s ease-out';
      cityElement.style.transform = '';
    }
    if (galleryElement) {
      galleryElement.style.transition = 'transform 0.8s ease-out';
      galleryElement.style.transform = '';
    }
    if (formElement) {
      formElement.style.transition = 'transform 0.8s ease-out';
      formElement.style.transform = '';
    }
    if (titleElement) {
      titleElement.style.transition = 'transform 0.8s ease-out';
      titleElement.style.transform = '';
    }

    setTimeout(() => {
      document.body.style.transition = '';
      if (mainContent) {
        mainContent.style.transition = '';
      }
      if (windowElement) {
        windowElement.style.transition = '';
      }
      if (cityElement) {
        cityElement.style.transition = '';
      }
      if (galleryElement) {
        galleryElement.style.transition = '';
      }
      if (formElement) {
        formElement.style.transition = '';
      }
      if (titleElement) {
        titleElement.style.transition = '';
      }
      setIsPageRestored(true);
      // Remove flashing animation from window
      const flashingWindow = document.querySelector('.window-flashing');
      if (flashingWindow) {
        flashingWindow.classList.remove('window-flashing');
      }
    }, 800);
  };

  // Handle window click - shake entire page with collapse effect
  const handleWindowClick = () => {
    let x = 0;
    const startTime = Date.now();
    const duration = 5000; // Збільшена тривалість трясіння
    const fadeStartTime = 3500; // Починаємо затемнювати через 3.5 секунди

    // Додаємо клас для миготіння
    document.body.classList.add('flashing-effect');

    const mainContent = document.querySelector('.main-content') as HTMLElement;
    const windowElement = document.querySelector('.window-container') as HTMLElement;
    const cityElement = document.querySelector('.city-container') as HTMLElement;
    const galleryElement = document.querySelector('.gallery-container') as HTMLElement;
    const formElement = document.querySelector('.email-form-container') as HTMLElement;
    const titleElement = document.querySelector('.title-container') as HTMLElement;
    let fadeStarted = false;

    // Отримуємо висоту екрану для опускання до низу
    const screenHeight = window.innerHeight;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration; // 0 to 1

      // Трясіння
      document.body.style.transform = `translate(${Math.sin(x) * 10}px, ${
        Math.cos(x) * 10
      }px) rotate(${Math.sin(x) * 4}deg)`;
      x += 0.35; // пришвидшення

      // Анімація опускання вікон та міста (collapse effect) - повільніше, але до самого низу
      const collapseProgress = Math.min(1, (elapsed - 1000) / 3500); // Починаємо через 1 секунду, повільніше (3.5 сек)
      if (collapseProgress > 0) {
        // Використовуємо ease-out для більш природного падіння
        const easedProgress = 1 - Math.pow(1 - collapseProgress, 2);
        // Опускаємо до самого низу екрану
        const windowOffset = easedProgress * (screenHeight + 200); // За самий низ екрану
        const cityOffset = easedProgress * (screenHeight * 0.8); // Трохи менше
        const galleryOffset = easedProgress * (screenHeight * 0.6); // Менше
        const formOffset = easedProgress * (screenHeight * 0.7); // Форма теж опускається
        // Збільшуємо scale текстів паралельно з опусканням
        const titleScale = 1 + easedProgress * 1.5; // Від 1 до 2.5

        if (windowElement) {
          windowElement.style.transform = `translateY(${windowOffset}px)`;
          windowElement.style.transition = 'transform 0.1s linear';
        }
        if (cityElement) {
          cityElement.style.transform = `translateY(${cityOffset}px)`;
          cityElement.style.transition = 'transform 0.1s linear';
        }
        if (galleryElement) {
          galleryElement.style.transform = `translateY(${galleryOffset}px)`;
          galleryElement.style.transition = 'transform 0.1s linear';
        }
        if (formElement) {
          formElement.style.transform = `translateY(${formOffset}px)`;
          formElement.style.transition = 'transform 0.1s linear';
        }
        if (titleElement) {
          titleElement.style.transform = `scale(${titleScale})`;
          titleElement.style.transition = 'transform 0.1s linear';
        }
      }

      // Починаємо затемнювати після fadeStartTime
      if (elapsed >= fadeStartTime && !fadeStarted) {
        fadeStarted = true;
        setIsScreenDark(true);
        if (mainContent) {
          // Встановлюємо transition один раз
          mainContent.style.transition = 'opacity 1.5s ease-out';
          mainContent.style.opacity = '0';
        }
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        // Залишаємо сторінку нахиленою, як після землетрусу
        document.body.style.transform = 'translate(8px, 12px) rotate(6deg)';
        document.body.classList.remove('flashing-effect');
        // Через 2 секунди показуємо модалку
        setTimeout(() => {
          setShowCrashModal(true);
        }, 2000);
        return;
      }
    }, 30); // пришвидшення
  };

  // Додаємо стилі для ефекту миготіння
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const styleId = 'flashing-effect-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          @keyframes flashing {
            0%, 100% { filter: brightness(1); }
            20% { filter: brightness(2); }
            40% { filter: brightness(0.6); }
            60% { filter: brightness(1.7); }
            80% { filter: brightness(0.8); }
          }
          @keyframes window-flashing {
            0%, 100% { filter: brightness(1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6)); }
            25% { filter: brightness(2.5) drop-shadow(0 0 20px rgba(255, 255, 255, 1)); }
            50% { filter: brightness(0.5) drop-shadow(0 0 4px rgba(255, 255, 255, 0.3)); }
            75% { filter: brightness(2) drop-shadow(0 0 15px rgba(255, 255, 255, 0.9)); }
          }
          .flashing-effect {
            animation: flashing 1s linear infinite;
          }
          .window-flashing {
            animation: window-flashing 2s ease-in-out infinite;
          }
          @keyframes modal-appear {
            0% {
              opacity: 0;
              transform: scale(0.8) translateY(-20px);
            }
            50% {
              transform: scale(1.05) translateY(5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          .modal-appear {
            animation: modal-appear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes modal-backdrop {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .modal-backdrop {
            animation: modal-backdrop 0.4s ease-out forwards;
          }
          @keyframes dark-overlay-fade {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .dark-overlay {
            animation: dark-overlay-fade 1.5s ease-out forwards;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          toast.success(
            'You are already subscribed! We will notify you when the next session begins.'
          );
          setEmail('');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        toast.success('Thank you! We will notify you when the next flow session begins.');
        setEmail('');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modalEmail || !modalEmail.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsModalSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email: modalEmail.trim().toLowerCase() }]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          toast.success('You are already subscribed! Thank you for being a hero! ');
          setModalEmail('');
          setShowCrashModal(false);
          restorePageAndFixWindow();
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        toast.success('Thank you for saving the day!');
        setModalEmail('');
        setShowCrashModal(false);
        restorePageAndFixWindow();
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsModalSubmitting(false);
    }
  };

  // Memoize SplashCursor to prevent re-renders
  const cursorComponent = useMemo(() => <SplashCursor />, []);

  return (
    <>
      {/* Crash Modal */}
      {showCrashModal && (
        <div className='fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm modal-backdrop'>
          <div className='relative bg-black/95 border border-gray-700/50 rounded-xl p-8 md:p-10 max-w-lg w-full mx-4 shadow-2xl modal-appear'>
            <button
              onClick={() => {
                setShowCrashModal(false);
                restorePagePosition();
              }}
              className='absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-light transition-colors w-8 h-8 flex items-center justify-center'
            >
              ×
            </button>
            <div className='text-center space-y-5'>
              <h2 className='text-3xl md:text-4xl font-semibold text-white mb-8'>
                😜 uh oh, <br />{' '}
                <span className='text-2xl md:text-3xl text-gray-300'>
                  Look what you made me do
                </span>
              </h2>
              <p className='text-gray-300 text-base md:text-lg leading-relaxed font-normal max-w-md mx-auto'>
                Would you like to see how we are going to build a new system together?
              </p>
              <p className='text-white text-base md:text-lg font-medium mt-8 mb-2'>
                Join the revolution. Leave your email below.
              </p>
              <form onSubmit={handleModalSubmit} className='mt-6 flex flex-col gap-3'>
                <input
                  type='email'
                  value={modalEmail}
                  onChange={e => setModalEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  disabled={isModalSubmitting}
                  className={`px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 
                    focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 focus:border-[#ffda17]/50
                    transition-all duration-300 ease-in-out rounded-lg
                    ${
                      isModalSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:border-gray-500 focus:bg-white/10'
                    }`}
                />
                <button
                  type='submit'
                  disabled={isModalSubmitting}
                  className={`px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                    transition-all duration-300 ease-in-out
                    transform hover:scale-105 active:scale-95 
                    ${
                      isModalSubmitting
                        ? 'bg-gray-700/50 text-gray-400 cursor-wait'
                        : !modalEmail
                        ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                        : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30 active:bg-[#ffd700]'
                    }`}
                >
                  {isModalSubmitting ? 'Joining...' : 'Join the Revolution'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Dark overlay */}
      {isScreenDark && (
        <div className='fixed inset-0 bg-black z-[150] pointer-events-none dark-overlay'></div>
      )}
      <div className='main-content relative md:h-screen w-full overflow-hidden bg-black py-4'>
        {cursorComponent}

        {/* Background images */}
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <div className='relative w-full h-full max-w-7xl mx-auto'>
            {/* Roof image at the top */}
            <div
              onClick={handleWindowClick}
              onMouseEnter={() => setShowWindowTooltip(true)}
              onMouseLeave={() => setShowWindowTooltip(false)}
              className={`window-container ${
                !isPageRestored ? 'window-flashing' : ''
              } absolute left-1/2 -translate-x-1/2 w-full md:max-w-[160px] max-w-[120px] h-1/2 cursor-pointer group`}
            >
              <Image
                src='/images/window.png'
                alt='Roof'
                fill
                className='object-contain object-top'
                priority
              />
            </div>
            {/* Tooltip - зліва від вікна */}
            {showWindowTooltip && (
              <div className='absolute left-1/2 -translate-x-[calc(100%+24px)] top-8  z-[100] pointer-events-none'>
                <div className='px-4 py-2 bg-[#ffda17] text-black text-sm font-bold uppercase whitespace-nowrap rounded shadow-lg animate-pulse'>
                  {isPageRestored ? (
                    <>
                      <span className='block text-center'>Everything's fine with me!</span>
                      <span className='block text-xs mt-1 text-center'>Thanks for helping</span>
                    </>
                  ) : (
                    <>
                      <span className='block text-center'> Something's glitching!</span>
                      <span className='block text-xs mt-1 text-center'>Click to fix me</span>
                    </>
                  )}
                </div>
                <div className='absolute top-1/2 -translate-y-1/2 -right-2 border-4 border-transparent border-l-[#ffda17]'></div>
              </div>
            )}
          </div>
          {/* City image at the bottom - full width */}
          <div className='city-container absolute md:bottom-[-5vh] bottom-0 left-0 right-0 w-screen h-1/2'>
            <div className='relative h-full w-[150vw] left-1/2 -translate-x-1/2 md:w-full md:left-0 md:translate-x-0'>
              <Image
                src='/images/city.png'
                alt='City'
                fill
                className='object-contain object-bottom'
                priority
              />
            </div>
          </div>
        </div>

        {/* Content block centered */}
        <div className='relative z-10 flex h-full flex-col items-center  px-4 mt-36 md:mt-46  mb-24 md:mb-0'>
          <div className='title-container mb-5 flex flex-col items-center'>
            <span className='text-yellow-300 text-5xl font-bold tracking-wide drop-shadow-lg uppercase'>
              FLOWROOM
            </span>
            <span className='text-[#fdfbb4] text-xl font-bold tracking-wide drop-shadow-lg uppercase'>
              COMING SOON
            </span>
          </div>
          {/* Gallery */}
          <div className='gallery-container grid sm:grid-cols-4 grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-xl '>
            {items.map(item => {
              const isActive = activeItem === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col items-center transition-all duration-300 cursor-pointer ${
                    item.id === 7 || item.id === 8 ? 'hidden sm:flex' : ''
                  }`}
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
                        <span className='text-[#fdfbb4] font-semibold uppercase italic drop-shadow-lg text-center block leading-tight whitespace-pre-line text-2xl'>
                          {item.text
                            .split(' ')
                            .slice(0, Math.ceil(item.text.split(' ').length / 2))
                            .join(' ')}
                          <br />
                          {item.text
                            .split(' ')
                            .slice(Math.ceil(item.text.split(' ').length / 2))
                            .join(' ')}
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
          <div className='email-form-container mt-4 flex flex-col items-center gap-4'>
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
                className={`px-4 py-2.5 bg-black/80 border-2 text-[#fdfbb4] placeholder-[#fdfbb4] 
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
          </div>
        </div>
      </div>
    </>
  );
}

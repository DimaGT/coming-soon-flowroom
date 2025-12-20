'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import SplashCursor from '../components/SplashCursor';
import { supabase } from '../lib/supabase/client';
import { isValidEmail } from '../lib/utils/email';

const items = [
  {
    id: 1,
    text: 'A New Way of Learning.',
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
  const [showBrandMoment, setShowBrandMoment] = useState<boolean>(false);
  const [isPageRestored, setIsPageRestored] = useState<boolean>(false);
  const [isScreenDark, setIsScreenDark] = useState<boolean>(false);
  const [showLucyBackdrop, setShowLucyBackdrop] = useState<boolean>(false);

  const WINTER_PACK_PROMO_CODE = 'FLWRM- WNTR-26';

  // Helper to send structured Winter Pack promo email
  const sendWinterPackEmail = async (recipientEmail: string) => {
    const to = recipientEmail.trim().toLowerCase();
    if (!to || !isValidEmail(to)) return;

    const subject = 'Welcome to Flowroom! Here is your Winter Pack access code.';

    const text = `Hi There,

Here is your personal promo code for complimentary access to the Flowroom Winter Pack – Class Flow edition on Teachers Pay Teachers:
Promo code: ${WINTER_PACK_PROMO_CODE}
Access link: https://www.teacherspayteachers.com/store/the-flowroom

The Winter Pack includes:
14+ black-and-white, print-ready pages
line and shape practice
simple SEL prompts
short, focused activities designed to support attention and fine-motor control

At Flowroom, we’re engineers and developers who are also teachers and parents. We’re building tools that help children practice how they use their attention in a world that is increasingly designed to fragment it.

No subscriptions. No auto-renew. No fine print.
We’ll only use your email to:
- send you Flowroom resources as they become available, and
- occasionally invite you to share feedback, if you’re willing.

If you do try the Winter Pack, we’d be genuinely grateful for your thoughts. A quick note about what worked (or didn’t) helps us shape the next round of Class Flow sessions with real classrooms in mind.

With appreciation,
The Flowroom Team
info@flowroom.art`;

    const html = `
      <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111827;">
        <p>Hi There,</p>

        <p>
          Here is your personal promo code for complimentary access to the
          <strong>Flowroom Winter Pack – Class Flow edition</strong> on Teachers Pay Teachers:
        </p>

        <p style="padding: 12px 16px; background-color: #F9FAFB; border-radius: 8px; border: 1px solid #E5E7EB; display: inline-block;">
          <strong>Promo code:</strong>
          <span style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; background:#111827; color:#F9FAFB; padding:4px 8px; border-radius:4px; margin-left:4px;">
            ${WINTER_PACK_PROMO_CODE}
          </span>
          <br />
          <strong>Access link:</strong>
          <a href="https://www.teacherspayteachers.com/store/the-flowroom" style="color:#2563EB; text-decoration:underline;">
            https://www.teacherspayteachers.com/store/the-flowroom
          </a>
        </p>

        <h2 style="margin-top: 24px; margin-bottom: 8px; font-size: 16px;">The Winter Pack includes:</h2>
        <ul style="margin: 0 0 16px 20px; padding: 0;">
          <li>14+ black-and-white, print-ready pages</li>
          <li>line and shape practice</li>
          <li>simple SEL prompts</li>
          <li>short, focused activities designed to support attention and fine-motor control</li>
        </ul>

        <p>
          At Flowroom, we’re engineers and developers who are also teachers and parents.
          We’re building tools that help children practice how they use their attention in a world
          that is increasingly designed to fragment it.
        </p>

        <p><strong>No subscriptions. No auto-renew. No fine print.</strong></p>
        <p>We’ll only use your email to:</p>
        <ul style="margin: 0 0 16px 20px; padding: 0;">
          <li>send you Flowroom resources as they become available, and</li>
          <li>occasionally invite you to share feedback, if you’re willing.</li>
        </ul>

        <p>
          If you do try the Winter Pack, we’d be genuinely grateful for your thoughts.
          A quick note about what worked (or didn’t) helps us shape the next round of
          Class Flow sessions with real classrooms in mind.
        </p>

        <p style="margin-top: 24px;">
          With appreciation,<br />
          <strong>The Flowroom Team</strong><br />
          <a href="mailto:info@flowroom.art" style="color:#2563EB; text-decoration:underline;">info@flowroom.art</a>
        </p>
      </div>
    `;

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, text, html })
      });
    } catch (error) {
      console.error('Failed to send Winter Pack email (home page)', error);
    }
  };

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

  // Handle window click - fade out page and show brand moment
  const handleWindowClick = () => {
    const mainContent = document.querySelector('.main-content') as HTMLElement;

    // Start fading out the page
    setIsScreenDark(true);
    if (mainContent) {
      mainContent.style.transition = 'opacity 2s ease-out';
      mainContent.style.opacity = '0';
    }

    // Show brand moment text after fade completes and a few seconds
    setTimeout(() => {
      // Show brand moment text after a few seconds
      setTimeout(() => {
        setShowBrandMoment(true);
      }, 3000); // Show text 3 seconds after screen goes black
    }, 2000); // Wait for fade to complete (2 seconds)
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

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .insert([{ email: trimmedEmail.toLowerCase() }]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          showLucyNotification(
            'You are already subscribed! We will notify you when the next session begins.'
          );
          // Best-effort: send / resend Winter Pack email for already subscribed users
          await sendWinterPackEmail(trimmedEmail.toLowerCase());
          setEmail('');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        showLucyNotification('Thank you! We will notify you when the next flow session begins.');
        // Send confirmation Winter Pack email
        await sendWinterPackEmail(trimmedEmail.toLowerCase());
        setEmail('');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle back to page button click
  const handleBackToPage = () => {
    // Hide brand moment modal
    setShowBrandMoment(false);

    // Restore page
    restorePagePosition();
  };

  // Custom notification with Lucy
  const showLucyNotification = (message: string) => {
    setShowLucyBackdrop(true);
    toast.custom(
      (t: Toast) => {
        // Update backdrop visibility based on toast visibility
        if (t.visible) {
          setShowLucyBackdrop(true);
        } else {
          setTimeout(() => setShowLucyBackdrop(false), 500);
        }
        return (
          <div
            className={`${
              t.visible ? 'animate-slide-in-right' : 'animate-slide-out-right'
            } fixed bottom-0 right-6 flex items-end gap-0 transition-all duration-500 ease-out`}
            style={{ zIndex: 9999 }}
          >
            {/* Speech bubble - positioned to the left of Lucy */}
            <div className='relative mb-[140px] mr-[-10px] bg-black/95 border-2 border-[#ffda17] rounded-xl px-4 py-3 shadow-2xl max-w-xs z-10'>
              <p className='text-[#ffda17] font-semibold text-sm md:text-base leading-relaxed'>
                {message}
              </p>
              {/* Speech bubble tail pointing to Lucy - centered on right side, pointing right */}
              <div className='absolute top-1/2 right-[-10px] -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-[#ffda17]'></div>
              <div className='absolute top-1/2 right-[-8px] -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[9px] border-l-black/95'></div>
              {/* Close button */}
              <button
                onClick={() => toast.dismiss(t.id)}
                className='absolute -top-2 -right-2 text-[#ffda17] hover:text-[#ffed4e] transition-colors text-xl leading-none w-6 h-6 flex items-center justify-center rounded-full bg-black border border-[#ffda17] hover:bg-[#ffda17]/10'
                aria-label='Close notification'
              >
                ×
              </button>
            </div>
            {/* Lucy - larger, attached to bottom */}
            <div className='relative mb-[-16px]' style={{ lineHeight: 0 }}>
              <Image
                src='/images/lucy-hi.png'
                alt='Lucy'
                width={180}
                height={180}
                className='object-contain object-bottom block'
                style={{ display: 'block' }}
                priority
              />
            </div>
          </div>
        );
      },
      {
        duration: 10000,
        position: 'bottom-right'
      }
    );
  };

  // Memoize SplashCursor to prevent re-renders
  const cursorComponent = useMemo(() => <SplashCursor />, []);

  return (
    <>
      {/* Dimmed backdrop for Lucy notification - reduces distraction */}
      {showLucyBackdrop && (
        <div
          className='fixed inset-0 bg-black/60 transition-opacity duration-500 pointer-events-auto'
          style={{ zIndex: 9998 }}
          onClick={() => {
            setShowLucyBackdrop(false);
            toast.dismiss();
          }}
        />
      )}
      {/* Brand Moment Modal */}
      {showBrandMoment && (
        <div className='fixed inset-0 z-[200] flex items-center justify-center bg-black modal-backdrop'>
          <div className='relative bg-black/95 border border-gray-700/50 rounded-xl p-8 md:p-10 max-w-2xl w-full mx-4 shadow-2xl modal-appear'>
            <div className='text-center space-y-6'>
              <p className='text-white text-base md:text-lg leading-relaxed font-normal max-w-xl mx-auto'>
                What you're hearing is a low-complexity instrumental soundscape built around a
                stable tempo and repetitive rhythmic patterns. This structure is designed to support
                neural activity in the upper-alpha and low-beta bands within frontal–parietal
                attention networks. These are states associated with calm, alert focus.
              </p>
              <button
                onClick={handleBackToPage}
                className='px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95 
                  bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30 active:bg-[#ffd700]'
              >
                Back to the page
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Dark overlay */}
      {isScreenDark && (
        <div className='fixed inset-0 bg-black z-[150] pointer-events-none dark-overlay'></div>
      )}
      <div className='main-content relative min-h-screen overflow-hidden w-full   bg-black py-4'>
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
              } absolute left-1/2 -translate-x-1/2 w-full md:max-w-[140px] max-w-[120px] h-1/2 cursor-pointer group`}
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
        <div className='relative z-10 flex h-full flex-col items-center  px-4 mt-36 md:mt-40  mb-24 md:mb-0'>
          <div className='title-container mb-5 flex flex-col items-center'>
            <span className='text-yellow-300 text-5xl font-bold tracking-wide drop-shadow-lg uppercase'>
              FLOWROOM
            </span>
            <span className='text-[#fdfbb4] text-xl font-bold tracking-wide drop-shadow-lg uppercase'>
              COMING SOON
            </span>
          </div>
          {/* Gallery */}
          <div className='gallery-container grid sm:grid-cols-4 grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-lg '>
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
              const isFirstItem = activeItem === 1;
              return (
                <p
                  className={`font-bold text-lg md:text-base lg:text-2xl text-[#ffda17] drop-shadow-lg opacity-100 ${
                    !isFirstItem ? 'uppercase' : ''
                  }`}
                >
                  {displayText}
                </p>
              );
            })()}
          </div>

          {/* Email subscription form */}
          <div className='email-form-container mt-4 flex flex-col items-center gap-4'>
            <span className='text-[#ffda17] text-sm md:text-base lg:text-lg drop-shadow-lg text-center transition-opacity duration-300'>
              Neuro-art lesson packs that help kids practice focus in today’s distracted world.
            </span>
            {/* <p className='text-[#ffda17] text-sm md:text-base lg:text-lg drop-shadow-lg text-center transition-opacity duration-300'>
              I’d Like to Learn More.
            </p> */}
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
            <p className='text-[#ffda17] text-xs md:text-sm text-center mt-2'>
              <a
                href='mailto:info@flowroom.art'
                className='text-[#ffda17] hover:text-yellow-400 transition-colors duration-300 underline underline-offset-2'
              >
                info@flowroom.art
              </a>{' '}
              for general inquiries
            </p>
            <Link
              href='/early-access'
              className='text-[#ffda17] text-xs md:text-sm hover:text-yellow-400 transition-colors duration-300 mt-2 underline underline-offset-2'
            >
              Early Access →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

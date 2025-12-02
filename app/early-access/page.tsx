'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import SplashCursor from '../../components/SplashCursor';
import { supabase } from '../../lib/supabase/client';

export default function EarlyAccessPage() {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Memoize SplashCursor to prevent re-renders
  const cursorComponent = useMemo(() => <SplashCursor />, []);

  // Custom notification with Lucy
  const showLucyNotification = (message: string) => {
    toast.custom(
      (t: Toast) => (
        <div
          className={`${
            t.visible ? 'animate-slide-in-right' : 'animate-slide-out-right'
          } fixed bottom-0 right-6 z-[9999] flex items-end gap-0 transition-all duration-500 ease-out`}
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
      ),
      {
        duration: 10000,
        position: 'bottom-right'
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!name || name.trim().length === 0) {
      toast.error('Please enter your name');
      return;
    }

    if (!role) {
      toast.error('Please select your role');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('early_access').insert([
        {
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: role
        }
      ]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          showLucyNotification('You are already registered! Check your email for your promo code.');
          setEmail('');
          setName('');
          setRole('');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        showLucyNotification('Thank you! Check your email for your promo code.');
        setEmail('');
        setName('');
        setRole('');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-black relative overflow-hidden'>
      {cursorComponent}

      {/* City image at the bottom - full width */}
      <div className='absolute md:bottom-[-5vh] bottom-0 left-0 right-0 w-screen h-1/2 z-0'>
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

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen p-4 py-8 md:py-12'>
        {/* FLOWROOM title */}
        <div className='mb-8 md:mb-12 flex flex-col items-center'>
          <Link
            href='/'
            className='text-yellow-300 text-5xl font-bold tracking-wide drop-shadow-lg uppercase hover:text-yellow-400 transition-colors duration-300 cursor-pointer'
          >
            FLOWROOM
          </Link>
        </div>

        {/* Header and Value hits - outside modal */}
        <div className='w-full max-w-xl mb-8 md:mb-12 text-center'>
          <h1 className='text-2xl md:text-3xl font-semibold text-white mb-6 md:mb-8'>
            Flowroom Winter Pack – Early Access
          </h1>

          {/* Value hits */}
          <div className='space-y-4 text-gray-300 text-sm md:text-base max-w-lg mx-auto '>
            <p className='flex items-center justify-center md:justify-center'>
              <span>Built by teachers, engineers, and a brain-science-obsessed team</span>
            </p>
            <p className='flex items-center justify-center md:justify-center'>
              <span>14+ print-ready pages for lines, shapes, SEL, and focus</span>
            </p>
          </div>
        </div>

        {/* Modal with form */}
        <div className='relative bg-black/95 border border-gray-700/50 rounded-xl p-8 md:p-10 max-w-xl w-full shadow-2xl'>
          {/* CTA Block */}
          <div className='mb-6'>
            <p className='text-white text-base md:text-2xl font-semibold mb-2 text-center'>
              Early Access
            </p>
            <p className='text-gray-300 text-sm md:text-base leading-relaxed text-center'>
              Enter your email and to receive your Promo code for your free download.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email field */}
            <div>
              <label htmlFor='email' className='block text-gray-300 text-sm mb-2'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter your email'
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 focus:border-[#ffda17]/50
                transition-all duration-300 ease-in-out rounded-lg
                ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-gray-500 focus:bg-white/10'
                }`}
              />
            </div>

            {/* Name field */}
            <div>
              <label htmlFor='name' className='block text-gray-300 text-sm mb-2'>
                Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter your name'
                required
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 
                focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 focus:border-[#ffda17]/50
                transition-all duration-300 ease-in-out rounded-lg
                ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-gray-500 focus:bg-white/10'
                }`}
              />
            </div>

            {/* Role field */}
            <div>
              <label htmlFor='role' className='block text-gray-300 text-sm mb-2'>
                Role
              </label>
              <select
                id='role'
                value={role}
                onChange={e => setRole(e.target.value)}
                required
                disabled={isSubmitting}
                className={`w-full pl-4 pr-10 py-3 bg-white/5 border border-gray-600/50 text-white
                focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 focus:border-[#ffda17]/50
                transition-all duration-300 ease-in-out rounded-lg
                ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-gray-500 focus:bg-white/10 cursor-pointer'
                }`}
              >
                <option value='' className='bg-black text-gray-500'>
                  Select your role
                </option>
                <option value='Teacher' className='bg-black text-white'>
                  Teacher
                </option>
                <option value='Admin' className='bg-black text-white'>
                  Admin
                </option>
                <option value='Support' className='bg-black text-white'>
                  Support
                </option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className={`w-full px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
              transition-all duration-300 ease-in-out
              transform hover:scale-105 active:scale-95 
              ${
                isSubmitting
                  ? 'bg-gray-700/50 text-gray-400 cursor-wait'
                  : !email || !name || !role
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed'
                  : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30 active:bg-[#ffd700]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Early Access'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import toast, { Toast } from 'react-hot-toast';
import SplashCursor from '../../components/SplashCursor';
import { supabase } from '../../lib/supabase/client';
import { isValidEmail } from '../../lib/utils/email';

// Countries list for dropdown
const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Portugal',
  'Ireland',
  'Greece',
  'Czech Republic',
  'Hungary',
  'Romania',
  'Bulgaria',
  'Croatia',
  'Slovakia',
  'Slovenia',
  'Estonia',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Cyprus',
  'Japan',
  'South Korea',
  'China',
  'India',
  'Singapore',
  'Malaysia',
  'Thailand',
  'Indonesia',
  'Philippines',
  'Vietnam',
  'New Zealand',
  'South Africa',
  'Brazil',
  'Argentina',
  'Mexico',
  'Chile',
  'Colombia',
  'Peru',
  'Uruguay',
  'Ecuador',
  'Venezuela',
  'Costa Rica',
  'Panama',
  'Guatemala',
  'Honduras',
  'El Salvador',
  'Nicaragua',
  'Dominican Republic',
  'Jamaica',
  'Trinidad and Tobago',
  'Barbados',
  'Bahamas',
  'Belize',
  'Guyana',
  'Suriname',
  'Paraguay',
  'Bolivia',
  'Israel',
  'United Arab Emirates',
  'Saudi Arabia',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Jordan',
  'Lebanon',
  'Turkey',
  'Egypt',
  'Morocco',
  'Tunisia',
  'Algeria',
  'Kenya',
  'Nigeria',
  'Ghana',
  'Senegal',
  'Tanzania',
  'Uganda',
  'Ethiopia',
  'Rwanda',
  'Mauritius',
  'Seychelles',
  'Botswana',
  'Namibia',
  'Zimbabwe',
  'Zambia',
  'Malawi',
  'Mozambique',
  'Angola',
  'Madagascar',
  'Cameroon',
  'Ivory Coast',
  'Mali',
  'Burkina Faso',
  'Niger',
  'Chad',
  'Sudan',
  'Russia',
  'Ukraine',
  'Belarus',
  'Moldova',
  'Georgia',
  'Armenia',
  'Azerbaijan',
  'Kazakhstan',
  'Uzbekistan',
  'Kyrgyzstan',
  'Tajikistan',
  'Turkmenistan',
  'Mongolia',
  'Afghanistan',
  'Pakistan',
  'Bangladesh',
  'Sri Lanka',
  'Nepal',
  'Bhutan',
  'Myanmar',
  'Cambodia',
  'Laos',
  'Brunei',
  'Papua New Guinea',
  'Fiji',
  'Samoa',
  'Tonga',
  'Vanuatu',
  'Solomon Islands',
  'Palau',
  'Micronesia',
  'Marshall Islands',
  'Other'
];

type ModalStep =
  | null
  | 'modal01'
  | 'modal02T'
  | 'modal02G'
  | 'modal03G'
  | 'modal04G'
  | 'modal05G'
  | 'modal06P'
  | 'other_explanation'
  | 'other_thankyou';

type UserCategory = 'classroom_teacher' | 'school_staff' | 'parent' | 'both' | 'other' | '';

export default function EarlyAccessPage() {
  const [currentModal, setCurrentModal] = useState<ModalStep>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showLucyBackdrop, setShowLucyBackdrop] = useState<boolean>(false);

  // Original form data
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');

  // Learn more form data
  const [userCategory, setUserCategory] = useState<UserCategory>('');
  const [otherExplanation, setOtherExplanation] = useState<string>('');

  // Teacher form data
  const [teacherQ2, setTeacherQ2] = useState<string>('');
  const [teacherQ2Other, setTeacherQ2Other] = useState<string>('');
  const [teacherQ3, setTeacherQ3] = useState<string>('');
  const [teacherQ4, setTeacherQ4] = useState<string>('');
  const [teacherQ4b, setTeacherQ4b] = useState<string>('');
  const [teacherEmail, setTeacherEmail] = useState<string>('');

  // Guardian/Parent form data
  const [guardianQ2, setGuardianQ2] = useState<string[]>([]);
  const [guardianQ2Other, setGuardianQ2Other] = useState<string>('');
  const [guardianQ3, setGuardianQ3] = useState<string>('');
  const [guardianCountry, setGuardianCountry] = useState<string>('');
  const [guardianQ4, setGuardianQ4] = useState<string>('');
  const [guardianQ5, setGuardianQ5] = useState<string>('');
  const [guardianEmail, setGuardianEmail] = useState<string>('');

  // Memoize SplashCursor to prevent re-renders
  const cursorComponent = useMemo(() => <SplashCursor />, []);

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
      console.error('Failed to send Winter Pack email', error);
    }
  };

  // Custom notification with Lucy
  const showLucyNotification = (message: string) => {
    setShowLucyBackdrop(true);
    toast.custom(
      (t: Toast) => {
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
            <div className='relative mb-[140px] mr-[-10px] bg-black/95 border-2 border-[#ffda17] rounded-xl px-4 py-3 shadow-2xl max-w-xs z-10'>
              <p className='text-[#ffda17] font-semibold text-sm md:text-base leading-relaxed'>
                {message}
              </p>
              <div className='absolute top-1/2 right-[-10px] -translate-y-1/2 w-0 h-0 border-t-10 border-t-transparent border-b-10 border-b-transparent border-l-10 border-l-[#ffda17]'></div>
              <div className='absolute top-1/2 right-[-8px] -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[9px] border-l-black/95'></div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className='absolute -top-2 -right-2 text-[#ffda17] hover:text-[#ffed4e] transition-colors text-xl leading-none w-6 h-6 flex items-center justify-center rounded-full bg-black border border-[#ffda17] hover:bg-[#ffda17]/10'
                aria-label='Close notification'
              >
                ×
              </button>
            </div>
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

  const handleLearnMoreClick = () => {
    // Reset all form states when opening modal
    setUserCategory('');
    setOtherExplanation('');
    setTeacherQ2('');
    setTeacherQ2Other('');
    setTeacherQ3('');
    setTeacherQ4('');
    setTeacherQ4b('');
    setTeacherEmail('');
    setGuardianQ2([]);
    setGuardianQ2Other('');
    setGuardianQ3('');
    setGuardianCountry('');
    setGuardianQ4('');
    setGuardianQ5('');
    setGuardianEmail('');
    setCurrentModal('modal01');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
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
          email: trimmedEmail.toLowerCase(),
          name: name.trim(),
          role: role
        }
      ]);

      if (error) {
        // If error is due to duplicate email, treat as success
        if (error.code === '23505') {
          showLucyNotification('You are already registered! Check your email for your promo code.');
          // Best-effort: resend Winter Pack email for already registered users
          await sendWinterPackEmail(trimmedEmail.toLowerCase());
          setEmail('');
          setName('');
          setRole('');
        } else {
          toast.error('Something went wrong. Please try again later.');
        }
      } else {
        showLucyNotification('Thank you! Check your email for your promo code.');
        // Send early access confirmation email with Winter Pack promo code
        await sendWinterPackEmail(trimmedEmail.toLowerCase());
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

  const handleCategorySelect = (category: UserCategory) => {
    setUserCategory(category);

    if (category === 'other') {
      setCurrentModal('other_explanation');
    } else if (category === 'classroom_teacher' || category === 'school_staff') {
      setCurrentModal('modal02T');
    } else if (category === 'parent' || category === 'both') {
      setCurrentModal('modal02G');
    }
  };

  const handleOtherSubmit = async () => {
    if (!otherExplanation.trim()) {
      toast.error('Please explain your selection');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('learn_more_submissions').insert([
        {
          user_category: 'other',
          other_explanation: otherExplanation.trim(),
          flow_type: 'other'
        }
      ]);

      if (error) {
        toast.error('Something went wrong. Please try again.');
      } else {
        setCurrentModal('other_thankyou');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTeacherFlow = async () => {
    if (!teacherQ2 || !teacherQ3 || !teacherQ4) {
      toast.error('Please answer all required questions');
      return;
    }

    if (teacherQ2 === 'something_else' && !teacherQ2Other.trim()) {
      toast.error('Please provide details for "Something else"');
      return;
    }

    if (teacherQ4 !== 'yes_works_most_days' && !teacherQ4b) {
      toast.error('Please answer the follow-up question');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('learn_more_submissions').insert([
        {
          user_category: userCategory,
          flow_type: 'teacher',
          teacher_q2: teacherQ2,
          teacher_q2_other: teacherQ2 === 'something_else' ? teacherQ2Other : null,
          teacher_q3: teacherQ3,
          teacher_q4: teacherQ4,
          teacher_q4b: teacherQ4 !== 'yes_works_most_days' ? teacherQ4b : null,
          email: teacherEmail.trim().toLowerCase() || null
        }
      ]);

      if (error) {
        if (error.code === '23505') {
          showLucyNotification('Email already registered! Check your email for your promo code.');
          // Best-effort: resend Winter Pack email if teacher provided an email
          const trimmedTeacherEmail = teacherEmail.trim().toLowerCase();
          if (trimmedTeacherEmail && isValidEmail(trimmedTeacherEmail)) {
            await sendWinterPackEmail(trimmedTeacherEmail);
          }
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        showLucyNotification('Thank you! Check your email for your promo code.');
        // Teacher confirmation email with Winter Pack promo code (if email was provided)
        const trimmedTeacherEmail = teacherEmail.trim().toLowerCase();
        if (trimmedTeacherEmail && isValidEmail(trimmedTeacherEmail)) {
          await sendWinterPackEmail(trimmedTeacherEmail);
        }
        setCurrentModal(null);
        // Reset form
        setTeacherQ2('');
        setTeacherQ2Other('');
        setTeacherQ3('');
        setTeacherQ4('');
        setTeacherQ4b('');
        setTeacherEmail('');
        setUserCategory('');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuardianFlowStep3 = () => {
    // Validate Q2
    if (!guardianQ2.length) {
      toast.error('Please select at least one option for Q2');
      return;
    }
    if (guardianQ2.includes('something_else') && !guardianQ2Other.trim()) {
      toast.error('Please provide details for "Something else"');
      return;
    }
    // Validate Q3
    if (!guardianQ3.trim()) {
      toast.error('Please answer Q3');
      return;
    }
    setCurrentModal('modal04G');
  };

  const handleGuardianFlowStep4 = () => {
    if (!guardianEmail.trim() || !isValidEmail(guardianEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setCurrentModal('modal05G');
  };

  const handleGuardianFlowStep5 = async () => {
    if (!guardianQ4.trim() || !guardianQ5.trim()) {
      toast.error('Please answer both questions');
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if email already exists
      const { data: existingData } = await supabase
        .from('learn_more_submissions')
        .select('id')
        .eq('email', guardianEmail.trim().toLowerCase())
        .single();

      let error;
      if (existingData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('learn_more_submissions')
          .update({
            user_category: userCategory,
            flow_type: 'guardian',
            guardian_q2: guardianQ2.join(','),
            guardian_q2_other: guardianQ2.includes('something_else') ? guardianQ2Other : null,
            guardian_q3: guardianQ3,
            guardian_q4: guardianQ4.trim(),
            guardian_q5: guardianQ5.trim(),
            country: guardianCountry || null,
            email: guardianEmail.trim().toLowerCase()
          })
          .eq('id', existingData.id);
        error = updateError;
      } else {
        // Insert new record with all data
        const { error: insertError } = await supabase.from('learn_more_submissions').insert([
          {
            user_category: userCategory,
            flow_type: 'guardian',
            guardian_q2: guardianQ2.join(','),
            guardian_q2_other: guardianQ2.includes('something_else') ? guardianQ2Other : null,
            guardian_q3: guardianQ3,
            guardian_q4: guardianQ4.trim(),
            guardian_q5: guardianQ5.trim(),
            country: guardianCountry || null,
            email: guardianEmail.trim().toLowerCase()
          }
        ]);
        error = insertError;
      }

      if (error) {
        if (error.code === '23505') {
          showLucyNotification('Email already registered! Check your email for your promo code.');
          // Best-effort guardian duplicate email
          const trimmedGuardianEmail = guardianEmail.trim().toLowerCase();
          if (trimmedGuardianEmail && isValidEmail(trimmedGuardianEmail)) {
            try {
              await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  to: trimmedGuardianEmail,
                  subject: 'You are already on the Flowroom guardian list',
                  text: 'You are already registered for Flowroom guardian updates. Check your inbox for your mini flow session or contact info@flowroom.art if you did not receive it.',
                  html: `<p>You are already registered for <strong>Flowroom</strong> guardian updates.</p><p>Check your inbox for your mini flow session or contact <a href=\"mailto:info@flowroom.art\">info@flowroom.art</a> if you did not receive it.</p>`
                })
              });
            } catch (emailError) {
              console.error('Failed to send guardian duplicate email', emailError);
            }
          }
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } else {
        setCurrentModal('modal06P');
        // Guardian confirmation email
        const trimmedGuardianEmail = guardianEmail.trim().toLowerCase();
        if (trimmedGuardianEmail && isValidEmail(trimmedGuardianEmail)) {
          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                to: trimmedGuardianEmail,
                subject: 'Your mini Flowroom session is on its way',
                text: 'Thank you for sharing your perspective as a guardian. We will email you a mini Flowroom session you can try at home with your child.',
                html: `<p>Thank you for sharing your perspective as a guardian with <strong>Flowroom</strong>.</p><p>We will email you a mini Flowroom session you can try at home with your child.</p>`
              })
            });
          } catch (emailError) {
            console.error('Failed to send guardian confirmation email', emailError);
          }
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderLearnMoreModal = () => {
    if (!currentModal) return null;

    switch (currentModal) {
      case 'modal01':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Wonderful! We'd be delighted to share more.
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed text-center mb-6'>
                To help us provide the most relevant information please tell us which of the
                following best describes you?
              </p>
              <p className='text-white text-lg font-semibold mb-4 text-center'>
                Which best describes you?
              </p>
            </div>
            <div className='space-y-3 mb-6'>
              {[
                { value: 'classroom_teacher', label: 'Classroom teacher' },
                { value: 'school_staff', label: 'School staff / admin' },
                { value: 'parent', label: 'Parent or caregiver' },
                { value: 'both', label: 'Both teacher and parent' },
                { value: 'other', label: 'Other' }
              ].map(option => (
                <label
                  key={option.value}
                  className='flex items-center p-4 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                >
                  <input
                    type='radio'
                    name='category'
                    value={option.value}
                    checked={userCategory === option.value}
                    onChange={() => handleCategorySelect(option.value as UserCategory)}
                    className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                  />
                  <span className='text-white'>{option.label}</span>
                </label>
              ))}
            </div>
            <button
              onClick={() => setCurrentModal(null)}
              className='w-full px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                transition-all duration-300 ease-in-out
                bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
            >
              Close
            </button>
          </div>
        );

      case 'modal02T':
        return (
          <div className='relative max-h-[90vh] overflow-y-auto'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Teacher Questions
              </p>
            </div>
            <div className='space-y-6'>
              {/* Q2 */}
              <div>
                <p className='text-white text-sm md:text-base font-semibold mb-3'>
                  Q2. Which classroom challenge do you feel most responsible for, but least
                  supported to solve?
                </p>
                <div className='space-y-2'>
                  {[
                    {
                      value: 'sustaining_focus',
                      label: 'Sustaining focus without constant redirection'
                    },
                    {
                      value: 'regulating_emotions',
                      label: 'Helping students regulate emotions in real time'
                    },
                    {
                      value: 'low_prep_activities',
                      label: 'Designing low-prep activities that still feel meaningful'
                    },
                    {
                      value: 'mixed_ability',
                      label: 'Supporting mixed ability levels without burning out'
                    },
                    { value: 'something_else', label: 'Something else' }
                  ].map(option => (
                    <label
                      key={option.value}
                      className='flex items-center p-3 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                    >
                      <input
                        type='radio'
                        name='teacherQ2'
                        value={option.value}
                        checked={teacherQ2 === option.value}
                        onChange={e => setTeacherQ2(e.target.value)}
                        className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                      />
                      <span className='text-white text-sm'>{option.label}</span>
                    </label>
                  ))}
                </div>
                {teacherQ2 === 'something_else' && (
                  <input
                    type='text'
                    value={teacherQ2Other}
                    onChange={e => setTeacherQ2Other(e.target.value)}
                    placeholder='Please explain...'
                    className='w-full mt-3 px-4 py-2 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50'
                  />
                )}
              </div>

              {/* Q3 */}
              <div>
                <p className='text-white text-sm md:text-base font-semibold mb-3'>
                  Q3. In a typical lesson, how often does classroom energy start to drift?
                </p>
                <div className='space-y-2'>
                  {[
                    { value: 'rarely', label: 'Rarely' },
                    { value: 'sometimes', label: 'Sometimes' },
                    { value: 'often', label: 'Often' },
                    { value: 'multiple_times', label: 'Multiple times per lesson' }
                  ].map(option => (
                    <label
                      key={option.value}
                      className='flex items-center p-3 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                    >
                      <input
                        type='radio'
                        name='teacherQ3'
                        value={option.value}
                        checked={teacherQ3 === option.value}
                        onChange={e => setTeacherQ3(e.target.value)}
                        className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                      />
                      <span className='text-white text-sm'>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4 */}
              <div>
                <p className='text-white text-sm md:text-base font-semibold mb-3'>
                  Q4. Do you have a reliable reset routine that works consistently?
                </p>
                <div className='space-y-2'>
                  {[
                    { value: 'yes_works_most_days', label: 'Yes — and it works most days' },
                    { value: 'sort_of', label: 'Sort of — it works sometimes' },
                    { value: 'no_experimenting', label: "No — I'm still experimenting" },
                    {
                      value: 'no_need_simple',
                      label: 'No — I need something simple and repeatable'
                    }
                  ].map(option => (
                    <label
                      key={option.value}
                      className='flex items-center p-3 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                    >
                      <input
                        type='radio'
                        name='teacherQ4'
                        value={option.value}
                        checked={teacherQ4 === option.value}
                        onChange={e => setTeacherQ4(e.target.value)}
                        className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                      />
                      <span className='text-white text-sm'>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Q4b */}
              {teacherQ4 && teacherQ4 !== 'yes_works_most_days' && (
                <div>
                  <p className='text-white text-sm md:text-base font-semibold mb-3'>
                    Q4b. What's the biggest reason resets don't feel consistent yet?
                  </p>
                  <div className='space-y-2'>
                    {[
                      { value: 'time_cost', label: 'Time cost' },
                      {
                        value: 'works_some_not_others',
                        label: 'Works for some students, not others'
                      },
                      { value: 'hard_to_sustain', label: 'Hard to sustain after the reset' },
                      { value: 'no_simple_structure', label: "I don't have a simple structure" },
                      {
                        value: 'need_natural_tools',
                        label: 'I need tools that feel natural, not performative'
                      }
                    ].map(option => (
                      <label
                        key={option.value}
                        className='flex items-center p-3 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                      >
                        <input
                          type='radio'
                          name='teacherQ4b'
                          value={option.value}
                          checked={teacherQ4b === option.value}
                          onChange={e => setTeacherQ4b(e.target.value)}
                          className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                        />
                        <span className='text-white text-sm'>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Early Access Offer */}
              <div className='bg-[#ffda17]/10 border border-[#ffda17]/30 rounded-lg p-4'>
                <p className='text-white text-sm md:text-base mb-3'>
                  We are providing educators early access to our most popular flow sessions.
                </p>
                <Link
                  href='https://www.teacherspayteachers.com/store/the-flowroom'
                  target='_blank'
                  className='text-[#ffda17] hover:text-[#ffed4e] underline font-semibold'
                >
                  Click Here and receive your free neuro-art lesson packet to test in your next
                  class!
                </Link>
              </div>

              {/* Email */}
              <div>
                <label htmlFor='teacherEmail' className='block text-gray-300 text-sm mb-2'>
                  Email (optional)
                </label>
                <input
                  id='teacherEmail'
                  type='email'
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                  placeholder='Enter your email'
                  disabled={isSubmitting}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50'
                />
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => setCurrentModal('modal01')}
                className='flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
              >
                Back
              </button>
              <button
                onClick={handleTeacherFlow}
                disabled={isSubmitting}
                className={`flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95
                  ${
                    isSubmitting
                      ? 'bg-gray-700/50 text-gray-400 cursor-wait'
                      : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        );

      case 'modal02G':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Kids today are growing up in the most distraction-engineered era in history.
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed mb-4 text-center'>
                Their focus is being pulled in more directions, more often, and at a younger age
                than any previous generation.
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-center'>
                We're building Flowroom to help change that, starting with how kids experience
                learning and understanding the power of attention agency.
              </p>
            </div>
            <button
              onClick={() => setCurrentModal('modal03G')}
              className='w-full px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
            >
              Continue
            </button>
          </div>
        );

      case 'modal03G':
        return (
          <div className='relative max-h-[90vh] overflow-y-auto'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                As a Guardian your input is instrumental to our mission.
              </p>
            </div>
            <div className='space-y-6'>
              {/* Q2 */}
              <div>
                <p className='text-white text-sm md:text-base font-semibold mb-3'>
                  Q2. When it comes to learning at home, what feels hardest right now?
                </p>
                <div className='space-y-2'>
                  {[
                    {
                      value: 'focus_without_reminders',
                      label: 'Getting my child to focus without constant reminders'
                    },
                    {
                      value: 'reducing_screen_time',
                      label: 'Reducing screen time without constant battles'
                    },
                    {
                      value: 'keeping_engaged',
                      label: "Keeping them engaged when they're bored or frustrated"
                    },
                    {
                      value: 'supporting_emotions',
                      label: 'Supporting their emotions (big feelings, confidence, self-esteem)'
                    },
                    {
                      value: 'meaningful_activities',
                      label: "Finding meaningful activities that don't require hours of prep"
                    },
                    { value: 'something_else', label: 'Something else (tell us in a few words)' }
                  ].map(option => (
                    <label
                      key={option.value}
                      className='flex items-center p-3 bg-white/5 border border-gray-600/50 rounded-lg cursor-pointer hover:bg-white/10 transition-colors'
                    >
                      <input
                        type='checkbox'
                        name='guardianQ2'
                        value={option.value}
                        checked={guardianQ2.includes(option.value)}
                        onChange={e => {
                          const value = e.target.value;
                          setGuardianQ2(prev =>
                            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
                          );
                        }}
                        className='mr-3 w-4 h-4 text-[#ffda17] focus:ring-[#ffda17]'
                      />
                      <span className='text-white text-sm'>{option.label}</span>
                    </label>
                  ))}
                </div>
                {guardianQ2.includes('something_else') && (
                  <input
                    type='text'
                    value={guardianQ2Other}
                    onChange={e => setGuardianQ2Other(e.target.value)}
                    placeholder='Please explain...'
                    className='w-full mt-3 px-4 py-2 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50'
                  />
                )}
              </div>

              {/* Q3 */}
              <div>
                <p className='text-white text-sm md:text-base font-semibold mb-3'>
                  Q3. How do you currently solve for this?
                </p>
                <textarea
                  value={guardianQ3}
                  onChange={e => setGuardianQ3(e.target.value)}
                  placeholder='Share your thoughts...'
                  rows={4}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 resize-none'
                />
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => setCurrentModal('modal02G')}
                className='flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
              >
                Back
              </button>
              <button
                onClick={handleGuardianFlowStep3}
                className='flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95
                  bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'modal04G':
        return (
          <div className='relative max-h-[90vh] overflow-y-auto'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Thank you!
              </p>
              <div className='space-y-4 text-gray-300 text-sm md:text-base leading-relaxed'>
                <p>
                  At its core, Flowroom is an exercise for the mind. It is a framework designed to
                  help children practice the mental state of "flow."
                </p>
                <p className='font-semibold text-white'>Flowroom is:</p>
                <ul className='list-disc list-inside space-y-2 ml-4'>
                  <li>a creative focus platform blending art, science, and sound</li>
                  <li>built around short, measurable routines</li>
                  <li>
                    a curated library of lesson packs, organized by age and theme for easy use
                  </li>
                  <li>neuroscience-based, classroom-ready lesson packs</li>
                  <li>
                    made for home and school, with shared tools for parents, teachers, and guardians
                  </li>
                </ul>
                <p className='mt-4'>We've added you to our early access list for parents.</p>
                <p>
                  As a small token of gratitude for being here, showing interest, and frankly for
                  all that you do in helping raise our next generation of bright minds, we'd love to
                  send you a mini Flow session you can try at home with your child. It's simple,
                  print-friendly, and designed to work in 10–15 minutes.
                </p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label htmlFor='guardianEmail' className='block text-gray-300 text-sm mb-2'>
                  Enter email
                </label>
                <input
                  id='guardianEmail'
                  type='email'
                  value={guardianEmail}
                  onChange={e => setGuardianEmail(e.target.value)}
                  placeholder='Enter your email'
                  required
                  disabled={isSubmitting}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50'
                />
              </div>

              <div>
                <label htmlFor='guardianCountry' className='block text-gray-300 text-sm mb-2'>
                  Country / region
                </label>
                <select
                  id='guardianCountry'
                  value={guardianCountry}
                  onChange={e => setGuardianCountry(e.target.value)}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50'
                >
                  <option value='' className='bg-black text-gray-500'>
                    Select country
                  </option>
                  {COUNTRIES.map(country => (
                    <option key={country} value={country} className='bg-black text-white'>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                onClick={() => setCurrentModal('modal03G')}
                className='flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
              >
                Back
              </button>
              <button
                onClick={handleGuardianFlowStep4}
                disabled={isSubmitting}
                className={`flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95
                  ${
                    isSubmitting
                      ? 'bg-gray-700/50 text-gray-400 cursor-wait'
                      : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Continue'}
              </button>
            </div>
          </div>
        );

      case 'modal05G':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Success!
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-center'>
                Keep an eye out for an email from our team within the next 24 hours. And if you have
                any questions or want to reach out and say hey, we'd love to hear from you:{' '}
                <a
                  href='mailto:Guardians@flowroom.art'
                  className='text-[#ffda17] hover:text-[#ffed4e] underline'
                >
                  Guardians@flowroom.art
                </a>
              </p>
              <p className='text-white text-lg font-semibold mb-4 text-center'>
                Before you go.. we have two final silly questions for you:
              </p>
            </div>

            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='guardianQ4'
                  className='block text-white text-sm md:text-base font-semibold mb-3'
                >
                  If you could give your child one 'superpower of the mind,' what would it be?
                </label>
                <textarea
                  id='guardianQ4'
                  value={guardianQ4}
                  onChange={e => setGuardianQ4(e.target.value)}
                  placeholder='Share your thoughts...'
                  rows={3}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 resize-none'
                />
              </div>

              <div>
                <label
                  htmlFor='guardianQ5'
                  className='block text-white text-sm md:text-base font-semibold mb-3'
                >
                  And finally, do you recall which TV show, or cartoon character, or children story
                  was your favorite when you were a child? If so, we'd love to hear about it.
                </label>
                <textarea
                  id='guardianQ5'
                  value={guardianQ5}
                  onChange={e => setGuardianQ5(e.target.value)}
                  placeholder='Share your thoughts...'
                  rows={3}
                  className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 resize-none'
                />
              </div>
            </div>

            <button
              onClick={handleGuardianFlowStep5}
              disabled={isSubmitting || !guardianQ4.trim() || !guardianQ5.trim()}
              className={`w-full mt-6 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                ${
                  isSubmitting || !guardianQ4.trim() || !guardianQ5.trim()
                    ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                    : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
                }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        );

      case 'modal06P':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Stay tuned!
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed text-center'>
                Thank you for your interest in Flowroom. We'll be in touch soon!
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentModal(null);
                // Reset all form data
                setUserCategory('');
                setGuardianQ2([]);
                setGuardianQ2Other('');
                setGuardianQ3('');
                setGuardianCountry('');
                setGuardianQ4('');
                setGuardianQ5('');
                setGuardianEmail('');
              }}
              className='w-full px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95
                  bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
            >
              Close
            </button>
          </div>
        );

      case 'other_explanation':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Please explain
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed mb-6 text-center'>
                Please tell us more about yourself so we can better assist you.
              </p>
            </div>
            <div className='mb-6'>
              <textarea
                value={otherExplanation}
                onChange={e => setOtherExplanation(e.target.value)}
                placeholder='Please explain...'
                rows={5}
                className='w-full px-4 py-3 bg-white/5 border border-gray-600/50 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffda17]/50 resize-none'
              />
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => setCurrentModal('modal01')}
                className='flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  bg-gray-700/30 text-gray-400 hover:bg-gray-700/50'
              >
                Back
              </button>
              <button
                onClick={handleOtherSubmit}
                disabled={isSubmitting || !otherExplanation.trim()}
                className={`flex-1 px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                  transition-all duration-300 ease-in-out
                  transform hover:scale-105 active:scale-95
                  ${
                    isSubmitting || !otherExplanation.trim()
                      ? 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                      : 'bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
                  }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        );

      case 'other_thankyou':
        return (
          <div className='relative'>
            <div className='mb-6'>
              <p className='text-white text-base md:text-2xl font-semibold mb-4 text-center'>
                Thank you!
              </p>
              <p className='text-gray-300 text-sm md:text-base leading-relaxed text-center'>
                A Flowroom team member will be in touch! We look forward to connecting!
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentModal(null);
                setUserCategory('');
                setOtherExplanation('');
              }}
              className='w-full px-8 py-3 font-semibold uppercase cursor-pointer rounded-lg
                transition-all duration-300 ease-in-out
                transform hover:scale-105 active:scale-95
                bg-[#ffda17] text-black hover:bg-[#ffed4e] hover:shadow-lg hover:shadow-[#ffda17]/30'
            >
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Dimmed backdrop for Lucy notification */}
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
      <div className='min-h-screen bg-black relative overflow-hidden'>
        {cursorComponent}

        {/* City image at the bottom */}
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

          {/* Header and Value hits */}
          <div className='w-full max-w-xl mb-8 md:mb-12 text-center'>
            <h1 className='text-2xl md:text-3xl font-semibold text-white mb-6 md:mb-8'>
              Flowroom Winter Pack – Early Access
            </h1>

            <div className='space-y-4 text-gray-300 text-sm md:text-base max-w-lg mx-auto'>
              <p className='flex items-center justify-center md:justify-center'>
                <span>Built by teachers, engineers, and a brain-science-obsessed team</span>
              </p>
              <p className='flex items-center justify-center md:justify-center'>
                <span>14+ print-ready pages for lines, shapes, SEL, and focus</span>
              </p>
            </div>
          </div>

          {/* Original Form */}
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

            {/* Learn More Link */}
            <div className='mt-6 pt-6 border-t border-gray-700/50 text-center'>
              <button
                onClick={handleLearnMoreClick}
                className='text-[#ffda17] hover:text-[#ffed4e] transition-colors duration-300 cursor-pointer underline underline-offset-2'
              >
                I'd Like to Learn More
              </button>
            </div>

            <p className='text-gray-400 text-xs md:text-sm text-center mt-4'>
              <a
                href='mailto:info@flowroom.art'
                className='text-[#ffda17] hover:text-yellow-400 transition-colors duration-300 underline underline-offset-2'
              >
                info@flowroom.art
              </a>{' '}
              for general inquiries
            </p>
          </div>

          {/* Learn More Modal Overlay */}
          {currentModal && (
            <>
              {/* Backdrop */}
              <div
                className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4'
                onClick={() => setCurrentModal(null)}
              >
                {/* Modal Content */}
                <div
                  className='relative bg-black/95 border border-gray-700/50 rounded-xl p-8 md:p-10 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto'
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setCurrentModal(null)}
                    className='absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10'
                    aria-label='Close modal'
                  >
                    ×
                  </button>
                  {renderLearnMoreModal()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

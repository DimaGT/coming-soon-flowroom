import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'info@flowroom.art';

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.error('SENDGRID_API_KEY is not set. Email sending will fail.');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, text, html } = body as {
      to?: string;
      subject?: string;
      text?: string;
      html?: string;
    };

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, and text or html are required.' },
        { status: 400 }
      );
    }

    if (!SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured on the server.' },
        { status: 500 }
      );
    }

    await sgMail.send({
      to,
      from: SENDGRID_FROM_EMAIL,
      subject,
      text: text || html || '',
      html: html || text || ''
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email via SendGrid', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, subject, message } = body;

    // Create a transporter with OAuth2
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('Server is ready to take our messages');

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #b45309;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #b45309;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
            This email was sent from the BRIISP Academy contact form.
          </p>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
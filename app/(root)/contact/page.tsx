/* eslint-disable react/no-unescaped-entities */
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Email',
              value: 'briispacademyacademy111@gmail.com',
              icon: Mail,
            },
            {
              title: 'Phone',
              value: '+260 953500666',
              icon: Phone,
            },
            {
              title: 'Location',
              value: 'Meanwood Ndeke Phase 2',
              icon: MapPin,
            },
            {
              title: 'Office Hours',
              value: 'Mon-Fri, 9AM-5PM EST',
              icon: Clock,
            },
          ].map((item) => (
            <Card key={item.title} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10">
                  <item.icon className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <Card className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <ContactForm />
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: 'What are your office hours?',
                answer: 'Our office is open Monday through Friday, from 9:00 AM to 5:00 PM Eastern Time.',
              },
              {
                question: 'How long does it take to get a response?',
                answer: 'We typically respond to all inquiries within 24-48 business hours.',
              },
              {
                question: 'Do you offer campus tours?',
                answer: 'Yes, we offer guided campus tours every Tuesday and Thursday. Please schedule in advance.',
              },
              {
                question: 'How can I apply for admission?',
                answer: 'You can apply for admission through our online application portal or visit our admissions office.',
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
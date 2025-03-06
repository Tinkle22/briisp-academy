'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  Clock,
  ChevronRight,
  Pin,
  AlertCircle,
  Megaphone,
  Calendar as CalendarIcon,
} from 'lucide-react';
import Link from 'next/link';

const notices = [
  {
    id: '1',
    title: 'Prelim Examination Schedule',
    type: 'Academic',
    priority: 'High',
    date: '2024-03-20',
    content: 'The preliminary examinations for all courses will be conducted from March 20-24, 2024. Please check your course dashboard for specific timings.',
 
    isPinned: true,
  },
  {
    id: '2',
    title: 'System Maintenance Notice',
    type: 'Technical',
    priority: 'Medium',
    date: '2024-03-15',
    content: 'The student portal will be undergoing maintenance on March 15th from 2 AM to 5 AM. Some services may be unavailable during this time.',
    icon: AlertCircle,
    isPinned: true,
  },
  {
    id: '3',
    title: 'Guest Lecture Series',
    type: 'Event',
    priority: 'Normal',
    date: '2024-03-18',
    content: 'Join us for a special guest lecture on "Future of AI in Education" by Dr. Emily Watson from Stanford University.',
    icon: Megaphone,
    isPinned: false,
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Career Fair 2024',
    date: '2024-03-25',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Campus Auditorium',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Tech Symposium',
    date: '2024-04-01',
    time: '2:00 PM - 6:00 PM',
    location: 'Virtual Event',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=400&q=80',
  },
];

export default function NoticePage() {
  const [filter, setFilter] = useState('all');

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'Academic', value: 'Academic' },
    { label: 'Technical', value: 'Technical' },
    { label: 'Event', value: 'Event' },
  ];

  const filteredNotices = filter === 'all' 
    ? notices 
    : notices.filter(notice => notice.type === filter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Notice Board</h1>
        <p className="text-muted-foreground mt-2">
          Stay updated with the latest announcements and events
        </p>
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notices Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Announcements</h2>
          <div className="space-y-4">
            {filteredNotices.map((notice) => (
              <Card key={notice.id} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-amber-900">
                    {notice.icon ? <notice.icon className="h-5 w-5 text-amber-600" /> : null}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{notice.title}</h3>
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {notice.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                       
                        <span className="text-xs text-muted-foreground">
                          {new Date(notice.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="space-y-6">

          {/* Quick Links */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/calendar">Academic Calendar</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/archive">Notice Archive</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
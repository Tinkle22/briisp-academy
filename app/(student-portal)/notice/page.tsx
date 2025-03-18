'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Bell,
  ChevronRight,
  Pin,
  AlertCircle,
  Megaphone,
  Calendar as CalendarIcon,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

// Type for our notice
interface Notice {
  notice_id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  publish_date: string;
  expiry_date: string | null;
  is_active: boolean;
  author: string | null;
}

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filterButtons = [
    { label: 'All', value: 'all' },
    { label: 'High Priority', value: 'high' },
    { label: 'Medium Priority', value: 'medium' },
    { label: 'Low Priority', value: 'low' },
  ];

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notices');
        if (!response.ok) throw new Error('Failed to fetch notices');
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load notices');
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = filter === 'all'
    ? notices
    : notices.filter(notice => notice.priority === filter);

  const getIconForPriority = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'medium':
        return <Bell className="h-5 w-5 text-amber-600" />;
      case 'low':
        return <Megaphone className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-amber-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-600 mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading notices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-amber-900">Notice Board</h1>
        <p className="text-amber-700 mt-2">
          Stay updated with the latest announcements and events
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            variant={filter === button.value ? "default" : "outline"}
            onClick={() => setFilter(button.value)}
            className={`${
              filter === button.value 
                ? "bg-amber-600 hover:bg-amber-700" 
                : "text-amber-600 hover:bg-amber-50"
            }`}
          >
            {button.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notices Section */}
        <div className="lg:col-span-2 space-y-6">
          {filteredNotices.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p>No notices found for the selected filter.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <Card key={notice.notice_id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      notice.priority === 'high' ? 'bg-red-100' :
                      notice.priority === 'medium' ? 'bg-amber-100' :
                      'bg-green-100'
                    }`}>
                      {getIconForPriority(notice.priority)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{notice.title}</h3>
                        {notice.expiry_date && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            Expires: {new Date(notice.expiry_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {notice.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          Published: {new Date(notice.publish_date).toLocaleDateString()}
                        </span>
                        {notice.author && (
                          <span>By: {notice.author}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Section */}
        <div className="space-y-6">
          <Card className="p-6 bg-amber-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-amber-600" />
              Quick Links
            </h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/calendar">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Academic Calendar
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/archive">
                  <Bell className="h-4 w-4 mr-2" />
                  Notice Archive
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
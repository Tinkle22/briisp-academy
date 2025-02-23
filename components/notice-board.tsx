"use client"

import React, { useEffect, useState } from 'react';

interface Notice {
  publish_date: string;
  title: string;
  description: string;
  // add any additional properties as needed
}

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch('/api/notices');
      const data = await response.json();
      setNotices(data);
    };

    fetchNotices();
  }, []);

  return (
    <div className="space-y-4">
      {notices.map((notice, index) => (
        <div 
          key={index} 
          className="border-b pb-4 last:border-b-0 last:pb-0 transition-all duration-300 hover:bg-muted/50"
        >
          <time className="text-sm text-amber-600 font-medium">
            {new Date(notice.publish_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <h3 className="font-medium mt-1">{notice.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{notice.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NoticeBoard;
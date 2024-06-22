import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const ScreenshotsPage: React.FC = () => {
  const [screenshots, setScreenshots] = useState<{ name: string; base64: string }[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:4000');

    const fetchScreenshots = async () => {
      try {
        const response = await fetch('/api/screenshots');

        if (response.ok) {
          const data = await response.json();
          setScreenshots(sortByDate(data));
        } else {
          console.error('Failed to fetch screenshots');
        }
      } catch (error) {
        console.error('Error fetching screenshots:', error);
      }
    };

    socket.on('latestScreenshot', (data) => {
      setScreenshots((screenshots) => sortByDate([...screenshots, data]));
    });


    fetchScreenshots(); // Fetch screenshots initially on component mount

    return () => {
      socket.disconnect();
    };
  }, []);

  const sortByDate = (screenshots: { name: string; base64: string }[]) =>{
    return screenshots.sort((a: any, b: any) => {
      const dateA = extractTimestamp(a.name, false) as number;
      const dateB = extractTimestamp(b.name, false) as number;
      return dateB - dateA; // Descending order (newest to oldest)
    }
  )};

  const extractTimestamp = (name: string, toLocale = true) => {
    const match = name.match(/screenshot-(.*).png/);
    const date = match ? match[1] : '';
    if (toLocale) {
      return new Date(date).toLocaleString();
    } else {
      return new Date(date).getTime();
    }
  };

  return (
    <div>
      <h1>All Screenshots</h1>
      <div>
        {screenshots.map((screenshot, index) => (
          <div key={index}>
            <h2>{extractTimestamp(screenshot.name)}</h2>
            <img src={screenshot.base64} alt={screenshot.name} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenshotsPage;

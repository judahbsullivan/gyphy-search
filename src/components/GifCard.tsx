'use client';

import { useState } from 'react';
import { GifData } from '@/utils/api';

interface GifCardProps {
    gif: GifData;
}

export default function GifCard({ gif }: GifCardProps) {
    const [copied, setCopied] = useState(false);
    const videoUrl = gif.images.fixed_height.mp4;
    const originalUrl = gif.images.original.url;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(originalUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className="gif-card">
            <div className="video-container">
                <video
                    src={videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="gif-video"
                />
                <div className="gif-overlay">
                    <button
                        onClick={copyToClipboard}
                        className={`copy-button ${copied ? 'copied' : ''}`}
                        title="Copy GIF URL"
                    >
                        {copied ? '✓ Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>
            <div className="gif-info">
                <p className="gif-title">{gif.title || 'Untitled GIF'}</p>
            </div>
        </div>
    );
}

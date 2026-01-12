'use client';

import { useEffect, useState } from 'react';
import { GifData } from '@/utils/api';
import GifGrid from './GifGrid';
import Pagination from './Pagination';

interface Props {
    initialData: GifData[];
    totalCount: number;
    offset: number;
    limit: number;
    query: string;
    error?: string;
}

export default function ResultsContainer({ initialData, totalCount, offset, limit, query, error }: Props) {
    const [gifs, setGifs] = useState<GifData[]>(initialData);
    const isLimit = error === 'API_LIMIT_REACHED';

    useEffect(() => {
        if (!isLimit) {
            setGifs(initialData);
            if (query && initialData.length) localStorage.setItem('last_search', JSON.stringify({ query, data: initialData }));
        } else {
            const cached = JSON.parse(localStorage.getItem('last_search') || '{}');
            if (cached.query === query) setGifs(cached.data);
        }
    }, [initialData, query, isLimit]);

    if (isLimit && !gifs.length) {
        return (
            <div className="error-container">
                <h2>API Limit Reached</h2>
                <p>Please try again in a few minutes.</p>
            </div>
        );
    }

    return (
        <div className="results-wrapper">
            {isLimit && <div className="limit-alert" style={{ background: 'rgba(255, 165, 0, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid orange', textAlign: 'center' }}>
                ⚠️ API Limit reached! Showing cached results.
            </div>}
            <GifGrid gifs={gifs} />
            <Pagination totalCount={totalCount} offset={offset} limit={limit} />
        </div>
    );
}

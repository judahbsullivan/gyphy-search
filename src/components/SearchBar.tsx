'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (query) params.set('q', query), params.set('page', '1');
            else params.delete('q'), params.delete('page');
            router.push(`?${params}`);
        }, 500);
        return () => clearTimeout(timer);
    }, [query, router, searchParams]);

    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search GIFs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
                aria-label="Search GIFs"
            />
            <div className="search-icon">🔍</div>
        </div>
    );
}

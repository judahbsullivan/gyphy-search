'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const isUserTyping = useRef(false);

    useEffect(() => {
        if (!isUserTyping.current) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (query) {
                params.set('q', query);
                params.set('page', '1');
            }
            router.push(`?${params}`);
            isUserTyping.current = false;
        }, 400);

        return () => clearTimeout(timer);
    }, [query, router]);

    useEffect(() => {
        if (!isUserTyping.current) {
            setQuery(searchParams.get('q') || '');
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isUserTyping.current = true;
        setQuery(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Search GIFs..."
                value={query}
                onChange={handleChange}
                className="search-input"
                aria-label="Search GIFs"
            />
            <div className="search-icon">🔍</div>
        </div>
    );
}

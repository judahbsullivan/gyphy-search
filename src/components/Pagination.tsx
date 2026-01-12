'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    totalCount: number;
    offset: number;
    limit: number;
}

export default function Pagination({ totalCount, offset, limit }: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.min(Math.ceil(totalCount / limit), 25); // GIPHY usually limits to 4999 results or so

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="pagination-button"
            >
                Previous
            </button>

            <span className="page-info">
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
}

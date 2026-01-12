import { GifData } from '@/utils/api';
import GifCard from './GifCard';

interface GifGridProps {
    gifs: GifData[];
}

export default function GifGrid({ gifs }: GifGridProps) {
    if (gifs.length === 0) {
        return (
            <div className="no-results">
                <p>No GIFs found. Try another search!</p>
            </div>
        );
    }

    return (
        <div className="gif-grid">
            {gifs.map((gif, index) => (
                <GifCard key={`${gif.id}-${index}`} gif={gif} />
            ))}
        </div>
    );
}

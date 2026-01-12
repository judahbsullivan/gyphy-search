import { fetchGifs, fetchRandomGifs, GifData } from '@/utils/api';
import SearchBar from '@/components/SearchBar';
import ResultsContainer from '@/components/ResultsContainer';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, page?: string }> }) {
  const { q = '', page = '1' } = await searchParams;
  const limit = 20;
  const offset = (parseInt(page) - 1) * limit;

  let gifs: GifData[] = [];
  let totalCount = 0;
  let errorMsg = '';

  try {
    if (!q) {
      gifs = await fetchRandomGifs(3);
      totalCount = 3;
    } else {
      const res = await fetchGifs(q, offset, limit);
      gifs = res.data;
      totalCount = res.pagination.total_count;
    }
  } catch (err: any) {
    errorMsg = err.message;
  }

  return (
    <main>
      <header className="header">
        <h1 className="title">Gyphy Search</h1>
        <p className="subtitle">Find your favorite GIFs in a blink.</p>
      </header>
      <SearchBar />
      <Suspense fallback={<div className="loading">Loading amazing GIFs...</div>}>
        <ResultsContainer
          initialData={gifs}
          totalCount={totalCount}
          offset={offset}
          limit={limit}
          query={q}
          error={errorMsg}
        />
      </Suspense>
    </main>
  );
}

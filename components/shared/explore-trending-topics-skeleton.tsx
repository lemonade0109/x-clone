const ExploreTrendingTopicsSkeleton = () => {
  return (
    <section className="rounded-2xl border border-zinc-200 py-3 dark:border-zinc-800">
      <h2 className="px-4 pb-2 text-xl font-extrabold">
        What&apos;s happening
      </h2>

      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-4 py-3 animate-pulse">
          <div className="h-3 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-2 h-4 w-44 rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </section>
  );
};

export default ExploreTrendingTopicsSkeleton;

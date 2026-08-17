const WhoToFollowSkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between px-4 py-3 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col gap-1.5">
              <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>
          <div className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      ))}
    </>
  );
};

export default WhoToFollowSkeleton;

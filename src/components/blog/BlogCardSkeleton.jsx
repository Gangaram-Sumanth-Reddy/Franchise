function BlogCardSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
      <div className="h-56 w-full bg-slate-200" />
      <div className="space-y-3 px-5 pb-6 pt-4">
        <div className="h-5 w-32 rounded bg-slate-200" />
        <div className="h-6 w-full rounded bg-slate-200" />
        <div className="h-6 w-4/5 rounded bg-slate-200" />
      </div>
    </article>
  );
}

export default BlogCardSkeleton;

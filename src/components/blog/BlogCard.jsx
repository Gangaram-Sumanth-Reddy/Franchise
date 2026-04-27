import { motion } from 'framer-motion';
import { formatDisplayDate } from '../blogData';

function navigateTo(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function BlogCard({ post, priority = false }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(15,23,42,0.14)]"
    >
      <a
        href={`/blog/${post.slug}`}
        onClick={(event) => {
          event.preventDefault();
          navigateTo(`/blog/${post.slug}`);
        }}
        className="block"
      >
        <div className="overflow-hidden">
          <img
            src={post.thumbnail}
            alt={post.title}
            loading={priority ? 'eager' : 'lazy'}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="space-y-3 px-5 pb-6 pt-4">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-medium text-slate-600">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h3
            className="text-2xl font-bold leading-tight text-slate-900"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '3.6rem',
            }}
          >
            {post.title}
          </h3>
        </div>
      </a>
    </motion.article>
  );
}

export default BlogCard;

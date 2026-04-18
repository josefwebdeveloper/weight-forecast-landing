import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogArticles } from './blogData';
import { Banana, ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react';
import { usePageMeta } from '../usePageMeta';

const APP_URL = 'https://weight-forecast.com';
const SITE_URL = 'https://www.weight-forecast.com';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Per-article meta — title/description/canonical/OG all point at this post.
  // When article is missing we still render Navigate below, so keep the hook
  // call unconditional by feeding safe fallbacks.
  usePageMeta({
    title: article
      ? `${article.title} — Weight Forecast Blog`
      : 'Weight Forecast Blog',
    description: article?.metaDescription,
    canonical: article ? `${SITE_URL}/blog/${article.slug}` : `${SITE_URL}/blog`,
    ogType: article ? 'article' : 'website',
    articlePublishedTime: article?.date,
    articleSection: article?.category,
  });

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Find next/prev articles
  const currentIndex = blogArticles.findIndex(a => a.slug === slug);
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Banana className="text-slate-950" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">Weight Forecast</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">
            All Articles
          </Link>
          <a
            href={APP_URL}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 text-slate-950 text-sm"
          >
            Launch App →
          </a>
        </div>
      </nav>

      {/* Article Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/15 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors text-sm mb-8">
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-xs font-medium">
              <Tag size={12} className="inline mr-1" />
              {article.category}
            </span>
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock size={12} />
              {article.readTime}
            </span>
            <span className="text-slate-600 text-xs">{article.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
            {article.title}
          </h1>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <article
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:text-white prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-3
            prose-h3:text-xl prose-h3:text-amber-400 prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-5
            prose-strong:text-white prose-strong:font-semibold
            prose-em:text-amber-300/80
            prose-a:text-amber-400 prose-a:underline prose-a:underline-offset-4
            prose-ul:text-slate-300 prose-ul:space-y-2
            prose-ol:text-slate-300 prose-ol:space-y-2
            prose-li:leading-relaxed
            prose-blockquote:border-amber-500 prose-blockquote:bg-slate-900/50 prose-blockquote:rounded-r-xl prose-blockquote:py-2 prose-blockquote:px-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Inline CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-slate-900/80 to-amber-900/10 text-center">
          <h3 className="text-2xl font-bold mb-3">
            Try it free at <span className="text-amber-400">Weight Forecast</span>
          </h3>
          <p className="text-slate-400 mb-6">No credit card, no subscription, just results.</p>
          <a
            href={APP_URL}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-xl hover:shadow-amber-500/25"
          >
            Let Us Help You (FREE)
            <ArrowRight size={20} />
          </a>
        </div>

        {/* Prev/Next Navigation */}
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {prevArticle && (
            <Link
              to={`/blog/${prevArticle.slug}`}
              className="group p-5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all bg-slate-900/30"
            >
              <span className="text-xs text-slate-500 uppercase tracking-wider">Previous</span>
              <h4 className="text-sm font-semibold mt-2 group-hover:text-amber-400 transition-colors leading-snug">
                {prevArticle.title}
              </h4>
            </Link>
          )}
          {nextArticle && (
            <Link
              to={`/blog/${nextArticle.slug}`}
              className={`group p-5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-all bg-slate-900/30 text-right ${!prevArticle ? 'sm:col-start-2' : ''}`}
            >
              <span className="text-xs text-slate-500 uppercase tracking-wider">Next →</span>
              <h4 className="text-sm font-semibold mt-2 group-hover:text-amber-400 transition-colors leading-snug">
                {nextArticle.title}
              </h4>
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Banana className="text-slate-950" size={18} />
            </div>
            <span className="font-bold">Weight Forecast</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Weight Forecast
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;

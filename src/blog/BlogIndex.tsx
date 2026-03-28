import React from 'react';
import { Link } from 'react-router-dom';
import { blogArticles } from './blogData';
import { Banana, ArrowRight, Clock, Tag, BookOpen } from 'lucide-react';

const APP_URL = 'https://weight-forecast.com';

const BlogIndex: React.FC = () => {
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
          <Link to="/" className="text-slate-400 hover:text-white transition-colors text-sm hidden sm:block">
            Home
          </Link>
          <a
            href={APP_URL}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25 text-slate-950 text-sm"
          >
            Launch App →
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-6">
            <BookOpen size={16} />
            Knowledge Base
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Weight Forecast <span className="text-amber-400">Blog</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Evidence-based articles on AI-powered weight management, nutrition science, and smart fitness tracking.
          </p>
        </div>
      </header>

      {/* Article Grid */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="space-y-6">
          {blogArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="group block p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-amber-500/40 bg-slate-900/30 hover:bg-slate-900/60 transition-all hover:shadow-xl hover:shadow-amber-500/5"
            >
              <div className="flex items-center gap-3 mb-4">
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
              <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-amber-400 transition-colors leading-tight">
                {article.title}
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold group-hover:gap-3 transition-all">
                Read article <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="glass border border-amber-500/20 rounded-2xl p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Ready to see your <span className="text-amber-400">goal date</span>?
            </h2>
            <p className="text-slate-400 mb-6">
              Start tracking for free. AI predicts when you'll reach your goal weight.
            </p>
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 rounded-xl font-bold text-lg text-slate-950 transition-all hover:shadow-xl hover:shadow-amber-500/25"
            >
              Try Weight Forecast Free
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-slate-600 text-sm">
          © {new Date().getFullYear()} Weight Forecast. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default BlogIndex;

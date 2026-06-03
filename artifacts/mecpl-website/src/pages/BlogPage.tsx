import { Link } from "wouter";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { blogPosts } from "./blogData";

export default function BlogPage() {
  return (
    <div data-animate-page className="bg-white pt-20">
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto px-6 pt-6 pb-0">
          <span className="text-[#C41E3A] text-[10px] font-black tracking-widest uppercase block">Articles</span>
          <h1 className="text-5xl font-black tracking-tight uppercase leading-tight text-[#111827]">Latest MECPL Posts</h1>
          <p className="text-[#4b5563] text-sm leading-relaxed">Select a story below to open the full long-form article.</p>
        </div>

        {/* Featured first post */}
        {blogPosts.length > 0 && (
          <article className="group relative overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-sm transition-all hover:border-[#C41E3A]/30 hover:shadow-md">
            <div className="grid md:grid-cols-2">
              <div className="h-72 md:h-auto w-full overflow-hidden">
                <img src={blogPosts[0].heroImage} alt={blogPosts[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-3 text-[9px] uppercase tracking-[0.28em] text-[#6b7280]">
                  <span>{blogPosts[0].publishedDate}</span>
                  <span>{blogPosts[0].category}</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-[#111827] mb-3">{blogPosts[0].title}</h3>
                <p className="text-[#374151] text-base leading-relaxed max-w-3xl">{blogPosts[0].deck}</p>
                <div className="mt-6 flex justify-end">
                  <Link href={`/blog/${blogPosts[0].slug}`} className="inline-flex items-center gap-3 text-[#C41E3A] text-[12px] font-black tracking-[0.25em] uppercase">
                    <span>Read More</span>
                    <FileText size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Remaining posts */}
        <div className="mt-10 space-y-6">
          {blogPosts.slice(1).map((post) => (
            <div key={post.slug} className="flex gap-6 items-start bg-white border border-black/[0.07] rounded-lg p-4 md:p-6 hover:shadow-md hover:border-[#C41E3A]/20 transition-all">
              <img src={post.heroImage} alt={post.title} className="w-36 h-24 object-cover rounded-sm flex-shrink-0" />
              <div className="flex-1">
                <div className="text-[10px] uppercase text-[#6b7280] tracking-widest mb-1">{post.publishedDate} | {post.category}</div>
                <h3 className="text-lg font-black text-[#111827] tracking-tight">{post.title}</h3>
                <p className="text-[#374151] text-sm mt-2">{post.deck}</p>
                <div className="mt-3">
                  <Link href={`/blog/${post.slug}`} className="text-[#C41E3A] text-[12px] font-black uppercase tracking-widest inline-flex items-center gap-2">Read More <FileText size={12} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[28px] border border-black/[0.07] bg-[#f9f9f9] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#C41E3A] text-[10px] font-black tracking-[0.25em] uppercase">
              <Sparkles size={12} /> More to explore
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tight text-[#111827]">More project notes and company updates are on the way</h3>
            <p className="text-[#4b5563] text-sm leading-relaxed">Use the article pages for the full content, or jump to About Us to see how MECPL structures its delivery and service line.</p>
          </div>
          <Link href="/about">
            <span className="inline-flex items-center gap-2 bg-transparent border border-black/[0.15] text-[#111827] px-8 py-4 text-xs font-black tracking-widest uppercase rounded-full transition-colors hover:bg-black/[0.04] cursor-pointer whitespace-nowrap">
              About Us <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Link } from "wouter";
import { ArrowRight, CalendarDays, FileText, Sparkles } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import { blogPosts } from "./blogData";

export default function BlogPage() {
  return (
    <div data-animate-page className="bg-mecpl-dark pt-20">
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-8">
        <SectionHeader label="Articles" title="Latest MECPL Posts" center subtitle="Select a story below to open the full long-form article." />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group relative overflow-hidden rounded-[24px] border border-white/8 bg-mecpl-card min-h-[20rem] shadow-2xl shadow-black/20 transition-colors hover:border-[#C41E3A]/30">
              <img src={post.heroImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-6">
                <div className="flex items-center justify-between gap-4 mb-3 text-[9px] uppercase tracking-[0.28em] text-white/50">
                  <span>{post.publishedDate}</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-white leading-tight">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-300 leading-relaxed">{post.deck}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.highlights.slice(0, 3).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl whitespace-nowrap">
                      {item}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center gap-2 text-[#C41E3A] text-[10px] font-black tracking-[0.25em] uppercase">
                  Read More <FileText size={12} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#C41E3A] text-[10px] font-black tracking-[0.25em] uppercase">
              <Sparkles size={12} /> More to explore
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">More project notes and company updates are on the way</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Use the article pages for the full content, or jump to About Us to see how MECPL structures its delivery and service line.</p>
          </div>
          <Link href="/about">
            <span className="inline-flex items-center gap-2 bg-transparent border border-white/15 text-white px-8 py-4 text-xs font-black tracking-widest uppercase rounded-full transition-colors hover:bg-white/8 cursor-pointer whitespace-nowrap">
              About Us <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

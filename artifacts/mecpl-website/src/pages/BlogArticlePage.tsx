import { ArrowLeft, ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { Link, useRoute } from "wouter";
import SectionHeader from "@/components/SectionHeader";
import { blogPostMap, blogPosts } from "./blogData";

export default function BlogArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = slug ? blogPostMap[slug] : undefined;

  if (!post) {
    return (
      <div className="bg-white pt-28 px-6 min-h-screen text-[#111827]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-black uppercase">Article not found</h3>
          <Link href="/blog" className="inline-flex mt-6 text-[#C41E3A] font-black uppercase tracking-widest text-xs">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length];
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];

  return (
    <div data-animate-page className="bg-white">
      <section className="relative overflow-hidden border-b border-black/[0.06]">
        <div className="absolute inset-0">
          <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover opacity-[0.12]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#6b7280] hover:text-[#111827] text-[10px] font-black tracking-[0.3em] uppercase mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to blog
          </Link>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black tracking-[0.25em] uppercase text-[#6b7280]">
              <span className="inline-flex items-center gap-1.5"><CalendarDays size={12} /> {post.publishedDate}</span>
              <span className="text-[#C41E3A]">{post.category}</span>
              <span>{blogPosts.length} articles</span>
            </div>
            <SectionHeader title={post.title} subtitle={post.deck} center />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[0.7fr_1.3fr] gap-10">
        <aside className="lg:sticky lg:top-28 h-fit space-y-6">
          <div className="rounded-[28px] border border-black/[0.07] bg-[#f9f9f9] p-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-[#C41E3A] text-[10px] font-black tracking-[0.25em] uppercase">
              <Sparkles size={12} /> Article Summary
            </div>
            <p className="text-[#374151] text-sm leading-relaxed">{post.intro}</p>
            <div className="space-y-3">
              <div className="text-[#6b7280] text-[10px] uppercase tracking-[0.25em] font-black">Highlights</div>
              <div className="flex flex-wrap gap-2">
                {post.highlights.map((item) => (
                  <span key={item} className="px-3 py-1.5 rounded-full border border-black/[0.1] text-[#374151] text-[10px] font-bold uppercase tracking-[0.2em]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/[0.07] bg-white p-6">
            <div className="text-[#6b7280] text-[10px] uppercase tracking-[0.25em] font-black mb-3">More Articles</div>
            <div className="space-y-3">
              <Link href={`/blog/${previousPost.slug}`} className="block rounded-2xl border border-black/[0.07] p-4 hover:border-[#C41E3A]/30 transition-colors">
                <div className="text-[#C41E3A] text-[9px] font-black uppercase tracking-[0.25em] mb-1">Previous</div>
                <div className="text-[#111827] text-sm font-black uppercase leading-snug">{previousPost.title}</div>
              </Link>
              <Link href={`/blog/${nextPost.slug}`} className="block rounded-2xl border border-black/[0.07] p-4 hover:border-[#C41E3A]/30 transition-colors">
                <div className="text-[#C41E3A] text-[9px] font-black uppercase tracking-[0.25em] mb-1">Next</div>
                <div className="text-[#111827] text-sm font-black uppercase leading-snug">{nextPost.title}</div>
              </Link>
            </div>
          </div>
        </aside>

        <article className="space-y-8">
          <div className="rounded-[32px] overflow-hidden border border-black/[0.1] shadow-sm">
            <img src={post.heroImage} alt={post.title} className="w-full h-[320px] md:h-[460px] object-cover" />
          </div>

          <div className="space-y-8">
            {post.sections.map((section) => (
              <section key={section.heading} className="rounded-[28px] border border-black/[0.07] bg-white p-6 md:p-8 shadow-sm">
                <h3 className="text-[#111827] text-2xl md:text-3xl font-black uppercase tracking-tight">{section.heading}</h3>
                <div className="mt-4 space-y-4 text-[#374151] text-sm leading-relaxed">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-5 space-y-2 border-t border-black/[0.06] pt-5">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-[#374151] leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C41E3A] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="rounded-[28px] border border-black/[0.07] bg-[#f9f9f9] p-6 md:p-8">
            <div className="text-[#C41E3A] text-[10px] font-black tracking-[0.25em] uppercase mb-3">Closing note</div>
            <p className="text-[#374151] text-sm md:text-base leading-relaxed">{post.closing}</p>
          </section>
        </article>
      </section>
    </div>
  );
}

import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "./blogData";

function parseDate(dateStr: string) {
  if (!dateStr) return { month: '', day: '', year: '' };
  const parts = dateStr.replace(',', '').split(' ');
  return {
    month: parts[0] ? parts[0].substring(0, 3).toUpperCase() : '',
    day: parts[1] ? parts[1].padStart(2, '0') : '',
    year: parts[2] || ''
  };
}

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const archivePosts = blogPosts;

  return (
    <div data-animate-page className="bg-white min-h-screen font-montserrat text-[#111827]">
      {/* Empty State */}
      {blogPosts.length === 0 ? (
        <div className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center min-h-[60vh] flex flex-col items-center justify-center">
          <h1 className="page-title-font text-4xl mb-4">MECPL Field Journal</h1>
          <p className="page-subtitle-font text-[#4b5563]">No articles published yet. Check back soon.</p>
        </div>
      ) : (
        <>
          {/* Restrained Cinematic Hero */}
          <section className="relative w-full h-screen min-h-screen flex items-center justify-center bg-[#111827] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={featuredPost.heroImage} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover opacity-40 scale-105 animate-[heroSlideIn_1.5s_ease-out_forwards]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/60 via-[#111827]/40 to-[#111827]/90" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center mt-16 md:mt-20">
              <div className="text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-6 animate-[heroSlideIn_1s_ease-out_0.2s_both]">
                Latest MECPL Posts
              </div>
              <h1 className="page-title-font text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 max-w-4xl animate-[heroSlideIn_1s_ease-out_0.4s_both]">
                MECPL Journal
              </h1>
              <p className="page-subtitle-font text-sm md:text-base text-white max-w-2xl leading-relaxed animate-[heroSlideIn_1s_ease-out_0.6s_both]">
                Industry insight, project thinking, and practical knowledge from MECPL.
              </p>
            </div>
          </section>

          {/* List Section */}
          <section className="bg-white py-20 md:py-32">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12">
              {/* Editorial List */}
              {archivePosts.length > 0 ? (
                <div className="flex flex-col">
                  {archivePosts.map((post) => {
                    const date = parseDate(post.publishedDate);
                    return (
                      <div key={post.slug} className="group border-b border-black/10 last:border-b-0 pb-12 mb-12 last:pb-0 last:mb-0">
                        <Link href={`/blog/${post.slug}`} className="block">
                          <article className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16 items-start">
                            
                            {/* Date Marker */}
                            <div className="hidden md:flex flex-col md:w-16 shrink-0 mt-1">
                              <span className="text-[11px] font-bold text-[#6b7280] tracking-[0.2em] uppercase mb-1">
                                {date.month}
                              </span>
                              <span className="text-4xl md:text-5xl font-black text-[#111827] tracking-tighter leading-none">
                                {date.day}
                              </span>
                              <span className="text-[10px] font-bold text-[#9ca3af] tracking-[0.1em] mt-2">
                                {date.year}
                              </span>
                            </div>

                            {/* Thumbnail */}
                            <div className="w-full md:w-[300px] lg:w-[380px] shrink-0 overflow-hidden bg-[#f9f9f9] aspect-[16/10] relative">
                              {/* Mobile Date Overlay */}
                              <div className="md:hidden absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-2 z-10 flex flex-col items-center shadow-sm">
                                <span className="text-[9px] font-bold text-[#6b7280] tracking-[0.15em] uppercase leading-none mb-1">
                                  {date.month}
                                </span>
                                <span className="text-xl font-black text-[#111827] tracking-tighter leading-none">
                                  {date.day}
                                </span>
                              </div>
                              <img 
                                src={post.heroImage} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col pt-1">
                              <h3 className="page-title-font text-xl md:text-2xl text-[#111827] mb-2 group-hover:text-[#C41E3A] transition-colors duration-300 leading-[1.15]">
                                {post.title}
                              </h3>
                              <div className="text-[10px] md:text-[11px] font-bold text-[#9ca3af] tracking-[0.15em] uppercase mb-5">
                                {post.category}
                              </div>
                              <p className="page-subtitle-font text-[#6b7280] text-sm leading-relaxed mb-6 line-clamp-3">
                                {post.deck}
                              </p>
                              <div className="self-end inline-flex items-center gap-3 text-[#111827] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[#C41E3A] transition-colors duration-300 mt-auto">
                                Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>

                          </article>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[#4b5563] italic text-sm">More project notes and company updates are on the way.</p>
              )}

            </div>
          </section>

          {/* Enterprise Trust CTA */}
          <section className="bg-[#C41E3A] min-h-[267px] md:h-[267px] py-14 md:py-0 relative overflow-hidden flex items-center">
            <div className="max-w-[900px] w-full mx-auto px-6 relative z-10 flex flex-col items-center text-center">
              <h2 className="page-title-font text-4xl sm:text-5xl text-white mb-8 leading-[0.95]">
                Beyond the Journal
              </h2>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-3 min-w-[174px] bg-white border border-white text-[#C41E3A] px-7 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#111827] hover:border-[#111827] hover:text-white"
              >
                <span>About Us</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

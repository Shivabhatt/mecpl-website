import { ArrowLeft } from "lucide-react";
import { Link, useRoute } from "wouter";
import { blogPostMap } from "./blogData";

export default function BlogArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const post = slug ? blogPostMap[slug] : undefined;

  if (!post) {
    return (
      <div className="bg-white pt-28 px-6 min-h-screen text-[#111827]">
        <div className="max-w-4xl mx-auto">
          <h3 className="page-title-font text-4xl">Article not found</h3>
          <Link href="/blog" className="inline-flex mt-6 text-[#C41E3A] font-black uppercase tracking-widest text-xs">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-animate-page className="blog-article-page">
      <header className="blog-article-hero">
        <div className="blog-article-hero-inner">
          <Link href="/blog" className="blog-article-back">
            <ArrowLeft size={13} /> Back to journal
          </Link>

          <div className="blog-article-heading">
            <h1 className="page-title-font text-[38px]">{post.title}</h1>
            <p className="page-subtitle-font">{post.deck}</p>
          </div>
        </div>
      </header>
      <figure className="blog-article-cover">
        <img src={post.heroImage} alt={post.title} />
      </figure>
      <div className="blog-article-layout">
        <article className="blog-article-reading">
          <div className="blog-article-intro">
            <p>{post.intro}</p>
            {post.introContinuation && <p>{post.introContinuation}</p>}
          </div>

          {post.sections.map((section, index) => (
            <section id={`article-section-${index}`} key={section.heading} className="blog-article-section">
              <div className="blog-article-section-number">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h2 className="page-title-font">{section.heading}</h2>
                <div className="blog-article-copy">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="blog-article-closing">
            <div className="blog-article-rail-label">Closing note</div>
            <p>{post.closing}</p>
          </section>
        </article>
      </div>
    </div>
  );
}

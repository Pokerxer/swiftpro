import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Clock, Share2, MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/sections/WhatsAppButton";
import { BLOG_POSTS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: `${post.title} | Swift Professional Solutions Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent" />
          </div>
          <div className="absolute inset-0">
            <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-20 w-[300px] h-[300px] bg-accent/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              {post.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/70">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 md:py-16 bg-white dark:bg-[#0F172A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {post.excerpt}
              </p>
              
              <div className="space-y-8">
                <p>
                  In today&apos;s rapidly evolving digital landscape, businesses must continuously adapt 
                  to stay competitive. At Swift Professional Solutions, we understand the challenges 
                  that organizations face in their digital transformation journey.
                </p>
                
                <h2>Understanding the Challenge</h2>
                <p>
                  Many businesses struggle with legacy systems, outdated infrastructure, and the 
                  need to integrate new technologies seamlessly. The key to success lies in 
                  adopting a strategic approach that aligns technology with business objectives.
                </p>
                
                <h2>Our Approach</h2>
                <p>
                  We believe in a customer-centric approach that focuses on delivering tangible 
                  results. Our team of experts works closely with clients to understand their 
                  unique requirements and provide tailored solutions that drive real business value.
                </p>
                
                <ul>
                  <li>Comprehensive assessment of current infrastructure</li>
                  <li>Strategic planning aligned with business goals</li>
                  <li>Implementation using industry best practices</li>
                  <li>Ongoing support and optimization</li>
                </ul>
                
                <h2>Key Takeaways</h2>
                <p>
                  Digital transformation is not just about technology—it&apos;s about transforming 
                  how your business operates. By partnering with the right ICT solutions provider, 
                  you can unlock new opportunities and achieve sustainable growth.
                </p>
                
                <h2>Conclusion</h2>
                <p>
                  The future belongs to businesses that embrace digital transformation. At 
                  Swift Professional Solutions, we are committed to helping our clients navigate 
                  this journey and achieve their goals. Contact us today to learn how we can 
                  help your business thrive in the digital age.
                </p>
              </div>
            </article>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 dark:text-gray-400">Share this article:</span>
                  <button className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0F172A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-heading font-bold text-primary dark:text-white mb-8">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <div className="h-full p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all">
                      <span className="text-xs text-primary font-medium mb-2 block">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
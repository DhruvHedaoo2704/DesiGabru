import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { getBlog } from '../services/api';
import { PageLoader } from '../components/Skeleton';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(slug)
      .then((r) => setBlog(r.data.blog))
      .catch(() => setBlog(null));
  }, [slug]);

  if (!blog) return <PageLoader />;

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt} />
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-10">
        <Link to="/blog" className="text-[#D4AF37] text-sm mb-6 inline-block hover:underline">
          ← Back to Blog
        </Link>
        <img src={blog.coverImage} alt={blog.title} className="w-full aspect-video object-cover rounded-2xl mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Orbitron' }}>{blog.title}</h1>
        <p className="text-gray-400 mb-8">{blog.readTime} min read · {blog.authorName || 'Desii Gabru Team'}</p>
        <div
          className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
        />
      </article>
    </>
  );
}

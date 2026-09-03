import { useParams, Link } from "react-router-dom";
import { allPosts } from "../../data/blogPosts";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./BlogPost.css";

function BlogPost() {
    const { slug } = useParams();
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <>
                <Navbar />
                <section className="blogpost-body" style={{ paddingTop: "140px" }}>
                    <div className="container">
                        <h1>Article Not Found</h1>
                        <p>The article you're looking for doesn't exist.</p>
                        <Link to="/blog" className="blogpost-back-btn">← Back to Blog</Link>
                    </div>
                </section>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <section className="blogpost-body">
                <div className="container">

                    {/* ── Hero Image ── */}
                    <div className="blogpost-hero-image">
                        <img src={post.heroImage} alt={post.title} />
                        <span
                            className="blogpost-hero-tag"
                            style={{ background: post.accent }}
                        >
                            {post.category}
                        </span>
                    </div>

                    {/* ── Title & Meta ── */}
                    <div className="blogpost-header">
                        <h1 className="blogpost-title">{post.title}</h1>

                    </div>

                    {/* ── Article Content ── */}
                    <article className="blogpost-article">
                        {post.content.map((paragraph, i) => (
                            <div key={i}>
                                {/* Insert the article image after the 3rd paragraph */}
                                {i === 3 && (
                                    <div className="blogpost-inline-image">
                                        <img
                                            src={post.articleImage}
                                            alt={post.title}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <p
                                    className="blogpost-paragraph"
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph
                                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                            .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                                    }}
                                />
                            </div>
                        ))}
                    </article>

                    {/* ── Back to blog ── */}
                    <div className="blogpost-back">
                        <Link to="/blog" className="blogpost-back-btn">
                            ← Back to All Articles
                        </Link>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default BlogPost;

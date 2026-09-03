import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { allPosts, categories } from "../../data/blogPosts";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Blog.css";

function AnimSection({ children, className = "" }) {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.add("visible"));
                    } else {
                        e.target.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right, .scale-up").forEach(el => el.classList.remove("visible"));
                    }
            }),
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return <div ref={ref} className={className}>{children}</div>;
}

function Blog() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [heroRef, heroInView] = useInView();

    const filtered = allPosts.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch = search === "" ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <>
            <Navbar />

            <div ref={heroRef} className={`page-hero blog-hero ${heroInView ? 'animate-typing' : ''}`}>
                <div className="blog-hero-bg" aria-hidden="true">
                    <img
                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80"
                        alt=""
                        className="blog-hero-photo"
                        loading="lazy"
                    />
                </div>
                <div className="page-hero-overlay" />
                <div className="container page-hero-content">
                    <span className="page-hero-tag">Knowledge Hub</span>
                    <h1 className="page-hero-title">Solar Energy Blog</h1>
                    <p className="page-hero-sub">
                        Insights, guides, and industry news from our certified solar experts.
                    </p>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>Blog</span>
                    </nav>
                </div>
            </div>

            <section className="blog-section">
                <div className="container">

                    <AnimSection className="blog-controls fade-in-up">
                        <div className="blog-search-wrap">
                            <span className="blog-search-icon">🔍</span>
                            <input
                                type="search"
                                className="blog-search"
                                placeholder="Search articles…"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                aria-label="Search blog posts"
                            />
                        </div>
                        <div className="blog-categories" role="tablist">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    className={`blog-cat-btn ${activeCategory === cat ? "blog-cat-btn--active" : ""}`}
                                    onClick={() => setActiveCategory(cat)}
                                    role="tab"
                                    aria-selected={activeCategory === cat}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </AnimSection>

                    <p className="blog-count">
                        {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
                    </p>

                    {filtered.length > 0 ? (
                        <div className="blog-full-grid">
                            {filtered.map((post, i) => (
                                <AnimSection key={post.slug}>
                                    <Link to={`/blog/${post.slug}`} className="blog-card-link hover-glow">
                                        <article
                                            className="blog-card-full fade-in-up hover-glow"
                                            style={{ "--card-bg": post.color, "--card-accent": post.accent }}
                                        >
                                            <div className="blog-card-full-img hover-glow">
                                                <img src={post.image} alt={post.title} className="blog-card-full-photo hover-glow" loading="lazy" />
                                                <span className="blog-card-full-tag hover-glow">{post.category}</span>
                                            </div>
                                            <div className="blog-card-full-body hover-glow">

                                                <h2 className="blog-card-full-title hover-glow">{post.title}</h2>
                                                <p className="blog-card-full-excerpt hover-glow">{post.excerpt}</p>
                                                <span className="blog-read-more-btn">
                                                    Read Article <span>→</span>
                                                </span>
                                            </div>
                                        </article>
                                    </Link>
                                </AnimSection>
                            ))}
                        </div>
                    ) : (
                        <div className="blog-empty">
                            <span>🔍</span>
                            <p>No articles found. Try a different search or category.</p>
                            <button
                                className="btn-primary"
                                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                    <AnimSection className="blog-newsletter fade-in-up">
                        <div className="newsletter-inner">
                            <div className="newsletter-text">
                                <h3>Get Solar Insights in Your Inbox</h3>
                                <p>Subscribe for the latest solar news, tips, and exclusive offers from Dynamic Solar.</p>
                            </div>
                            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="newsletter-input"
                                    aria-label="Email for newsletter"
                                />
                                <button type="submit" className="btn-primary">Subscribe</button>
                            </form>
                        </div>
                    </AnimSection>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default Blog;

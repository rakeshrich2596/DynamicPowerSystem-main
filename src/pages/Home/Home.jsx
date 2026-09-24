import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import EnquiryCalculator from "../../components/EnquiryCalculator/EnquiryCalculator";
import BookHomeVisit from "../../components/BookHomeVisit/BookHomeVisit";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import ProductCards from "../../components/ProductCards/ProductCards";
import Clients from "../../components/Clients/Clients";
import Testimonials from "../../components/Testimonials/Testimonials";
import MapSection from "../../components/MapSection/MapSection";
import BlogPreview from "../../components/BlogPreview/BlogPreview";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";
import WhatsAppWidget from "../../components/WhatsAppWidget/WhatsAppWidget";
import HomePopup from "../../components/HomePopup/HomePopup";

function Home() {
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>
          Solar Company in Tambaram | Solar Panel Installation | Dynamic Solar
        </title>

        <meta
          name="description"
          content="Dynamic Solar provides solar panel installation and power solutions from West Tambaram. Explore solar solutions for homes and businesses in Tambaram and nearby areas."
        />

        <meta
          name="keywords"
          content="solar company in Tambaram, solar panel installation in Tambaram, solar solutions in Tambaram"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://dynamicsolar.in/" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Solar Company in Tambaram | Solar Panel Installation | Dynamic Solar"
        />

        <meta
          property="og:description"
          content="Dynamic Solar provides solar panel installation and power solutions from West Tambaram. Explore solar solutions for homes and businesses in Tambaram and nearby areas."
        />

        <meta property="og:url" content="https://dynamicsolar.in/" />

        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="Dynamic Solar" />

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://dynamicsolar.in/#website",
            url: "https://dynamicsolar.in/",
            name: "Dynamic Solar",
            publisher: {
              "@id": "https://dynamicsolar.in/#organization",
            },
          })}
        </script>

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://dynamicsolar.in/#organization",
            name: "Dynamic Solar",
            url: "https://dynamicsolar.in/",
            telephone: "+91 9841582874",
            email: "info@dynamicsolar.in",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1, Gandhi Rd, West Tambaram",
              addressLocality: "Tambaram",
              addressRegion: "Tamil Nadu",
              postalCode: "600045",
              addressCountry: "IN",
            },
            sameAs: [
              "https://www.instagram.com/dynamic_solars/",
              "https://www.facebook.com/share/1doH6LGFm4/",
            ],
          })}
        </script>
      </Helmet>

      <Navbar />
      <div className="home-page">
        <HomePopup />
        <Hero />
        <EnquiryCalculator />
        <BookHomeVisit />
        <WhyChooseUs />
        <ProductCards />
        <Clients />
        <Testimonials />
        <MapSection />
        <BlogPreview />
        <CTA />
      </div>
      <WhatsAppWidget />
      <Footer />
    </>
  );
}

export default Home;

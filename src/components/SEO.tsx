import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/track";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const defaults = {
  siteName: "LaSean Pickens | AI & Business Automation",
  description: "Transform your business with AI automation, custom AI agents, and done-for-you digital services. Save 15+ hours per week with proven systems.",
  image: "https://laseanpickens.com/og-image.png",
  url: "https://laseanpickens.com",
};

const SEO = ({ title, description, image, type = "website" }: SEOProps) => {
  const location = useLocation();
  const fullTitle = title ? `${title} | LaSean Pickens` : defaults.siteName;
  const desc = description || defaults.description;
  const img = image || defaults.image;
  const url = `${defaults.url}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", desc);
    setMeta("og:title", fullTitle);
    setMeta("og:description", desc);
    setMeta("og:image", img);
    setMeta("og:url", url);
    setMeta("og:type", type);
    setMeta("og:site_name", defaults.siteName);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", img);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Track page view
    trackPageView();
  }, [fullTitle, desc, img, url, type]);

  return null;
};

export default SEO;

import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  schema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = "https://chamba.digital/og-image.png",
  ogUrl,
  canonicalUrl,
  schema
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    setMetaTag('meta[name="description"]', 'content', description);
    if (keywords) setMetaTag('meta[name="keywords"]', 'content', keywords);

    const currentUrl = ogUrl || window.location.href;
    const currentCanonical = canonicalUrl || window.location.href;

    setMetaTag('meta[property="og:title"]', 'content', ogTitle || title);
    setMetaTag('meta[property="og:description"]', 'content', ogDescription || description);
    setMetaTag('meta[property="og:image"]', 'content', ogImage);
    setMetaTag('meta[property="og:url"]', 'content', currentUrl);

    setMetaTag('meta[property="twitter:title"]', 'content', ogTitle || title);
    setMetaTag('meta[property="twitter:description"]', 'content', ogDescription || description);
    setMetaTag('meta[property="twitter:image"]', 'content', ogImage);

    // Update canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentCanonical);

    // Update or inject Schema.org JSON-LD
    if (schema) {
      let scriptTag = document.querySelector('script[id="dynamic-ld-json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.setAttribute('id', 'dynamic-ld-json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl, canonicalUrl, schema]);

  return null;
};

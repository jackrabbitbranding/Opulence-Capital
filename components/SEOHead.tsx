
import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, keywords, image }) => {
  const { currentTenant } = useTheme();
  
  const siteTitle = currentTenant.name;
  const globalSeo = currentTenant.seo || {};
  
  // Logic: 
  // 1. If 'title' prop is passed, use "Title | Site Name". Else use Global Title or Site Name.
  // 2. If props are missing, fall back to globalSeo config, then fall back to generic tenant info.
  
  const finalTitle = title ? `${title} | ${siteTitle}` : (globalSeo.title || siteTitle);
  const finalDesc = description || globalSeo.description || currentTenant.welcomeMessage || 'Fintech Platform';
  const finalKeywords = keywords || globalSeo.keywords || 'finance, investment, loans, insurance';
  const finalImage = image || globalSeo.ogImage || currentTenant.logoUrl || '';

  useEffect(() => {
    // Update Title
    document.title = finalTitle;
    
    // Helper to set meta tags
    const setMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set OG tags
    const setOg = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute('property', property);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    setMeta('description', finalDesc);
    setMeta('keywords', finalKeywords);
    
    setOg('og:title', finalTitle);
    setOg('og:description', finalDesc);
    if(finalImage) setOg('og:image', finalImage);
    setOg('og:type', 'website');
    // Using window.location.href for current URL
    setOg('og:url', window.location.href);

  }, [finalTitle, finalDesc, finalKeywords, finalImage, currentTenant]);

  return null;
};

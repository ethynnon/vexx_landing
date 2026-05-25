"use client";

import React, { useState } from 'react';
import { siteContent } from '@/content';
import { SparklesCore } from './sparkles';

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const defaultTextColor = 'text-gray-300';
  const hoverTextColor = 'text-white';
  const textSizeClass = 'text-sm font-medium';

  return (
    <a href={href} className={`group relative inline-block overflow-hidden h-5 flex items-center ${textSizeClass}`}>
      <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
        <span className={defaultTextColor}>{children}</span>
        <span className={hoverTextColor}>{children}</span>
      </div>
    </a>
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoElement = (
    <a href="#" className="flex items-center gap-2">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <img src="/logo_ci.png" alt="VEXX Logo" className="w-full h-full object-contain" />
      </div>
      <div style={{ fontFamily: '"Dela Gothic One", sans-serif', fontSize: '1.2rem', lineHeight: 1 }}>
        <span className="text-[#c9c6c1]">{siteContent.header.logoTextPart1}</span><span className="text-[var(--color-accent)]">{siteContent.header.logoTextPart2}</span>
      </div>
    </a>
  );

  const dashboardButtonElement = (
    <button 
      onClick={() => window.location.href = siteContent.header.ctaLink}
      className="px-3 py-1.5 md:px-4 text-xs md:text-sm font-semibold text-black bg-[#c9c6c1] rounded-lg hover:bg-white transition-all duration-200 w-full sm:w-auto whitespace-nowrap"
    >
      {siteContent.header.ctaButton}
    </button>
  );

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center w-[calc(100%-2rem)] sm:w-[620px] md:w-[720px] lg:w-[820px] max-w-full">
      {/* Main navbar pill */}
      <header className="relative flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-3 backdrop-blur-md rounded-xl border border-white/10 bg-black/40 shadow-2xl z-10">

        {/* Neon glow line at the bottom of header */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-60 pointer-events-none rounded-full" />
        <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#f45c7e] to-transparent opacity-50 blur-sm pointer-events-none" />

        <div className="flex items-center justify-between w-full gap-x-4 md:gap-x-6 lg:gap-x-8">
          <div className="flex items-center">
            {logoElement}
          </div>

          <nav className="hidden sm:flex items-center space-x-4 md:space-x-6 lg:space-x-8 text-sm">
            {siteContent.header.navLinks.map((link) => (
              <AnimatedNavLink key={link.href} href={link.href}>
                {link.label}
              </AnimatedNavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            {dashboardButtonElement}
          </div>

          <button
            className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100 pt-6 pb-2' : 'max-h-0 opacity-0 pt-0 pb-0 pointer-events-none'}`}>
          <nav className="flex flex-col items-center space-y-5 text-base w-full">
            {siteContent.header.navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors w-full text-center font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-6 w-full">
            {dashboardButtonElement}
          </div>
        </div>
      </header>

      {/* Sparkles layer — tightly below header */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-[45rem] max-w-[100vw] h-16 pointer-events-none z-0"
        style={{
          maskImage: 'radial-gradient(420px 64px at top, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(420px 64px at top, black 40%, transparent 100%)',
        }}
      >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={300}
          className="w-full h-full"
          particleColor="#C8385A"
        />
      </div>
    </div>
  );
}

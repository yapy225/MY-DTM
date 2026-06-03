"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`main-header-eight${sticky ? " eisticky-menu-bg-overlay" : ""}`}
      >
        <div className="appheader-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div className="site-logo" style={{ marginRight: "40px" }}>
            <Link href="/" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", textDecoration: "none", fontFamily: "Poppins" }}>
              <span style={{
                background: "linear-gradient(to right, #fff, #4ce7f3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                My-DTM
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="navigation-eight ul-li" style={{ display: "inline-block" }}>
            <ul style={{ margin: 0, padding: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href} style={{ listStyle: "none", display: "inline-block", marginRight: "25px" }}>
                  <Link href={link.href} style={{ display: "inline", padding: "28px 5px", position: "relative", color: "#fff", fontWeight: 500, fontSize: "15px", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: social + sign up */}
          <div style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
            {/* Social icons */}
            <div className="h-eight-social ul-li" style={{ display: "inline-block" }}>
              <ul style={{ margin: 0, padding: 0 }}>
                <li style={{ listStyle: "none", display: "inline-block", marginLeft: "18px", color: "#fff" }}>
                  <a href="https://www.instagram.com/mydreamteammedia/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s all ease-in-out" }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.96c.458.458.78.92.96 1.47.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.96 1.47 4.08 4.08 0 01-1.47.96c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.47-.96 4.08 4.08 0 01-.96-1.47c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.96-1.47 4.08 4.08 0 011.47-.96c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.151.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.762.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.151-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.762.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.261-2.151-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.098.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </li>
                <li style={{ listStyle: "none", display: "inline-block", marginLeft: "18px", color: "#fff" }}>
                  <a href="https://www.facebook.com/mydreamteammedia/" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s all ease-in-out" }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                </li>
                <li style={{ listStyle: "none", display: "inline-block", marginLeft: "18px", color: "#fff" }}>
                  <a href="https://x.com/DreamTeamAfriQ" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "0.3s all ease-in-out" }}>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Sign Up / Audit Button */}
            <div className="sign-up-btn-eight" style={{ textAlign: "center", marginLeft: "25px" }}>
              <Link href="/contact" style={{ fontWeight: 600, display: "block", width: "100%", color: "#000", fontSize: "14px", textDecoration: "none" }}>
                Audit gratuit
              </Link>
            </div>
          </div>

          {/* Mobile hamburger */}
          <div
            className="appi-ei-mobile_menu_button"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: "none", position: "absolute", right: "20px", cursor: "pointer", lineHeight: "40px", color: "#fff", textAlign: "center", fontSize: "30px", top: "2px", zIndex: 5 }}
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu overlay + sliding panel */}
      <div className={`appi-ei-mobile_menu_wrap appi-ei-mobile_menu${mobileOpen ? " mobile_menu_on" : ""}`}>
        <div className="mobile_menu_overlay" onClick={() => setMobileOpen(false)} />
        <div className="appi-ei-mobile_menu_content">
          <div className="appi-ei-mobile_menu_close" onClick={() => setMobileOpen(false)} style={{ color: "#d60606", cursor: "pointer", position: "absolute", top: "15px", left: "15px", fontSize: "20px" }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="m-brand-logo" style={{ textAlign: "center" }}>
            <Link href="/" onClick={() => setMobileOpen(false)} style={{ fontSize: "20px", fontWeight: 700, color: "#7c0dbe", textDecoration: "none" }}>
              My-DTM
            </Link>
          </div>
          <div className="appi-ei-mobile-main-navigation">
            <ul className="navbar-nav" style={{ margin: 0, padding: 0 }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Inline style to show mobile menu button on small screens */}
      <style jsx global>{`
        @media screen and (max-width: 991px) {
          .main-header-eight .appheader-content .navigation-eight {
            display: none !important;
          }
          .main-header-eight .appheader-content .h-eight-social {
            display: none !important;
          }
          .appi-ei-mobile_menu_button {
            display: block !important;
          }
          .main-header-eight .appheader-content .sign-up-btn-eight {
            margin-right: 50px;
          }
        }
      `}</style>
    </>
  );
}

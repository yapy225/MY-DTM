"use client";

import Link from "next/link";

const USEFUL_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/a-propos", label: "A propos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/mentions-legales", label: "Mentions legales" },
];

export default function Footer() {
  return (
    <section
      className="ei-footer-section"
      style={{
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8f9fc",
      }}
    >
      {/* Decorative shapes */}
      <div
        className="ei-footer-shape1"
        style={{
          position: "absolute",
          top: "120px",
          right: "130px",
          opacity: 0.5,
          zIndex: -1,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.1), transparent 70%)",
        }}
      />
      <div
        className="ei-footer-shape2"
        style={{
          position: "absolute",
          top: "110px",
          left: "-160px",
          opacity: 0.5,
          zIndex: -1,
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.08), transparent 70%)",
        }}
      />
      <div
        className="ei-footer-shape3"
        style={{
          position: "absolute",
          left: "-50px",
          right: 0,
          opacity: 0.5,
          zIndex: -1,
          bottom: "100px",
          margin: "0 auto",
          textAlign: "center",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,13,190,0.06), transparent 70%)",
          animation: "leftRightMove 25s linear infinite",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 15px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "40px 0" }}>
          {/* Brand column — col-lg-4 */}
          <div style={{ flex: "0 0 33.333%", maxWidth: "33.333%", paddingRight: "15px" }} className="footer-col">
            <div className="ei-footer-widget">
              {/* Logo */}
              <div className="ei-footer-logo" style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #7c0dbe, #ff00d6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#fff", fontSize: "14px", fontWeight: 900 }}>M</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: "#373a5b" }}>My-DTM</span>
                </div>
              </div>
              <p
                style={{
                  maxWidth: "220px",
                  lineHeight: 1.875,
                  fontSize: "14px",
                  color: "#373a5b",
                  marginBottom: 0,
                }}
              >
                Agence de marketing digital specialisee dans la creation d&apos;ecosystemes numeriques complets.
              </p>
            </div>
          </div>

          {/* Useful Links — col-lg-4 */}
          <div style={{ flex: "0 0 33.333%", maxWidth: "33.333%", paddingRight: "15px" }} className="footer-col">
            <div className="ei-footer-widget">
              <h3
                className="ei-widget-title"
                style={{
                  fontSize: "16px",
                  color: "#373a5b",
                  fontWeight: 700,
                  paddingBottom: "20px",
                  margin: 0,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Liens utiles :
              </h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap" }}>
                {USEFUL_LINKS.map((link) => (
                  <li
                    key={link.href + link.label}
                    style={{
                      width: "50%",
                      fontSize: "14px",
                      paddingLeft: "15px",
                      marginBottom: "20px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        color: "#373a5b",
                        position: "relative",
                        transition: "0.3s all ease-in-out",
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: "-15px",
                          top: "3px",
                          fontSize: "10px",
                        }}
                      >
                        &#9654;
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact — col-lg-4 */}
          <div style={{ flex: "0 0 33.333%", maxWidth: "33.333%" }} className="footer-col">
            <div className="ei-footer-widget">
              <h3
                className="ei-widget-title"
                style={{
                  fontSize: "16px",
                  color: "#373a5b",
                  fontWeight: 700,
                  paddingBottom: "20px",
                  margin: 0,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Contact :
              </h3>

              {/* Phone + Address in SaaSio h4 style */}
              <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "15px" }}>
                <div
                  style={{
                    width: "45%",
                    fontSize: "14px",
                    fontWeight: 700,
                    paddingLeft: "28px",
                    marginRight: "15px",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <svg
                    style={{ position: "absolute", left: 0, top: "2px", color: "#7b0dbd", width: "20px", height: "20px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span style={{ color: "#373a5b" }}>Telephone</span>
                  <span
                    style={{
                      fontWeight: 400,
                      marginTop: "10px",
                      display: "block",
                      color: "#818181",
                      fontSize: "13px",
                    }}
                  >
                    +33 7 43 53 75 51
                  </span>
                </div>
                <div
                  style={{
                    width: "45%",
                    fontSize: "14px",
                    fontWeight: 700,
                    paddingLeft: "28px",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  <svg
                    style={{ position: "absolute", left: 0, top: "2px", color: "#7b0dbd", width: "20px", height: "20px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: "#373a5b" }}>Adresse</span>
                  <span
                    style={{
                      fontWeight: 400,
                      marginTop: "10px",
                      display: "block",
                      color: "#818181",
                      fontSize: "13px",
                    }}
                  >
                    Paris, France
                  </span>
                </div>
              </div>

              {/* Email */}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  paddingLeft: "28px",
                  position: "relative",
                  display: "inline-block",
                  marginBottom: "15px",
                }}
              >
                <svg
                  style={{ position: "absolute", left: 0, top: "2px", color: "#7b0dbd", width: "20px", height: "20px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span style={{ color: "#373a5b" }}>Email</span>
                <span
                  style={{
                    fontWeight: 400,
                    marginTop: "10px",
                    display: "block",
                    color: "#818181",
                    fontSize: "13px",
                  }}
                >
                  contact@my-dtm.fr
                </span>
              </div>

              {/* Social icons */}
              <div className="ei-footer-social" style={{ marginTop: "15px", display: "flex", gap: "5px" }}>
                <a
                  href="https://www.instagram.com/mydreamteammedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                    backgroundColor: "#fff",
                    lineHeight: "30px",
                    textAlign: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s all ease-in-out",
                    boxShadow: "0px 0px 9px 0px rgba(15,54,131,0.07)",
                    color: "#ea4c89",
                    textDecoration: "none",
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.08 4.08 0 011.47.96c.458.458.78.92.96 1.47.163.46.349 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.08 4.08 0 01-.96 1.47 4.08 4.08 0 01-1.47.96c-.46.163-1.26.349-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.08 4.08 0 01-1.47-.96 4.08 4.08 0 01-.96-1.47c-.163-.46-.349-1.26-.403-2.43C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.08 4.08 0 01.96-1.47 4.08 4.08 0 011.47-.96c.46-.163 1.26-.349 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.333.014 7.053.072 5.775.13 4.902.333 4.14.63a5.88 5.88 0 00-2.126 1.384A5.88 5.88 0 00.63 4.14C.333 4.902.13 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.058 1.278.261 2.151.558 2.913a5.88 5.88 0 001.384 2.126A5.88 5.88 0 004.14 23.37c.762.297 1.635.5 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.058 2.151-.261 2.913-.558a5.88 5.88 0 002.126-1.384 5.88 5.88 0 001.384-2.126c.297-.762.5-1.635.558-2.913.058-1.28.072-1.688.072-4.947s-.014-3.667-.072-4.947c-.058-1.278-.261-2.151-.558-2.913a5.88 5.88 0 00-1.384-2.126A5.88 5.88 0 0019.86.63C19.098.333 18.225.13 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a
                  href="https://www.facebook.com/mydreamteammedia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-icon"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                    backgroundColor: "#fff",
                    lineHeight: "30px",
                    textAlign: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s all ease-in-out",
                    boxShadow: "0px 0px 9px 0px rgba(15,54,131,0.07)",
                    color: "#16599b",
                    textDecoration: "none",
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a
                  href="https://x.com/DreamTeamAfriQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="social-icon"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                    backgroundColor: "#fff",
                    lineHeight: "30px",
                    textAlign: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "0.3s all ease-in-out",
                    boxShadow: "0px 0px 9px 0px rgba(15,54,131,0.07)",
                    color: "#03a9f4",
                    textDecoration: "none",
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="ei-footer-copyright"
        style={{
          marginTop: "40px",
          fontSize: "14px",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          className="ei-footer-copyright-content"
          style={{
            padding: "25px 0 15px",
            borderTop: "2px solid #dee2ef",
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            paddingLeft: "15px",
            paddingRight: "15px",
          }}
        >
          <span style={{ color: "#373a5b" }}>&copy; 2025 My-DTM Digital Agency. Tous droits reserves.</span>
          <div className="ei-copyright-menu" style={{ display: "flex", gap: "0" }}>
            <Link
              href="/mentions-legales"
              style={{
                marginLeft: "35px",
                color: "#373a5b",
                textDecoration: "none",
                transition: "0.3s all ease-in-out",
              }}
              className="copyright-link"
            >
              Mentions legales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              style={{
                marginLeft: "35px",
                color: "#373a5b",
                textDecoration: "none",
                transition: "0.3s all ease-in-out",
              }}
              className="copyright-link"
            >
              Confidentialite
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes leftRightMove {
          0% { transform: translateX(-100px); }
          50% { transform: translateX(-10px); }
          100% { transform: translateX(-100px); }
        }
        .footer-link:hover {
          color: #0072fd !important;
          margin-left: 10px !important;
        }
        .copyright-link:hover {
          color: #0072fd !important;
        }
        .social-icon:hover {
          background: linear-gradient(135deg, #7c0dbe, #ff00d6) !important;
          color: #fff !important;
        }
        @media (max-width: 768px) {
          .footer-col {
            flex: 0 0 100% !important;
            max-width: 100% !important;
          }
          .ei-footer-copyright-content {
            flex-direction: column !important;
            text-align: center;
          }
          .ei-copyright-menu a {
            margin-left: 15px !important;
          }
        }
      `}</style>
    </section>
  );
}

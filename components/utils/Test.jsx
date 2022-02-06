/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Test = () => {
  return (
    <div>
      <nav className="show navbar navbar-expand-lg navbar-light bg-bg-transparent sticky-top">
        <div className="container">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="navbar-brand">
            <span
              style={{
                boxSizing: 'border-box',
                display: 'inline-block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: 'relative',
                maxWidth: '100%',
              }}
            >
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  maxWidth: '100%',
                }}
              >
                <img
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    width: 'initial',
                    height: 'initial',
                    background: 'none',
                    opacity: 1,
                    border: 0,
                    margin: 0,
                    padding: 0,
                  }}
                  alt=""
                  aria-hidden="true"
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTY5IiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIvPg=="
                />
              </span>
              <img
                alt="Highrachy"
                src="/_next/image?url=%2Flogo.png&w=384&q=75"
                decoding="async"
                data-nimg="intrinsic"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  boxSizing: 'border-box',
                  padding: 0,
                  border: 'none',
                  margin: 'auto',
                  display: 'block',
                  width: 0,
                  height: 0,
                  minWidth: '100%',
                  maxWidth: '100%',
                  minHeight: '100%',
                  maxHeight: '100%',
                }}
                srcSet="/_next/image?url=%2Flogo.png&w=256&q=75 1x, /_next/image?url=%2Flogo.png&w=384&q=75 2x"
              />
              <noscript>
                <img
                  alt="Highrachy"
                  srcSet="/_next/image?url=%2Flogo.png&amp;amp;w=256&amp;amp;q=75
                1x, /_next/image?url=%2Flogo.png&amp;amp;w=384&amp;amp;q=75 2x"
                  src="/_next/image?url=%2Flogo.png&amp;amp;w=384&amp;amp;q=75"
                  decoding="async"
                  data-nimg="intrinsic"
                  style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                  loading="lazy"
                />
              </noscript>
            </span>
          </a>
          <button
            aria-controls="highrachy-navbar"
            type="button"
            aria-label="Toggle navigation"
            className="navbar-toggler collapsed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
            </svg>
          </button>
          <div className="navbar-collapse collapse" id="highrachy-navbar">
            <div className="me-auto navbar-nav">
              <a
                aria-current="page"
                href="/"
                data-rr-ui-event-key="/"
                className="nav-url text-danger active nav-link"
              >
                Home
              </a>
              <div className="nav-item dropdown">
                <a
                  id="services-dropdown"
                  aria-expanded="false"
                  role="button"
                  className="dropdown-toggle nav-link"
                  tabIndex={0}
                >
                  Services
                </a>
              </div>
              <a
                aria-current="page"
                href="/projects"
                data-rr-ui-event-key="/projects"
                className="nav-url nav-link"
              >
                Projects
              </a>
              <div className="nav-item dropdown">
                <a
                  id="about-us-dropdown"
                  aria-expanded="false"
                  role="button"
                  className="dropdown-toggle nav-link"
                  tabIndex={0}
                >
                  About Us
                </a>
              </div>
            </div>
            <div className="navbar-nav">
              <a
                aria-current="page"
                href="/listings"
                data-rr-ui-event-key="/listings"
                className="btn btn-sm btn-outline-dark btn-listings nav-link"
              >
                Find Apartments
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Test;

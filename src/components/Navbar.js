import React, { useState } from 'react';
import styled from 'styled-components';
import { Logo } from '../assets/index';
import { Link, useLocation } from 'react-router-dom';
import { NAVBAR_ROUTES } from './navdata.js';

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/');

  return (
    <NavContainer className="primary-header flex">
      <div className="logo-container">
        <img src={Logo} alt="Space Tourism Logo" className="logo" />
      </div>
      <button
        onClick={() => setShowLinks(!showLinks)}
        className={
          showLinks
            ? 'change menu-bars mobile-nav-toggle close-mobile'
            : 'menu-bars mobile-nav-toggle'
        }
        aria-controls="primary-navigation"
        aria-expanded={showLinks}
      >
        <span className="sr-only">Menu</span>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      <nav>
<ul
  className={
    showLinks
      ? 'primary-navigation flex nav-indicators'
      : 'close-primary-navigation primary-navigation flex nav-indicators'
  }
  id="primary-navigation"
>
  {NAVBAR_ROUTES.map(({ exact, path, name, classname }, index) => (
    <li
      key={name}
      className={splitLocation[1] === classname ? 'active' : ''}
    >
      <Link
        to={path}
        className="navlink uppercase letter-spacing-2 ff-sans-cond nav-text text-white"
        onClick={() => setShowLinks(false)}
      >
        <span className="nav-number" aria-hidden="true">0{index}</span>
        {name}
      </Link>
    </li>
  ))}
</ul>
      </nav>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  background: transparent;
  .logo {
    height: 2.5rem;
    margin: 1.5rem;
  }

  .primary-navigation {
    --underline-gap: 0.5rem;
    position: fixed;
    background: hsl(var(--clr-dark) / 0.95);
    z-index: 1000;
    inset: 0 0 0 33%;
    padding: min(9rem, 24vh) 0rem;
    padding-left: 2rem;
    margin: 0;
    flex-direction: column;
    transition: transform 500ms ease-in-out;

    button {
      cursor: pointer;
      border: none;
      background: transparent;
    }

    button > span {
      font-weight: 700;
      margin-right: 0.5em;
    }
  }

  .flex {
    gap: 2rem;
  }

  .nav-indicators > * {
    cursor: pointer;
    padding: var(--underline-gap, 0.75rem) 0;
    border: 0;
    border-right: 0.2rem solid hsl(var(--clr-white) / 0);
    background: transparent;
  }

  .nav-indicators > *:hover,
  .nav-indicators > *:focus {
    border-color: hsl(var(--clr-white) / 0.5);
  }

  .nav-indicators > .active {
    border-color: hsl(var(--clr-white));
  }

  @supports (backdrop-filter: blur(2rem)) {
    .primary-navigation {
      background: hsl(var(--clr-white) / 0.05);
      backdrop-filter: blur(1rem);
    }
  }

  .mobile-nav-toggle {
    display: block;
    position: absolute;
    z-index: 2000;
    right: 1.5rem;
    top: 1.5rem;
    background: transparent;
    width: 2.5rem;
    aspect-ratio: 1;
    border: 0;
    cursor: pointer;
    .bar1,
    .bar2,
    .bar3 {
      width: 1.5rem;
      height: 3px;
      background-color: hsl(var(--clr-white));
      margin: 6px 0;
      transition: var(--transition);
    }
  }

  .mobile-nav-toggle:focus-visible {
    outline: 5px solid hsl(var(--clr-white));
    outline-offset: 5px;
  }

  .close-primary-navigation {
    transform: translateX(100%);
  }

  .nav-number {
  font-weight: 700;
  margin-right: 12px;
  }


.change {
  .bar1 {
    transform: rotate(45deg) translate(5px, 8px);
    transform-origin: center;
  }
  .bar2 {
    opacity: 0;
  }
  .bar3 {
    transform: rotate(-45deg) translate(5px, -8px);
    transform-origin: center;
  }
}

  @media (min-width: 768px) {
    justify-content: space-between;

    .logo {
      height: 3rem;
      margin: 1.5rem 2.4rem;
    }

    .primary-navigation {
      transform: translateX(0);
      inset: 0;
      position: relative;
      --gap: clamp(1.5rem, 5vw, 3.5rem);
      --underline-gap: 2rem;
      padding: 0;
      padding-inline: clamp(2rem, 4vw, 9rem);
      margin: 0;
      background: rgba(255, 255, 255, 0.04);
      flex-direction: row;
    }

    .navlink > span {
      display: none;
    }

    .mobile-nav-toggle {
      display: none;
    }

    .nav-indicators > * {
      border: 0;
      border-bottom: 0.2rem solid hsl(var(--clr-white) / 0);
    }
  }

  @media (min-width: 1200px) {
    max-width: var(--max-width);
    margin: 0 auto;
    align-items: center;

    :after {
      content: '';
      display: block;
      position: relative;
      height: 1px;
      background: hsl(var(--clr-white) / 0.25);
      width: 100%;
      margin-right: -2.5rem;

      order: -1;
    }

    .primary-navigation {
      margin-block: 2.5rem;
      padding-inline: 12rem;
    }

    .logo-container {
      order: -2;
      .logo {
        padding-right: 3rem;
        margin: 1.5rem 3.4rem;
      }
    }
    .navlink > span {
      display: inline;
    }
  }
`;

export default Navbar;



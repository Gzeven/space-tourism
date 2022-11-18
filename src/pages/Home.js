import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  HomeBackgroundDesktop,
  HomeBackgroundTablet,
  HomeBackgroundMobile,
} from '../assets';

const containerVariants = {
  hidden: { opacity: 0, x: '100vw' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'tween', delay: 0.3 },
  },
  exit: {
    x: '-100vw',
    transition: { ease: 'easeInOut' },
  },
};

const Home = () => {
  return (
    <Wrapper className="base container">
      <a href="#main" className="skip-to-content">
        Skip to content
      </a>
      <Navbar />
      <motion.section
        id="main"
        className="grid-container grid-container--home"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>
          <h1 className="text-accent heading-5 ff-sans-cond uppercase letter-spacing-1">
            So, you want to travel to
            <span className="d-block heading-1 ff-serif text-white">Space</span>
          </h1>

          <p>
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!{' '}
          </p>
        </div>
        <div className="button-container">
          <Link
            to="/destination"
            className="large-button uppercase ff-serif text-dark "
          >
            Explore
          </Link>
        </div>
      </motion.section>
    </Wrapper>
  );
};

const Wrapper = styled(motion.section)`
  background: url(${HomeBackgroundMobile});
  background-size: cover;
  background-position: center;
  height: 100vh;

  h1 > span {
    margin: 1.5rem 0;
  }

  .grid-container {
    padding-bottom: 0;
  }

  .skip-to-content {
    position: absolute;
    z-index: 9999;
    background: hsl(var(--clr-white));
    color: hsl(var(--clr-dark));
    padding: 0.5em 1em;
    margin-inline: auto;
    transform: translateY(-100%);
    transition: transform 250ms ease-in-out;
    :focus {
      transform: translateY(0);
    }
  }

  .large-button {
    font-size: 1rem;
    position: relative;
    z-index: 1;
    display: inline-grid;
    place-items: center;
    padding: 0 2em;
    margin: 3rem;
    border-radius: 50%;
    aspect-ratio: 1;
    text-decoration: none;
    background: hsl(var(--clr-white));
    ::after {
      content: '';
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: hsl(var(--clr-white) / 0.1);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 500ms linear, transform 750ms ease-in-out;
    }
  }

  .large-button:hover::after,
  .large-button:focus::after {
    opacity: 1;
    transform: scale(1.5);
  }

  @media (min-width: 768px) {
    background: url(${HomeBackgroundTablet});
    background-size: cover;
    background-position: center;

    .grid-container--home {
      margin-top: 8rem;
    }

    .button-container {
      margin: 9.75rem 0 5.625rem;
    }

    .large-button {
      font-size: 2rem;
    }
  }

  @media (min-width: 1200px) {
    background: url(${HomeBackgroundDesktop});
    background-size: cover;
    background-position: center;

    .grid-container--home {
      padding-top: 6rem;
      max-width: var(--max-width);
      margin: 0 auto;
    }

    .button-container {
      justify-self: flex-end;
    }
  }
`;

export default Home;

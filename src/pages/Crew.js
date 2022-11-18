import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import {
  CrewBackgroundMobile,
  CrewBackgroundTablet,
  CrewBackgroundDesktop,
} from '../assets';
import { useTabState, Tab, TabList } from 'reakit/Tab';

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

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Crew = ({ crew }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const tab = useTabState({ orientation: 'horizontal' });

  return (
    <Wrapper>
      <Navbar />
      <motion.section
        id="main"
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="grid-container grid-container--crew">
          <h1 className="numbered-title">
            <span aria-hidden="true">02</span> Meet your crew
          </h1>

          <TabList
            {...tab}
            className="dot-indicators flex"
            aria-label="crew member list"
          >
            {crew.map(({ name }, i) => {
              return (
                <Tab
                  {...tab}
                  key={i}
                  className="uppercase letter-spacing-2 ff-sans-cond text-accent"
                  onClick={() => {
                    setPage([i, i - page]);
                  }}
                  onFocus={() => {
                    setPage([i, i - page]);
                  }}
                >
                  <span className="sr-only">{name}</span>
                </Tab>
              );
            })}
          </TabList>

          <AnimatePresence initial={false} custom={direction}>
            <motion.section
              className="crew-info"
              role="tabpanel"
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  duration: 2,
                },
                opacity: { duration: 0.2 },
              }}
            >
              <header className="flow--space-small">
                <h2 className="heading-4 ff-serif uppercase">
                  {crew[page].role}
                </h2>
                <p className="crew-name heading-3 uppercase ff-serif">
                  {crew[page].name}
                </p>
              </header>
              <p className="crew-bio text-accent">{crew[page].bio}</p>
            </motion.section>
          </AnimatePresence>

          <AnimatePresence initial={false} custom={direction}>
            <motion.picture
              className="image"
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  duration: 2,
                },
                opacity: { duration: 0.2 },
              }}
            >
              <source srcSet={crew[page].images.webp} type="image/webp" />
              <img src={crew[page].images.png} alt={crew[page].name} />
            </motion.picture>
          </AnimatePresence>
        </div>
      </motion.section>
    </Wrapper>
  );
};

const Wrapper = styled(motion.section)`
  background: url(${CrewBackgroundMobile});
  background-size: cover;
  background-position: center;
  height: 100vh;

  .grid-container--crew {
    height: 100%;
    grid-template-areas:
      'title'
      'image'
      'tabs'
      'content';
    padding-inline: 1.5em;
    margin-inline: auto;
    max-width: 80rem;
  }

  .numbered-title {
    grid-area: title;
  }

  .image {
    grid-area: image;
    border-bottom: 1px solid hsl(var(--clr-white) / 0.1);
    width: 100%;

    img {
      margin-inline: auto;
      height: 223px;
    }
  }

  .dot-indicators {
    grid-area: tabs;
    padding-top: 2rem;
  }

  .crew-info {
    grid-area: content;
    text-align: center;

    h2 {
      opacity: 0.5;
      padding: 2rem 0 0.5rem;
    }
    .crew-name {
      color: hsl(var(--clr-white));
      padding-bottom: 1rem;
    }
  }

  @media (min-width: 768px) {
    background: url(${CrewBackgroundTablet});
    background-size: cover;
    background-position: center;

    .grid-container--crew {
      padding-bottom: 0;
      grid-template-areas:
        'title'
        'content'
        'tabs'
        'image';
      padding-inline: 2.4rem;
    }
    .numbered-title {
      justify-self: start;
    }

    .crew-info {
      h2 {
        padding-top: 0;
      }
    }

    .crew-bio {
      max-width: 600px;
    }

    .dot-indicators {
      padding: 2.5rem;
    }
  }

  @media (min-width: 1200px) {
    background: url(${CrewBackgroundDesktop});
    background-size: cover;
    background-position: center;

    .grid-container--crew {
      align-content: start;
      justify-items: start;
      grid-template-areas:
        'title image'
        'content image'
        'tabs image';
      grid-template-columns: 1.2fr 1fr;
      padding-left: 10.438rem;
      max-width: var(--max-width);
    }

    .numbered-title {
      padding: 2.25rem 0 9.625rem;
    }

    .image {
      align-self: end;

      img {
        height: 100%;
        /* max-width: 100%; */
      }
    }

    .crew-info {
      height: 24rem;
      h2 {
        text-align: left;
      }

      .crew-name {
        padding-bottom: 1.688rem;
      }
    }

    .dot-indicators {
      padding: 0 0 5.875rem;
    }
    .crew-bio {
      max-width: 45ch;
      margin: 0;
    }
  }
`;

export default Crew;

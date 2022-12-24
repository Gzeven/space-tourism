import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTabState, Tab, TabList } from 'reakit/Tab';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import {
  TechnologyBackgroundMobile,
  TechnologyBackgroundTablet,
  TechnologyBackgroundDesktop,
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

const variants = {
  enter: {
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const imageVariants = {
  enter: {
    x: '100vw',
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },

  exit: {
    x: '100vw',
    opacity: 0,
  },
};

const Technology = ({ technology }) => {
  const [mobile, setMobile] = useState('horizontal');

  const [[page, direction], setPage] = useState([0, 0]);
  const tab = useTabState({ orientation: mobile });

  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setMobile('horizontal');
    } else {
      setMobile('vertical');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <Wrapper>
      <Navbar />
      <motion.section
        className="container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="grid-container grid-container--technology flow">
          <h1 className="numbered-title">
            <span aria-hidden="true">03</span> Space launch 101
          </h1>

          <TabList
            {...tab}
            aria-label="technology list"
            className="numbered-indicators flex"
          >
            {technology.map(({ name }, i) => {
              const isActive = i === page;
              return (
                <Tab
                  {...tab}
                  key={i}
                  className={
                    isActive ? 'active-header list-buttons ' : 'list-buttons'
                  }
                  onClick={() => {
                    setPage([i, i - page]);
                  }}
                  onFocus={() => {
                    setPage([i, i - page]);
                  }}
                >
                  <span className="fs-600">{`${1 + i}`}</span>
                </Tab>
              );
            })}
          </TabList>

          <AnimatePresence initial={false} exitBeforeEnter custom={direction}>
            <motion.section
              className="content"
              key={page}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <header className="flow flow--space-small">
                <h2 className="subheading-2 ff-serif uppercase text-accent">
                  The terminology...
                </h2>
                <h3 className="heading-3 uppercase ff-serif">
                  {technology[page].name}
                </h3>
              </header>
              <p className="technology-info text-accent ">
                {technology[page].description}
              </p>
            </motion.section>
          </AnimatePresence>

          <AnimatePresence initial={false} exitBeforeEnter custom={direction}>
            <motion.picture
              className="image"
              key={page}
              variants={imageVariants}
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
              <img
                src={technology[page].images.portrait}
                className="portrait"
                alt={technology[page].name}
              />
              <img
                src={technology[page].images.landscape}
                className="landscape"
                alt={technology[page].name}
              />
            </motion.picture>
          </AnimatePresence>
        </div>
      </motion.section>
    </Wrapper>
  );
};

const Wrapper = styled(motion.section)`
  background: url(${TechnologyBackgroundMobile});
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  .grid-container {
    padding-inline: 0;
  }

  .grid-container--technology {
    height: 100%;
    --flow-space: 2rem;
    grid-template-areas:
      'title'
      'image'
      'tabs'
      'content';
    margin-inline: auto;
  }

  .image {
    grid-area: image;

    .portrait {
      display: none;
    }
  }

  .numbered-title {
    grid-area: title;
  }

  .numbered-indicators {
    grid-area: tabs;
  }

  .content {
    grid-area: content;
    margin-inline: 1.5rem;
    h3 {
      margin-top: 0.5rem;
    }
    p {
      margin-top: 1rem;
    }
  }

  @media (min-width: 768px) {
    background: url(${TechnologyBackgroundTablet});
    background-size: cover;

    .grid-container {
      padding-inline: 0;
    }

    .numbered-title {
      justify-self: start;
      padding-left: 2.4rem;
    }

    .image {
      .landscape {
        width: 100vw;
      }
    }

    .content {
      width: 458px;
      h3 {
        margin-top: 1rem;
      }
      p {
        margin-top: 1rem;
      }
    }
  }

  @media (min-width: 1200px) {
    background: url(${TechnologyBackgroundDesktop});
    background-size: cover;
    background-position: center;

    .grid-container--technology {
      align-content: start;
      justify-items: start;
      grid-template-areas:
        'title title title'
        'tabs content image '
        'tabs content image';
      grid-template-columns: 10rem 1.2fr 1fr;
      padding-left: 10.438rem;
      max-width: var(--max-width);
    }

    .image {
      .landscape {
        display: none;
      }

      .portrait {
        display: block;
        width: 100vw;
      }
    }

    .numbered-title {
      padding-left: 0;
      padding: 2.25rem 0 1.625rem;
    }

    .content {
      width: 470px;
    }

    .numbered-indicators {
      display: flex;
      flex-direction: column;

      > * {
        margin: 0.5rem 0rem;
      }
    }
  }
`;

export default Technology;

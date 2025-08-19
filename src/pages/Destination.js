import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import Navbar from '../components/Navbar';
import {
  DestinationBackgroundMobile,
  DestinationBackgroundTablet,
  DestinationBackgroundDesktop,
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
      x: direction > 0 ? 2000 : -2000,
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
      x: direction < 0 ? 2000 : -2000,
      opacity: 0,
    };
  },
};

const Destination = ({ destinations }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const tab = useTabState({ orientation: 'horizontal' });

  return (
    <Wrapper>
      <Navbar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <section className="grid-container grid-container--destination">
          <h1 className="numbered-title">
            <span aria-hidden="true">01</span>Pick your destination
          </h1>

          <TabList
            {...tab}
            className="tab-buttons flex underline-indicators tab-list"
            aria-label="destinations list"
          >
            {destinations.map(({ name }, i) => {
              const isActive = i === page;
              return (
                <Tab
                  {...tab}
                  key={i}
                  className={
                    isActive
                      ? 'active-header list-buttons uppercase letter-spacing-2 ff-sans-cond text-accent '
                      : 'list-buttons uppercase letter-spacing-2 ff-sans-cond text-accent'
                  }
                  onClick={() => {
                    setPage([i, i - page]);
                  }}
                  onFocus={() => {
                    setPage([i, i - page]);
                  }}
                >
                  {name}
                </Tab>
              );
            })}
          </TabList>

          <AnimatePresence initial={false} custom={direction}>
            <motion.article
              className="content destination-info"
              role="tabpanel"
              key={page}
              tabIndex={page}
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
              <h2 className="heading-2 uppercase ff-serif">
                {destinations[page].name}
              </h2>

              <p className="text-accent">{destinations[page].description}</p>
              <div className="destination-meta flex">
                <div>
                  <h3 className="text-accent subheading-2 uppercase">
                    Avg. distance
                  </h3>
                  <p className=" ff-serif uppercase">
                    {destinations[page].distance}
                  </p>
                </div>
                <div>
                  <h3 className="text-accent subheading-2 uppercase">
                    Est. travel time
                  </h3>
                  <p className=" ff-serif uppercase">
                    {destinations[page].travel}
                  </p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <AnimatePresence
            initial={false}
            custom={direction}
            className="image-container"
          >
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
                opacity: { duration: 1.2 },
              }}
            >
              <source
                srcSet={destinations[page].images.webp}
                type="image/webp"
              />
              <img
                src={destinations[page].images.png}
                alt={destinations[page].name}
              />
            </motion.picture>
          </AnimatePresence>
        </section>
      </motion.div>
    </Wrapper>
  );
};

const Wrapper = styled(motion.section)`
  background: url(${DestinationBackgroundMobile});
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  .destination-meta {
    p {
      color: hsl(var(--clr-white));
      margin-top: 0.75rem;
    }
  }

  .grid-container--destination {
    height: 100%;
    --flow-space: 2rem;
    grid-template-areas:
      'title'
      'image'
      'tabs'
      'content';
    padding-inline: 1.5em;
    margin-inline: auto;
  }

  .destination-meta {
    flex-direction: column;
    border-top: 1px solid hsl(var(--clr-white) / 0.1);
    padding-top: 2rem;
    margin-top: 2.5rem;
  }

  .destination-meta p {
    font-size: 1.75rem;
  }

  .image {
    grid-area: image;
    align-self: start;
    img {
      max-width: 70%;
      margin-inline: auto;
    }
  }

  .numbered-title {
    grid-area: title;
  }
  .tab-buttons {
    grid-area: tabs;
    cursor: pointer;
    margin-top: 1.625rem;
  }

  .content {
    grid-area: content;
    margin-top: 1.25rem;
  }

  @media (min-width: 768px) {
    background: url(${DestinationBackgroundTablet});
    background-size: cover;
    background-position: center;

    .grid-container--destination {
      padding-inline: 2.4rem;
    }

    .numbered-title {
      justify-self: start;
    }

    .tab-buttons {
      margin-top: 3.25rem;
    }

    .content {
      margin-top: 2rem;
    }

    .destination-info {
      margin-inline: 4rem;
    }

    .destination-meta {
      flex-direction: row;
      justify-content: space-evenly;
      margin-top: 3rem;
      padding-top: 1.75rem;
    }

    .image {
      img {
        max-width: 60%;
      }
    }
  }

  @media (min-width: 1200px) {
    background: url(${DestinationBackgroundDesktop});
    background-size: cover;
    background-position: center;

    .grid-container--destination {
      align-content: start;
      justify-items: start;
      grid-template-areas:
        'title title'
        '. tabs'
        'image content';
      grid-template-columns: 1.5fr 1fr;
      padding-inline: 10.438rem;
      max-width: var(--max-width);
    }
    .destination-info {
      margin-inline: 0;
    }

    .destination-meta {
      justify-content: start;
    }

    .numbered-title {
      padding: 2.25rem 0 4rem;
    }

    .tab-buttons {
      margin: 0;
    }

    .image {
      align-self: center;

      img {
        max-width: 100%;
        margin-left: 4rem;
      }
    }
    .destination-meta {
      gap: 5rem;
    }
  }
`;

export default Destination;

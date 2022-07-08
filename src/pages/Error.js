import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Astronaut } from '../assets';

const Error = () => {
  return (
    <Wrapper>
      <section>
        <h1 className="errorcode">404</h1>
        <h3 className="errortext numbered-title">
          {' '}
          It seems like you have been lost in space
        </h3>
        <Link className="large-button uppercase ff-serif text-dark " to="/">
          Bring me back to Earth
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  background: url(${Astronaut});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  padding-inline: 2rem;

  .errorcode {
    color: hsl(var(--clr-white));
    font-size: 8rem;
    margin-bottom: 4rem;
  }

  .errortext {
    color: hsl(var(--clr-white));
    font-size: 1rem;
  }
  .large-button {
    background-color: hsl(var(--clr-white));
    border-radius: 12px;
    border: 2px solid hsl(var(--clr-light));
    display: inline-block;
    cursor: pointer;
    color: hsl(var(--clr-dark));
    font-size: 12px;
    padding: 14px 47px;
    text-decoration: none;
  }
  .large-button:hover {
    background-color: hsl(var(--clr-light));
  }
  .large-button:active {
    position: relative;
    top: 1px;
  }

  @media (min-width: 768px) {
    .errorcode {
      font-size: 12rem;
      margin-bottom: 2rem;
    }

    .errortext {
      font-size: 1.4rem;
    }
    .large-button {
      font-size: 24px;
    }
  }

  @media (min-width: 1200px) {
    .errorcode {
      font-size: 12rem;
    }

    .errortext {
      font-size: 3rem;
    }
    .large-button {
      font-size: 24px;
    }
  }
`;

export default Error;

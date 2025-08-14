import './index.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Home, Destination, Crew, Technology, Error } from './pages';
import styled from 'styled-components';
import { data } from '../src/assets/data';


function App() {
  const location = useLocation();
  const destinations = data[0].destinations;
  const crew = data[0].crew;
  const technology = data[0].technology;

  return (
    <Wrapper>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="destination"
            element={<Destination destinations={destinations} />}
          />
          <Route path="crew" element={<Crew crew={crew} />} />
          <Route
            path="technology"
            element={<Technology technology={technology} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background: #000;

  @media (min-width: 768px) {
  }

  @media (min-width: 1200px) {
  }
`;

export default App;

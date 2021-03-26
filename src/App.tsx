import React from 'react';
import styled from 'styled-components';
import Table from './companents/Table';
import Searches from './companents/Searches';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;
const SearchesContainer = styled.div`
    position: absolute;
    width: 220px;
    left: -230px;
    @media(max-width: 1500px) {
      position: relative;
      width: 100%;
      left: 0;
    }
`;




function App() {
  return (
    <Container>
      <SearchesContainer>
        <Searches />
      </SearchesContainer>
      <Table />
    </Container>
  );
}

export default App;

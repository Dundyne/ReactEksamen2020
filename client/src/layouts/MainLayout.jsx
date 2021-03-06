import React from 'react';
import { Box } from '@chakra-ui/core';
import styled from 'styled-components';
import Nav from '../components/Nav';

const StyledHeader = styled.header`
  background: #fff;
  box-shadow: 1px 1px 2px #f5f5f5;
  width: 100%;
`;

// eslint-disable-next-line react/prop-types
const MainLayout = ({ children }) => (
  <Box>
    <StyledHeader>
      <Nav />
    </StyledHeader>
    <Box w="100%" padding="0 20px" margin="0 auto">
      {children}
    </Box>
  </Box>
);

export default MainLayout;

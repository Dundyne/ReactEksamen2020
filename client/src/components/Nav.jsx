import { Button } from '@chakra-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled.button`
display: block; 
width: 120px;
height: 100% ; 
background-color: #4198e5; 
color: white;
`;

const StyledNav = styled.nav`

width: 100%;
  
`;

const NavMenu = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  padding: 0 20px;
  align-items: center;
  justify-content: flex-end;
`;

const NavMenuItem = styled.li`
  padding: 0 20px;
  display: block;
  
  &:first-child {
    padding-left: 0;
  }

  & > a {
    color: #000;
    display: flex; 
    
    font-family: Roboto-Black, sans-serif;
    font-size: 18px;
    font-weight: bold;
    box-sizing: border-box;
    line-height: 3.456;
    padding: 5px 0;
    text-decoration: none;

    &.active {
      color: #4198e5;
     
    }
    &.button.active {
      color: black;
    }
  }
`;

const Nav = () => {
  return(
  <StyledNav>
  <NavMenu>
    <NavMenuItem>
      <NavLink exact to="/" activeClassName="active">
        Hjem
      </NavLink>
    </NavMenuItem>
    <NavMenuItem>
      <NavLink exact to="/kontorer" activeClassName="active">
        Kontorer
      </NavLink>
    </NavMenuItem>
    <NavMenuItem>
      <NavLink exact to="/artikkel" activeClassName="active">
        Fagartikler
      </NavLink>
    </NavMenuItem>
    <NavMenuItem>
      <NavLink exact to="/test3" activeClassName="active">
        Kontakt
      </NavLink>
    </NavMenuItem>
      <NavMenuItem>
      <NavLink exact to="/test4" activeClassName="active">

        <StyledButton>LOGG INN</StyledButton>

        </NavLink>
        </NavMenuItem>
      
  </NavMenu>
</StyledNav>
);}

export default Nav;
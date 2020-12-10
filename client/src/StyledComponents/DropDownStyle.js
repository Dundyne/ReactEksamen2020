import styled from 'styled-components';

const Main = styled.div`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled.div`
  width: 10.5em;
`;

const DropDownHeader = styled.div`
  margin-bottom: 0;
  padding: auto;
  width: 120px;
  height: 75px;
  background-color: #f5f1f1;
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: 15px;
`;
/*
padding: 0.4em 2em 0.4em 1em;
width: 120px;
height: 75px; 
background-color: #f5f1f1; 
color: black;
font-weight: bold;
font-size: 15px;
*/

const DropDownListContainer = styled.div``;

const DropDownList = styled.ul`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  
}
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 0.8em;

  &.active {
    color: black;
  }
`;

export {
  Main,
  DropDownContainer,
  DropDownHeader,
  DropDownListContainer,
  DropDownList,
  ListItem,
};

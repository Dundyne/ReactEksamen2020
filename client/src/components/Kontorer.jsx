import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { NavLink } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component';
// eslint-disable-next-line import/named
import { Styles } from '../StyledComponents/index.js';
import listSort from '../images/list_sort.png';
import gridSort from '../images/grid_sort.png';
import officeService from '../utils/officeService.js';
// From https://www.npmjs.com/package/styled-dropdown-component

export const TitleBox = styled.header`
  height: 300px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 30px;
  height: 30px;
  margin: 15px;
`;

const GridContainer = styled.article`
  width: 95%;
  margin: auto;
`;
const Title = styled.h1`
  text-align: center;
  line-height: 300px;
  height: 150px;
  font-size: 50px;
  font-weight: bold;
`;
const CompanyCard = styled.section`
    display: flex;
    flex-wrap: wrap;
    
    height: 150px;
    padding: 20px;
    margin: 0, 20px;
    border 1px solid black;

`;

const FilterBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledFilterButton = styled.button`
  width: 120px;
  height: 75px;
  background-color: #f5f1f1;
  color: black;
  font-weight: bold;
  font-size: 15px;
`;

const Kontorer = () => {
  const [offices, setOffices] = useState([]);

  const [useListView, setUseListView] = useState(false);
  const [error, setError] = useState(null);
  const [, setLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  const dropDownCities = [...new Set(offices.map((item) => item.city))];

  const [selectedOption, setSelectedOption] = useState(null);
  const [hidden, setHidden] = useState(true);

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  const mappedOffices = groupBy(offices, (office) => office.city);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // eslint-disable-next-line import/no-named-as-default-member
      const { data } = await officeService.list();
      if (!data.success) {
        setError(error);
      } else {
        setOffices(data.data);
        setFilteredCities([...new Set(data.data.map((item) => item.city))]);
        setError(null);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    if (value === 'Alle') {
      setFilteredCities(dropDownCities);
    } else {
      setFilteredCities([value]);
    }

    console.log(selectedOption);
  };

  const handleOnClickGrid = () => {
    setUseListView(false);
  };

  const handleOnClickList = () => {
    setUseListView(true);
  };

  const Header = () => (
    <>
      <Cell width={4}>
        <NavLink exact to="/kontorerForm" activeClassName="active">
          <StyledFilterButton>Lag et kontor</StyledFilterButton>
        </NavLink>
      </Cell>
      <Cell width={8}>
        <FilterBox>
          <Dropdown>
            <StyledFilterButton
              dropdownToggle
              onClick={() => setHidden(!hidden)}
              // https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
            >
              {selectedOption || 'Alle'}
            </StyledFilterButton>
            {!hidden && (
              <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
                {dropDownCities.map((option) => (
                  <DropdownItem
                    onClick={onOptionClicked(option)}
                    activeClassName="active"
                    key={Math.random()}
                  >
                    {option}
                  </DropdownItem>
                ))}
                <DropdownItem
                  onClick={onOptionClicked('Alle')}
                  activeClassName="active"
                >
                  Alle
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>

          <Logo src={listSort} onClick={handleOnClickList} />
          <Logo src={gridSort} onClick={handleOnClickGrid} />
        </FilterBox>
      </Cell>
    </>
  );

  const ListView = () =>
    filteredCities.map((city) => {
      // eslint-disable-next-line no-shadow
      const offices = mappedOffices.get(city);
      return offices ? (
        <>
          <Cell width={12}>
            <Styles.Title>{city}</Styles.Title>
          </Cell>
          {offices.map((office, index) => (
            <Cell width={12}>
              <CompanyCard>
                <NavLink to={`kontorVisning/${office._id}`}>
                  Trykk her for å se mer...
                </NavLink>
                <h1>Text:{office._id}</h1>
                <p key={index}>Nummer:{index}</p>
                <p>Text{office.email}</p>
                <p>Text{office.city}</p>
              </CompanyCard>
            </Cell>
          ))}
        </>
      ) : null;
    });
  const GridView = () =>
    filteredCities.map((city) => {
      // eslint-disable-next-line no-shadow
      const offices = mappedOffices.get(city);
      return offices ? (
        <>
          <Cell width={12}>
            <Styles.Title>{city}</Styles.Title>
          </Cell>
          {offices.map((office, index) => (
            <Cell width={3}>
              <CompanyCard>
                <NavLink to={`kontorVisning/${office._id}`}>
                  Trykk her for å se mer...
                </NavLink>
                <h1>Text:{office._id}</h1>
                <p key={index}>Nummer:{index}</p>
                <p>Text{office.email}</p>
                <p>Text{office.city}</p>
              </CompanyCard>
            </Cell>
          ))}
        </>
      ) : null;
    });

  //                                {idex==0 ? <div><Logo src={listSort} onClick={handleOnClickGrid} />
  // <Logo src={gridSort} onClick={handleOnClickList} /> </div>: null}

  return (
    <>
      <Styles.TitleBox>
        <h1>
          <Title>Våre Kontorer</Title>
        </h1>
      </Styles.TitleBox>

      <GridContainer>
        <Grid columns={12} justify-content="space-between">
          <Header />
          {useListView ? <ListView /> : <GridView />}
        </Grid>
      </GridContainer>
    </>
  );
};

export default Kontorer;

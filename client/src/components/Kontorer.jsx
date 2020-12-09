import styled from "styled-components";
import React, { useState, useEffect, useMemo } from "react";
import { Styles } from "../StyledComponents/index.js";
import { Grid, Cell } from "styled-css-grid";
import listSort from "../images/list_sort.png";
import gridSort from "../images/grid_sort.png";
import { NavLink } from "react-router-dom";
import officeService from "../utils/officeService.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
//From https://www.npmjs.com/package/styled-dropdown-component

export const TitleBox = styled.header`
  height: 300px;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const DivButton = styled.div`
  background-image: url(${listSort});
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

const ListViewContainer = styled.section`
  display: block;
  width: 200px;
  height: 200px;
  background-color: gray;
  color: white;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const OfficeButtonContainer = styled.button`
  display: flex;
`;

const Kontorer = () => {
  const [offices, setOffices] = useState([]);

  const [useListView, setUseListView] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  const dropDownCities = [...new Set(offices.map((item) => item.city))];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hidden, setHidden] = useState(true);

  const mappedOffices = groupBy(offices, (office) => office.city);

  // const [ searchString, setSearchString ] = useState("")

  const unique = [...new Set(offices.map((item) => item.city))];

  //const searchFilteredOffices = offices.filter(office.value.includes(searchString))

  //const grouped = groupBy(pets, pet => pet.type);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    if (value == "Alle") {
      setFilteredCities(dropDownCities);
    } else {
      setFilteredCities([value]);
    }

    setIsOpen(false);
    console.log(selectedOption);
  };

  const handleOnClickGrid = () => {
    setUseListView(false);
  };

  const handleOnClickList = () => {
    setUseListView(true);
  };

  const handleOnClickFilter = (city) => {
    filteredCities = [city];
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
              //https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
            >
              {selectedOption || "Alle"}
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
                  onClick={onOptionClicked("Alle")}
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
      const offices = mappedOffices.get(city);
      return offices ? (
        <>
          <Cell width={12}>
            <Styles.Title>{city}</Styles.Title>
          </Cell>
          {offices.map((office, index) => (
            <Cell width={12}>
              <CompanyCard>
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
      const offices = mappedOffices.get(city);
      return offices ? (
        <>
          <Cell width={12}>
            <Styles.Title>{city}</Styles.Title>
          </Cell>
          {offices.map((office, index) => (
            <Cell width={3}>
              <CompanyCard>
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
        <Grid columns={12} justify-content="space-between" >
          <Header />
          {useListView ? <ListView /> : <GridView />}
        </Grid>
      </GridContainer>
    </>
  );
};

export default Kontorer;

/**
 *         {useListView
          ? filteredCities.map(
            (city, index) =>
                offices &&
                offices
                  .filter((office) => office.city == city)
                  .map((office) => (
                    <Grid columns={12}>
                      <Cell width={12}>
                        <Styles.Title>{city}</Styles.Title>
                      </Cell>
                      <p>
                        {office.name}
                        
                        {office.email}
                        {office.city}
                      </p>
                    </Grid>
                  ))
                  )

          : filteredCities.map(
              (city) =>
                offices &&
                offices
                  .filter((office) => office.city == city)
                  .map((office, index) => 

                    
                        {index==0 ? 
                            <Grid columns={12}>
                            <Cell width={12}>
                        <Styles.Title>{city}</Styles.Title>
                      </Cell>
                      </Grid> : null }
                      
                      
                      
                        <Cell width={3}>
                          <CompanyCard>
                            <h1>Text:{office.name}</h1>
                            <p key={index}>Nummer:{index}</p>
                            <p>Text{office.email}</p>
                            <p>Text{office.city}</p>
                          </CompanyCard>
                        </Cell>
                      
                  ))
            }
 */

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Styles } from "../StyledComponents/index.js";
import { Grid, Cell } from "styled-css-grid";
import listSort from "../images/list_sort.png";
import gridSort from "../images/grid_sort.png";
import { NavLink } from "react-router-dom";
import articleService from "../utils/articleService.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
const Button = styled.button`
  width: 100%;
  background-color: #4198e5;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover ${Button} {
    background-color: #1fe7ed;
  }
`;

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
    max-width: 300px;
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
const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;
const OfficeButtonContainer = styled.button`
  display: flex;
`;

const Fagartikler = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredCategories, setFilteredCategories] = useState([""]);
  const dropDownCategories = [
    ...new Set(articles.map((item) => item.category)),
  ];

  //const searchFilteredCategories = filteredCategories.map

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hidden, setHidden] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const handleChange = (val) => {
    setSearchInput(val);
  };
  const mappedArticles = groupBy(articles, (article) => article.category);

  //const [ page, setPage ] = useState(0)
  const unique = [...new Set(articles.map((item) => item.category))];
  console.log(unique);

  const [searchString, setSearchString] = useState("");

  console.log(searchString);

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
      const { data } = await articleService.list();
      if (!data.success) {
        setError(error);
      } else {
        setArticles(data.data);
        setFilteredCategories([
          ...new Set(data.data.map((item) => item.category)),
        ]);
        setError(null);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(searchText);
  };

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    if (value == "Alle") {
      setFilteredCategories(dropDownCategories);
    } else {
      setFilteredCategories([value]);
    }

    setIsOpen(false);
    console.log(selectedOption);
  };

  const handleOnClickFilter = (category) => {
    filteredCategories = [category];
  };

  const GridView = () =>
    filteredCategories.map((category) => {
      const articles = mappedArticles.get(category);
      return articles ? (
        <>
          {articles.map((article, index) => (
            <Cell width={12}>
            <CompanyCard>
              <NavLink to={`artikkelVisning/${article._id}`}>
              Trykk her for å se mer...
              </NavLink>
              <h1>ID:        {article._id}</h1>
              <h1>Tittel:        {article.title}</h1>
              <p>Ingress:    {article.ingress}</p>
              
            </CompanyCard>
            </Cell>
          ))}
        </>
      ) : null;
    });

  const Header = () => (
    <>
      <Cell width={4}>
        <NavLink exact to="/fagartikkelForm" activeClassName="active">
          <StyledFilterButton>Lag en artikkel</StyledFilterButton>
        </NavLink>
      </Cell>
      <Cell width={8}>
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => handleChange(e.target.value)}
        />

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
                {dropDownCategories.map((option) => (
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
        </FilterBox>
      </Cell>
    </>
  );

  return (
    <>
      <Styles.TitleBox>
        <h1>
          <Title>Fagartikler</Title>
        </h1>
      </Styles.TitleBox>
      <GridContainer>
        <Grid columns={12}>
          <Cell width={4}>
            <NavLink exact to="/fagartikkelForm" activeClassName="active">
              <StyledFilterButton>Lag en artikkel</StyledFilterButton>
            </NavLink>
          </Cell>
          <Cell width={8}>
            <Input
              type="text"
              value={searchInput}
              onChange={(e) => handleChange(e.target.value)}
            />

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
                  <DropdownMenu
                    hidden={hidden}
                    toggle={() => setHidden(!hidden)}
                  >
                    {dropDownCategories.map((option) => (
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
            </FilterBox>
          </Cell>

          <GridView />
        </Grid>
      </GridContainer>
    </>
  );
};

export default Fagartikler;

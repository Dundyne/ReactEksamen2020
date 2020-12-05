import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { Styles } from '../StyledComponents/index.js';
import {Grid, Cell} from 'styled-css-grid';
import listSort from '../images/list_sort.png';
import gridSort from '../images/grid_sort.png';

export const TitleBox = styled.header`
    height: 300px;
    box-shadow: 
       inset 0 -3em 3em rgba(0,0,0,0.1), 
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
    margin-bottom: 20px;

`
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
`
const Title = styled.h1`
    text-align:center;
    line-height:300px;
    height:150px;
    font-size:50px;
    font-weight: bold;

`
const CompanyCard = styled.section`
    height: 150px;
    padding: 20px;
    margin:20px;
    border 1px solid black;

`

const FilterBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 20px;
`

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

`


function filter(By){
 // 
 // 
    // Foreach Kontor in Kontorlist

}

const Kontorer = () => {

    const [ offices, setOffices ] = useState([])
    const [ filteredOffices, setFilteredOffices ] = useState([])
    const [ useListView, setUseListView ] = useState(false)

    /*
    useEffect(() => {
        officeService.list()
        .then(res => {
            console.log(res)
            setOffices(res)
        })
        .catch(err => console.err("Error:",err))
    }, [])
    */

    const handleOnClickGrid = () => {
        setUseListView(false)
    }
    
        
    const handleOnClickList = () => {
        setUseListView(true)
    }

    return( 
       <>
       
        <Styles.TitleBox><h1><Title>Våre Kontorer</Title></h1></Styles.TitleBox>
        <GridContainer>
        <Grid columns={12}>
            <Cell width={4}><Styles.Title>Fredrikstad(8 kontorer)</Styles.Title></Cell>
            <Cell width={8}>
                <FilterBox>
                    <StyledFilterButton>FILTER</StyledFilterButton>
                    <Logo src={listSort} onClick={handleOnClickGrid} />
                    <Logo src={gridSort} onClick={handleOnClickList} />
                    <DivButton ></DivButton>
                </FilterBox>

            </Cell>
            <Cell width={12}>

            {
                useListView 
                ? <div offices={offices}>LIST VIEW</div>
                : (
                    <Grid columns={12}>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>
                <Cell width={3}>
                <CompanyCard>
                    <h1>Rørlegger $nummer</h1>
                    <p>69 99 00 00</p>
                    <p>$lokasjon$nummer@epost.no</p>
                </CompanyCard>
                </Cell>

            </Grid>
                )
            }
            
            </Cell>
        </Grid>
        </GridContainer>
        </>


    );
}

export default Kontorer; 


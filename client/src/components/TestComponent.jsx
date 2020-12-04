import styled from 'styled-components';
import React from 'react';
import { StyledButtons } from '../StyledComponents/index.js';
import {Grid, Cell} from 'styled-css-grid';

const GridContainerMainPage = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px;
`
//vi syntes box shadow var vanskelig så vi lånte kode fra: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
const MainBox = styled.div`
    height: 300px;
    box-shadow: 
       inset 0 -3em 3em rgba(0,0,0,0.1), 
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
`
const Title = styled.h1`
    text-align:center;
    line-height:300px;
    height:150px;
    font-size:50px;
    font-weight: bold;

`

const GridContainerArticlePage = styled.main`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px;
    grid-gap: 100px;
    padding-top: 40px;
    border: 4px solid black;
`

const TestComponent = () => {
    return(
        <>
        <Grid columns={12}>
        <Cell width={12}>
            <MainBox><h1><Title>Velkommen til FG Rørlegerservice AS</Title></h1></MainBox>
        </Cell>
        <Cell width={8}><h1>Fredrikstad</h1></Cell>
        <Cell width={4}>Filter</Cell>
        <Cell width={10}>
            <Grid columns="repeat(auto-fit,minmax(400px,1fr))">
                <div>
                    <h1>Rumpe</h1>
                    <p>Rørlegger</p>
                </div>
            </Grid>
        </Cell>
        <Cell width={1}></Cell>
        </Grid>

        </>
    );
}

export default TestComponent; 

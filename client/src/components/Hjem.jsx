import styled from 'styled-components';
import React from 'react';
import { Styles } from '../StyledComponents/index.js';
import {Grid, Cell} from 'styled-css-grid';

const GridContainerMainPage = styled.main`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 100px;
`
//vi syntes box shadow var vanskelig så vi lånte kode fra: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow


const MainBox = styled.section`
    height: 300px;
    box-shadow: 
       inset 0 -3em 3em rgba(0,0,0,0.1), 
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
    margin: 20px;
`
const Title = styled.h1`
    text-align:center;
    line-height:300px;
    height:150px;
    font-size:50px;
    font-weight: bold;

`
const GridContainer = styled.article`
    width: 95%;
    margin: auto;
`

const Hjem = () => {
    return(
        <>
        <Styles.TitleBox><h1><Title>Velkommen til FG Rørleggerservice AS</Title></h1></Styles.TitleBox>
        
        <GridContainer>
        <Grid columns={12}>
            <Cell width={3}><MainBox><Title>Kontorer</Title></MainBox></Cell>
            <Cell width={9}><MainBox><Title>Kontorer</Title></MainBox></Cell>
            <Cell width={12}><MainBox><Title>Kontorer</Title></MainBox></Cell>
        </Grid>
        </GridContainer>
        </>
    );
}

export default Hjem; 

/*
            <Grid columns="repeat(auto-fit,minmax(400px,1fr))">
                <div>
                    <MainBox><h1>Rumpe</h1></MainBox>
                    <p>Rørlegger</p>
                </div>
            </Grid>*/
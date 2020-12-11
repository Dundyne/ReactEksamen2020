import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { get } from '../utils/officeService';
// eslint-disable-next-line import/named
import { Styles } from '../StyledComponents/index.js';

const Title = styled.h1`
  text-align: center;
  line-height: 300px;
  height: 150px;
  font-size: 50px;
  font-weight: bold;
`;
const FlexContainer = styled.div`
  display: grid;
  max-width: 90%;
  margin: 0 auto;
  align-items: center;
`;

const IngressParagraph = styled.p`
  padding-top: 20px;
  text-align: left;
  font-size: 20px;
  font-familiy: Times New Roman;
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-top: 30px;
`;

const CompanyCard = styled.section`
    display: flex;
    flex-wrap: wrap;
    
    height: 150px;
    padding: 20px;
    margin: 0, 20px;
    border 1px solid black;

`;

const KontorVisning = () => {
  const { id } = useParams();
  const [office, setOffice] = useState(null);
  const employees = [];

  // Hadde ikke så mye tid til å fikse i backend så hardkoder ansatte og tekst.

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < 10; index++) {
    employees.push({
      navn: `ansatt${index.toString()}`,
      stilling: `slave${index}`,
    });
  }

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data } = await get(id);
        setOffice(data.data);
      };
      fetchData();
    }
  }, [id]);

  return (
    <>
      {office && (
        <office>
          <Styles.TitleBox>
            <h1>
              <Title>{office.name}</Title>
            </h1>
          </Styles.TitleBox>
          <FlexContainer>
            <Grid columns={12}>
              <Cell width={12}>
                <TitleText>Velkommen til {office.name}</TitleText>
              </Cell>

              <Cell width={12}>
                <IngressParagraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sed lectus tellus. Nunc id consequat eros, sed
                  fringilla libero. Nam quis felis eget lorem facilisis pulvinar
                  vitae ut ligula. Donec at lorem nec dolor egestas sodales id
                  nec nunc. Aliquam est quam, aliquam sit amet mi ac, luctus
                  maximus leo. Cras interdum diam id placerat tempus. Etiam
                  auctor dolor auctor rhoncus finibus. Praesent vel sapien a sem
                  rutrum convallis ac aliquam magna. Sed fringilla sodales
                  viverra. Morbi a viverra justo. Donec at urna ut leo ultrices
                  laoreet. Sed at tellus lacinia, mollis massa non, porta risus.
                  Vestibulum commodo felis in aliquam bibendum.{' '}
                </IngressParagraph>
              </Cell>
              <Cell width={12}>
                <TitleText>Våre ansatte</TitleText>
              </Cell>
              {employees.map((employee) => (
                <Cell width={2}>
                  <CompanyCard>
                    <p>{employee.navn}</p>
                    <p>{employee.stilling}</p>
                  </CompanyCard>
                </Cell>
              ))}
              <Cell width={12}>
                <Styles.TitleBox>
                  <h1>
                    <Title>Kontakt oss {office.number}</Title>
                  </h1>
                </Styles.TitleBox>
              </Cell>
            </Grid>
          </FlexContainer>
        </office>
      )}
    </>
  );
};

export default KontorVisning;

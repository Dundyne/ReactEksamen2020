import React, { useState, useEffect } from 'react';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';
import { get, remove } from '../utils/articleService';

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
  max-width: 800px;
  margin: 0 auto;
  align-items: center;
`;

const IngressParagraph = styled.p`
  padding-top: 20px;
  text-align: center;
  font-size: 20px;
  font-familiy: Times New Roman;
`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: bold;
  padding-top: 30px;
`;

const TitleText1 = styled.p`
  float: right;
  font-size: 20px;
  font-weight: bold;
  padding-top: 30px;
`;

const TitleMain = styled.p`
  font-size: 50px;
  font-weight: bold;
  padding-top: 40px;
`;
const BottomText = styled.p`
  font-size: 25px;
  font-weight: bold;
  padding-top: 40px;
`;

const StyledButtonRed = styled.button`

background-color: #fa4343; /* Green */
  border: none;
  color: white;
  padding: 30px 80px;
  padding-top: 40px
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  margin-bottom: 120px;
  font-familiy: Garamond, serif;
  font-weight: bold;
 

&:hover {
  background-color: #bf3708;
}


`;
const StyledButtonGreen = styled.button`
  background-color: #abd32e; /* Green */
  border: none;
  color: white;
  padding: 30px 80px;
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  font-familiy: Garamond, serif;
  font-weight: bold;

  &:hover {
    background-color: #7fbf08;
  }
`;

const ArtikkelVisning = () => {
  const history = useHistory();

  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const { data } = await get(id);
        setArticle(data.data);
      };
      fetchData();
    }
  }, [id]);

  const deleteArticle = async () => {
    await remove(id);
    alert('Article Deleted!');
    setTimeout(() => {
      history.push(`/fagartikler`);
    }, 2000);
  };
  return (
    <>
      {article && (
        <article>
          <Styles.TitleBox>
            <h1>
              <Title>{article.title}</Title>
            </h1>
          </Styles.TitleBox>

          <FlexContainer>
            <Grid columns={12}>
              <Cell width={6}>
                <TitleText>{article.author}</TitleText>
              </Cell>
              <Cell width={6}>
                <TitleText1>{article.date}</TitleText1>
              </Cell>

              <Cell width={6}>
                <TitleText>
                  <p>Created by admin</p>
                </TitleText>
                {article.admin}
              </Cell>

              <Cell width={12}>
                <IngressParagraph>{article.ingress}</IngressParagraph>
              </Cell>

              <Cell width={12}>
                <TitleMain>Subtittel</TitleMain>
              </Cell>

              <Cell width={12}>
                <IngressParagraph>{article.content}</IngressParagraph>
              </Cell>

              <Cell width={12}>
                <TitleMain>Subtittel</TitleMain>
              </Cell>

              <Cell width={12}>
                <IngressParagraph>{article.content}</IngressParagraph>
              </Cell>

              <Cell width={12}>
                <BottomText>{article.category}</BottomText>
              </Cell>

              <Cell width={12}>
                <p>{article.clicks} så mange klikks</p>
              </Cell>

              <Cell width={6}>
                <BottomText>
                  <StyledButtonRed onClick={deleteArticle}>
                    SLETT
                  </StyledButtonRed>
                </BottomText>
              </Cell>
              <Cell width={6}>
                <BottomText>
                  <NavLink to={`fagartikkelRedigering/${article._id}`}>
                    <StyledButtonGreen>REDIGER</StyledButtonGreen>
                  </NavLink>
                </BottomText>
              </Cell>
            </Grid>
          </FlexContainer>
        </article>
      )}
    </>
  );
};

export default ArtikkelVisning;

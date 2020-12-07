
//import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import articleService from '../utils/articleService.js'

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

const Fagartikler = () => {

    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    
    const mappedOffices = groupBy(offices, office => office.city)

    const [ page, setPage ] = useState(0)

    const [ searchString, setSearchString ] = useState("")


   useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await articleService.list();
      if (!data.success) {
        setError(error);
      } else {
        setArticles(data.data);
        setError(null);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


    return (
        <>
        
        {error && <p>{error}</p>}
        <div>
          {loading && <div>Loading ... </div>}
            {
                articles && articles.map((article) => (
                    <div>
                        <p>{"Rørlegger" + article.title}</p>
                        <p>{article.content}</p>
                    </div>
                ))
            }

            <input 
              onChange={(event) => setSearchString(current.target.value)} 
              value={searchString}
            >

            </input>

        </div>
       </>
    )
}

export default Fagartikler; 
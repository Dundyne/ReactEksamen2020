
//import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import articleService from '../utils/articleService.js'

const Fagartikler = () => {

    const [articles, setArticles] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


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
        </div>
       </>
    )
}

export default Fagartikler; 
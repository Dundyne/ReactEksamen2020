import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { get, put } from '../utils/articleService';

const ArtikkelVisning = () => {
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

      return(
          <>
          {article && <div>{article.title}</div>}
          
          </>
      )
}

export default ArtikkelVisning; 

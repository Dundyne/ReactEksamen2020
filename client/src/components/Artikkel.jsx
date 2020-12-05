
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import articleService from '../utils/articleService.js'

const Artikkel = () => {

    const [ articles, setArticles ] = useState([])

    useEffect(() => {
        articleService.list()
        .then(res => {
            console.log(res)
            setArticles(res)
        })
        .catch(err => console.err("Error:",err))
    }, [])


    return (
        <div>
            {
                 articles.map(article => (
                    <div>
                        <p>{"Rørlegger" + article.title}</p>
                        <p>{article.content}</p>
                    </div>
                ))
            }
        </div>
       
    )
}
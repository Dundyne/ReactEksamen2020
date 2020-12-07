import styled from 'styled-components';
import React, { useState } from 'react';
import { Styles } from '../StyledComponents/index.js';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { create } from '../utils/articleService';

const FormContainer = styled.form`
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    
`
const Title = styled.h1`
    text-align:center;
    line-height:300px;
    height:150px;
    font-size:50px;
    font-weight: bold;

`
const Input = styled.input`
    width: 100%

`

const FormLabel = styled.label`
    margin-top:10px;
    width: 100%
    
`
const Button = styled.button`
    margin-top: 10px;
    width: 120px;
    height: 100% ; 

`

const FagartikkelForm = () => {
  const [closeBtnState, setCloseBtnState] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //Skjønner ikke history
  const history = useHistory();

  const { register, errors, handleSubmit, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (formData) => {
    const { data } = await create(formData);
    if (!data.success) {
      setCloseBtnState(true);
      setError(data.message);
    } else {
      setSuccess(true);
      setError(null);
      console.log(formData);
      setTimeout(() => {
        history.push(`/articles/${data.data.id}`);
      }, 2000);
    }
  };

    return(
        <>
        <Styles.TitleBox><h1><Title>Velkommen til FG Rørleggerservice AS</Title></h1></Styles.TitleBox>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="title">Tittel</FormLabel>
                <Input
                    type="title"
                    name="title"
                    id="title"
                    placeholder="title"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="ingress">Ingress</FormLabel>
                <Input
                    type="ingress"
                    name="ingress"
                    id="ingress"
                    placeholder="ingress"
                    ref={register({
                        required: true,
                    })}/>
                
                <FormLabel htmlFor="content">Innhold</FormLabel>
                <Input
                    type="content"
                    name="content"
                    id="content"
                    placeholder="content"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="date">Dato</FormLabel>
                <Input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="date"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="author">Forfatter</FormLabel>
                <Input
                    type="author"
                    name="author"
                    id="author"
                    placeholder="author"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="category">Kategori</FormLabel>
                <Input
                    type="category"
                    name="category"
                    id="category"
                    placeholder="category"
                    ref={register({
                        required: true,
                    })}/>

                    <Button
                        isLoading={formState.isSubmitting}
                        type="submit">
                            Lag ny artikkel
                        </Button>
                
            </FormContainer>
        </>
    );
}

export default FagartikkelForm; 

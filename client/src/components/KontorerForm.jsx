import styled from 'styled-components';
import React, { useState } from 'react';
import { Styles } from '../StyledComponents/index.js';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { create } from '../utils/officeService';

//lånt en del css fra https://www.w3schools.com/css/css_form.asp
//syns det var vrient å style forms

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
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    
    
`

const FormLabel = styled.label`
    margin-top:10px;
    width: 100%
    color: blue;
    
`
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


`


const CloseButton = styled.button`

`

const KontorerForm = () => {
  const [closeBtnState, setCloseBtnState] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dropDownCities = ["Sarpsborg", "Fredrikstad", "Bergen", "Moss"];

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
          
        history.push(`/kontorer`);
      }, 3000);
    }
  };

    return(
        <>
        <Styles.TitleBox><h1><Title>Velkommen til FG Rørleggerservice AS</Title></h1></Styles.TitleBox>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Please type in your office name"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="number">Number</FormLabel>
                <Input
                    type="number"
                    name="number"
                    id="number"
                    placeholder="Please type in your office number"
                    ref={register({
                        required: true,
                    })}/>
                
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Please type in your office email"
                    ref={register({
                        required: true,
                    })}/>

                <FormLabel htmlFor="city">City</FormLabel>
                <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Please type in the location of your office"
                    ref={register({
                        required: true,
                    })}/>

                    <Button
                        isLoading={formState.isSubmitting}
                        type="submit">
                            Lag nytt kontor
                        </Button>
                
            </FormContainer>
        </>
    );
}

export default KontorerForm; 

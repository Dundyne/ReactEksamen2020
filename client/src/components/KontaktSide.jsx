/* eslint-disable no-use-before-define */
import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// eslint-disable-next-line import/named
import { Styles } from '../StyledComponents/index.js';

import { sendEmail } from '../utils/sendEmail';

// import {sendMail} from "../utils.sendEmail"
// lånt en del css fra https://www.w3schools.com/css/css_form.asp
// syns det var vrient å style forms

const FormContainer = styled.form`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const Title = styled.h1`
  text-align: center;
  line-height: 300px;
  height: 150px;
  font-size: 50px;
  font-weight: bold;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const FormLabel = styled.label`
    margin-top:10px;
    width: 100%
    color: blue;
    
`;
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

const KontorerForm = () => {
  // Skjønner ikke history
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (formData) => {
    await sendEmail(formData);

    console.log(formData);
    setTimeout(() => {
      history.push(`/kontorer`);
    }, 2000);
  };

  return (
    <>
      <Styles.TitleBox>
        <h1>
          <Title>Kontakt oss :)</Title>
        </h1>
      </Styles.TitleBox>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="subject">Subject</FormLabel>
        <Input
          type="text"
          name="subject"
          id="subject"
          placeholder="Please type in a subject"
          ref={register({
            required: true,
          })}
        />

        <FormLabel htmlFor="message">Message</FormLabel>
        <Input
          type="text"
          name="message"
          id="message"
          placeholder="Please type in your message"
          ref={register({
            required: true,
          })}
        />

        <Button isLoading={formState.isSubmitting} type="submit">
          Send Melding
        </Button>
      </FormContainer>
    </>
  );
};

export default KontorerForm;

// Navn

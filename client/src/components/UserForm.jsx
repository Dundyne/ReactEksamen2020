import styled from "styled-components";
import React, { useState } from "react";
import { Styles } from "../StyledComponents/index.js";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { createUser } from "../utils/userService";

//lånt en del css fra https://www.w3schools.com/css/css_form.asp
//syns det var vrient å style forms

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

const CloseButton = styled.button``;

const UserForm = () => {
  const [closeBtnState, setCloseBtnState] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  //Skjønner ikke history
  const history = useHistory();

  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (formData) => {
    const { data } = await createUser(formData);
    if (!data.success) {
      setCloseBtnState(true);
      setError(data.message);
    } else {
      setSuccess(true);
      setError(null);

      console.log(formData);
      setTimeout(() => {
        history.push(`/`);
      }, 3000);
    }
  };

  return (
    <>
      <Styles.TitleBox>
        <h1>
          <Title>Velkommen til FG Rørleggerservice AS</Title>
        </h1>
      </Styles.TitleBox>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="text">Email</FormLabel>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Please type in your email"
          ref={register({
            required: true,
          })}
        />

        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Please type in your password"
          ref={register({
            required: true,
          })}
        />


        <Button isLoading={formState.isSubmitting} type="submit">
          Opprett en bruker
        </Button>
      </FormContainer>
    </>
  );
};

export default UserForm;
/**        <FormLabel>Click for admin</FormLabel>
        <Input
          type="checkbox"
          name="role"
          id="role"
          ref={register({
            required: false,
          })}
        /> */
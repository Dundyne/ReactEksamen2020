import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Styles } from "../StyledComponents/index.js";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { login } from "../utils/authService";
import { useAuthContext } from "../context/AuthProvider";
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

const LoginForm = () => {
  const [closeBtnState, setCloseBtnState] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { setUser, isLoggedIn } = useAuthContext();
  const history = useHistory();
  const { state } = useLocation();

  const { register, errors, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });

  useEffect( () => {
    if (isLoggedIn && state) {
      history.push(state?.from.pathname);
    }
  }, [isLoggedIn, state]);

  const onSubmit = async (credentials) => {
    const { data } = await login(credentials);
    if (!data.success) {
      setCloseBtnState(true);
      setError(data.message);
    } else {
      const user = data?.user;
      const expire = JSON.parse(window.atob(data.token.split(".")[1])).exp;
      setUser({ ...user, expire });
      setSuccess(true);
      history.push("/");
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

        <FormLabel htmlFor="password">Number</FormLabel>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Please type in your password"
          ref={register({
            required: true,
          })}
        />

        <Input
          type="checkbox"
          name="role"
          id="role"
          ref={register({
            required: false,
          })}
        />

        <Button isLoading={formState.isSubmitting} type="submit">
          Opprett en bruker
        </Button>
      </FormContainer>
    </>
  );
};

export default LoginForm;

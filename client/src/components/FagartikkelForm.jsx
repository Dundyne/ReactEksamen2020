import styled from 'styled-components';
import React, { useState } from 'react';
import { Styles } from '../StyledComponents/index.js';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { create } from '../utils/articleService';
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
  } from "styled-dropdown-component";
  //From https://www.npmjs.com/package/styled-dropdown-component

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
    margin-top: 10px;
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

const LastButton = styled.button`
  
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

const StyledFilterButton = styled.button`
  width: 120px;
  height: 75px;
  background-color: #f5f1f1;
  color: black;
  font-weight: bold;
  font-size: 15px;
`;


const FagartikkelForm = () => {
    const [closeBtnState, setCloseBtnState] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [hiddenCath, setHiddenCath] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionCath, setSelectedOptionCath] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([""]);
    const [filteredCategoriesCath, setFilteredCategoriesCath] = useState([""]);
    const [isOpen, setIsOpen] = useState(false);
    //trengs ikke da man kan bare skrive disabled: true const [disabled, setDisabled] = useState(false)
    const [disabled, setDisabled] = useState(false);
    const [input, setInput] = useState("");
   
    
    const dropDownAuthors = ["Lars Larsen", "Gunn Gundersen", "Simen Simsensen"];
    const dropDownCathegory = ["Action", "Comedy", "Horror"];
  
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
          history.push(`/fagartikler`);
        }, 2000);
      }
    };
  
    const onOptionClicked = (value) => () => {
      setSelectedOption(value);
      console.log(selectedOption);
      
    };
    const onOptionClickedCath = (value) => () => {
      setSelectedOptionCath(value);
      console.log(selectedOptionCath);
     
    };
  
  function handleCathegoryChange() {
      setDisabled(!disabled);
  }
  
  
      return(
          <>
          <Styles.TitleBox><h1><Title>Velkommen til FG Rørleggerservice AS</Title></h1></Styles.TitleBox>
              <FormContainer onSubmit={handleSubmit(onSubmit)}>
                  <FormLabel htmlFor="title">Tittel</FormLabel>
                  <Input
                      type="title"
                      name="title"
                      id="title"
                      placeholder="Please type in the title"
                      ref={register({
                          required: true,
                      })}/>
  
                  <FormLabel htmlFor="ingress">Ingress</FormLabel>
                  <Input
                      type="ingress"
                      name="ingress"
                      id="ingress"
                      placeholder="Please type in the ingress"
                      ref={register({
                          required: true,
                      })}/>
                  
                  <FormLabel htmlFor="content">Innhold</FormLabel>
                  <Input
                      type="content"
                      name="content"
                      id="content"
                      placeholder="Please type in the content"
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
  
              <FormLabel htmlFor="category">Category</FormLabel>
                              <>
                              {disabled ? 
                              <Input  type="category"
                                  name="category"
                                  id="category"
                                  placeholder="Please choose your category"
                                  disabled={false}
                                  value={input}
                                  onChange={(e) => setInput(e.target.value)}
                                  ref={register({
                                      required: true,
                                  })}/> 
                                  
                                  : 
                                  <Input readOnly  
                                  type="category"
                                  name="category"
                                  id="category"
                                  placeholder="Please choose your category"
                                  value={selectedOptionCath}
                                  onChange = {e => setSelectedOptionCath(e.target.value)}
                                  ref={register({
                                      required: true,
                                  })}/>
                              }</>
  
  
                      
                  <Dropdown>
                      <Button
                          dropdownToggle
                          onClick={() => setHiddenCath(!hidden)}
                          //https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
                      >
                          {selectedOptionCath || "Choose a category"}
                      </Button>
                      {!hiddenCath && (
                          <DropdownMenu
                          hidden={hiddenCath}
                          toggle={() => setHiddenCath(!hiddenCath)}
                          >
                          {dropDownCathegory.map((option) => (
                              <DropdownItem
                              onClick={onOptionClickedCath(option)}
                              activeClassName="active"
                              key={Math.random()}
                              >
                              {option}
                              </DropdownItem>
                          ))}
                         
                          </DropdownMenu>
                      )}
                      </Dropdown>    
                  
                  
              <Button onClick={handleCathegoryChange}>Click here to manually add a category</Button>
              <Dropdown>
                      <Button
                          dropdownToggle
                          onClick={() => setHidden(!hidden)}
                          //https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
                      >
                          {selectedOption || "Choose an author"}
                      </Button>
                      
  
                  <FormLabel htmlFor="author">Author</FormLabel>
                  <Input readOnly
                      type="author"
                      name="author"
                      id="author"
                      placeholder="Please choose your author"
                      value={selectedOption}
                      ref={register({
                          required: true,
                      })}/>
  
                     
                     {!hidden && (
                          <DropdownMenu
                          hidden={hidden}
                          toggle={() => setHidden(!hidden)}
                          >
                          {dropDownAuthors.map((option) => (
                              <DropdownItem
                              onClick={onOptionClicked(option)}
                              activeClassName="active"
                              key={Math.random()}
                              >
                              {option}
                              </DropdownItem>
                          ))}
                         
                          </DropdownMenu>
                      )}
                      </Dropdown>
  
  
  
  
                      <LastButton
                          isLoading={formState.isSubmitting}
                          type="submit">
                              Lag ny artikkel
                          </LastButton>
                  
              </FormContainer>
          </>
      );
  }
  
  export default FagartikkelForm; 
/* eslint-disable no-use-before-define */
import styled from 'styled-components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component';
import { put } from '../utils/articleService';
// eslint-disable-next-line import/named
import { Styles } from '../StyledComponents/index.js';
// From https://www.npmjs.com/package/styled-dropdown-component

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
    margin-top: 10px;
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
`;

const FagartikkelRedigering = () => {
  const [hidden, setHidden] = useState(true);
  const [hiddenCath, setHiddenCath] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionCath, setSelectedOptionCath] = useState(null);

  const [checked, setChecked] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  // trengs ikke da man kan bare skrive disabled: true const [disabled, setDisabled] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [input, setInput] = useState('');
  const { id } = useParams();

  const dropDownAuthors = ['Lars Larsen', 'Gunn Gundersen', 'Simen Simsensen'];
  const dropDownCathegory = ['Action', 'Comedy', 'Horror'];
  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
  }

  // Skjønner ikke history
  const history = useHistory();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (formData) => {
    removeEmptyFields(formData);
    const { data } = await put(id, formData);
    if (!data.success) {
      alert('Edit Failed');
    } else {
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

  const handleClickCheck = () => {
    setChecked(!checked);
    // eslint-disable-next-line no-unused-expressions
    checked ? setCheckBox(false) : setCheckBox(true);
  };

  return (
    <>
      <Styles.TitleBox>
        <h1>
          <Title>Rediger artikkel</Title>
        </h1>
      </Styles.TitleBox>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="title">Tittel</FormLabel>
        <Input
          type="title"
          name="title"
          id="title"
          placeholder="Please type in the title"
          ref={register({
            required: false,
          })}
        />

        <FormLabel htmlFor="ingress">Ingress</FormLabel>
        <Input
          type="ingress"
          name="ingress"
          id="ingress"
          placeholder="Please type in the ingress"
          ref={register({
            required: false,
          })}
        />

        <FormLabel htmlFor="content">Innhold</FormLabel>
        <Input
          type="content"
          name="content"
          id="content"
          placeholder="Please type in the content"
          ref={register({
            required: false,
          })}
        />

        <FormLabel htmlFor="date">Dato</FormLabel>
        <Input
          type="date"
          name="date"
          id="date"
          placeholder="date"
          ref={register({
            required: false,
          })}
        />

        <FormLabel htmlFor="category">Category</FormLabel>
        <>
          {disabled ? (
            <Input
              type="category"
              name="category"
              id="category"
              placeholder="Please choose your category"
              disabled={false}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={register({
                required: false,
              })}
            />
          ) : (
            <Input
              readOnly
              type="category"
              name="category"
              id="category"
              placeholder="Please choose your category"
              value={selectedOptionCath}
              onChange={(e) => setSelectedOptionCath(e.target.value)}
              ref={register({
                required: false,
              })}
            />
          )}
        </>

        <Dropdown>
          <Button
            dropdownToggle
            onClick={() => setHiddenCath(!hidden)}
            // https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
          >
            {selectedOptionCath || 'Choose a category'}
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

        <Button onClick={handleCathegoryChange}>
          Click here to manually add a category
        </Button>
        <Dropdown>
          <Button
            dropdownToggle
            onClick={() => setHidden(!hidden)}
            // https://medium.com/the-andela-way/custom-select-dropdown-in-react-1758c1f6f537 tatt logikk her fra
          >
            {selectedOption || 'Choose an author'}
          </Button>

          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            readOnly
            type="author"
            name="author"
            id="author"
            placeholder="Please choose your author"
            value={selectedOption}
            ref={register({
              required: false,
            })}
          />

          {!hidden && (
            <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
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

        <FormLabel htmlFor="secrets">Click for secret article</FormLabel>
        <Input
          type="checkbox"
          name="secrets"
          id="secrets"
          defaultChecked={checkBox}
          value={checkBox}
          onClick={handleClickCheck}
          ref={register({
            required: false,
          })}
        />

        <LastButton isLoading={formState.isSubmitting} type="submit">
          Rediger Artikkel
        </LastButton>
      </FormContainer>
    </>
  );
};

export default FagartikkelRedigering;

import React, { useState } from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

// services
import { getGistForUser } from "../services/gistService";

const Search = () => {
  const [username, serUsername] = useState("");

  // handler for update state when input change (i.e user type his/her name)
  const handleChange = (event) => serUsername(event.target.value)

  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input placeholder="Search Gists for the username" onChange={handleChange} />
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus{
    outline: 0;
  }
`;

export default Search

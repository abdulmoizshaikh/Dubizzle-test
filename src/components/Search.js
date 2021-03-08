import React, { useContext, useState } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";

// Requiring lodash library
import _ from "lodash";

// services
import { getGistForUser } from "../services/gistService";
import { RootContext } from "../App";

const Search = () => {
  const [username, serUsername] = useState("");
  const state = useContext(RootContext);

  /**
   nested array destructuring with default values
  */
  const {
    pubGists: [publicGists, setPublicGists],
  } = state;

  // handler for update state when input change (i.e user type his/her name)
  const handleChange = async (event) => {
    try {
      serUsername(event.target.value);
      throt_fun();
    } catch (error) {
      throw new Error(error || error.message);
    }
  };

  // Calling throttle() method with its parameter
  const throt_fun = _.throttle(async () => {
    try {
      const response = await getGistForUser(username);
      if (response.status === 200) {
        setPublicGists(response.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.error(error.message);
    }
  }, 1000);

  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input
          placeholder="Search Gists for the username"
          onChange={handleChange}
        />
      </InputBox>
    </Wrapper>
  );
};

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

  &:focus {
    outline: 0;
  }
`;

export default Search;

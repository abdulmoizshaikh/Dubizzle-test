import React, { useContext, useState } from "react";
import styled from "styled-components";
import Octicon from "react-octicon";
import _ from "lodash";

// services
import { getGistForUser, getPublicGists } from "../services/gistService";
import { RootContext } from "../App";

const Search = () => {
  const state = useContext(RootContext);
  const [username, setUsername] = useState("");

  /**
   nested array destructuring with default values
  */
  const {
    pubGists: [publicGists, setPublicGists],
    fetching: [isFetching, setIsFetching],
  } = state;

  // handler for update state when input change (i.e user type his/her name)
  const handleChange = async ({ target: { value } }) => {
    try {
      setUsername(value);
      let prevState = value.slice(0, value.length - 1);
      if (username === prevState && publicGists.length === 0) {
        // not call API
        console.log("not calling further API for better performace ");
      } else {
        throt_fun(value);
      }
    } catch (error) {
      throw new Error(error || error.message);
    }
  };

  // Calling throttle() method with its parameter
  const throt_fun = _.throttle(async (name) => {
    try {
      setIsFetching(true);
      let response;
      if (name) {
        response = await getGistForUser(name);
      } else {
        //get all public gist
        response = await getPublicGists();
      }

      if (response.status === 200) {
        setPublicGists(response.data);
      } else {
        console.log("Something went wrong");
      }
      setIsFetching(false);
    } catch (error) {
      setIsFetching(false);
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

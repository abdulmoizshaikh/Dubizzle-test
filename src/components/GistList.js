import React, { useContext } from "react";

/**Components */
import styled from "styled-components";
import { RootContext } from "../App";
import Gist from "./Gist";

const GistList = () => {
  const state = useContext(RootContext);
  /**
   nested array destructuring with default values
  */
  const {
    pubGists: [publicGists = [], setPublicGists = []],
    userGists: [gistForUser = [], setGistForUser = []],
  } = state;

  return (
    <Wrapper>
      {publicGists.length > 0 &&
        publicGists.map((gist, index) => {
          return <Gist gist={gist} key={gist.id} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default GistList;

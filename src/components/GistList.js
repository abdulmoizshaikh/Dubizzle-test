import React, { useContext } from "react";
import styled from "styled-components";
import { RootContext } from "../App";
import Gist from "./Gist";
import Octicon from "react-octicon";

const GistList = () => {
  const state = useContext(RootContext);
  /**
   nested array destructuring with default values
  */
  const {
    pubGists: [publicGists, setPublicGists],
    fetching: [isFetching, setIsFetching],
  } = state;

  return (
    <Wrapper>
      {isFetching ? (
        <Container>
          <Loader>Loading...</Loader>
        </Container>
      ) : publicGists.length > 0 ? (
        publicGists.map((gist) => <Gist gist={gist} key={gist.id} />)
      ) : (
        <Container>
          <Octicon
            name="search"
            mega
            style={{ fontSize: "3em", marginRight: "10px" }}
          />
          <Loader>No Record Found</Loader>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Loader = styled.p`
  font-size: 3em;
  color: #626465;
  font-family: "Ubuntu", sans-serif;
`;

export default GistList;

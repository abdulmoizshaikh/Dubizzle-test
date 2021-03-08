import React, { useContext } from "react";
import styled from "styled-components";
import { RootContext } from "../App";
import Gist from "./Gist";
import notFoundImg from "../assets/images/notfound.jpg";

const GistList = () => {
  const state = useContext(RootContext);
  /**
   nested array destructuring with default values
  */
  const {
    pubGists: [publicGists, setPublicGists],
  } = state;

  return (
    <Wrapper>
      {publicGists.length > 0 ? (
        publicGists.map((gist) => <Gist gist={gist} key={gist.id} />)
      ) : (
        <ImgWrapper>
          <FallbackImg src={notFoundImg} />
        </ImgWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FallbackImg = styled.img`
  width: 100vw;
  height: 90vh;
`;
export default GistList;

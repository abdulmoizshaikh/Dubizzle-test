import { useState, createContext, useEffect } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";
import GistList from "./components/GistList";
import { getPublicGists } from "./services/gistService";

/**Creating and passing RootContext to use useContext in child components for state management */
export const RootContext = createContext();

const App = () => {
  const [publicGists, setPublicGists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    /**handler for getting list of public list when component loads/mount */
    getPublicGistsHandler()
      .then((gists) => {
        console.log("gists", gists);
        setIsFetching(false);
        return () => {
          // cleanup;
        };
      })
      .catch((err) => {
        setIsFetching(false);
        console.error(err);
      });
  }, []);

  const getPublicGistsHandler = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await getPublicGists();
        setPublicGists(data);
        resolve(data);
      } catch (error) {
        reject(error || error.message);
      }
    });
  };

  return (
    <RootContext.Provider
      value={{
        pubGists: [publicGists, setPublicGists],
        fetching: [isFetching, setIsFetching],
      }}
    >
      <Wrapper className="App" data-testid="app">
        <Header />
        <GlobalStyles />
        <GistList />
      </Wrapper>
    </RootContext.Provider>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;

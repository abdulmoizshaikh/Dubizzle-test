import { useState, createContext, useEffect } from "react";

/**Components */
import styled from "styled-components";
import Header from "./components/Header";
import GlobalStyles from "./GlobalStyle";

/**Services */
import { getPublicGists } from "./services/gistService";

/**Creating and passing RootContext to use useContext in child components for state management */
export const RootContext = createContext();

const App = () => {
  const [publicGists, setPublicGists] = useState([]);

  useEffect(() => {
    /**handler for getting list of public list when component view loads */
    getPublicGistsHandler()
  }, []);

  const getPublicGistsHandler = async () => {
    try {
      const { data } = await getPublicGists();
      setPublicGists(data);
      return () => {
        // cleanup;
      };
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <RootContext.Provider
      value={{
        pubGists: [publicGists, setPublicGists],
      }}
    >
      <Wrapper className="App" data-testid="app">
        <Header />
        <GlobalStyles />
      </Wrapper>
    </RootContext.Provider>
  );
};

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 1.5;
`;

export default App;

import Octicon from "react-octicon";
import styled from "styled-components";
import GistHeader from "./GistHeader";
import propTypes from "prop-types";

const Gist = ({ gist }) => {
  /*   
  nested object destructuring 
  with respected default value for error handling
 */
  const { description = "", files = {} } = gist;

  return (
    <Wrapper>
      {/* rendering gist card header */}
      <GistHeader gist={gist} />

      {/* test description about gist */}
      <Description>{description}</Description>

      {/*rendering list of files belongs to that gist  */}
      <RenderFiles>
        {Object.keys(files).map((_file, i) => {
          const { filename, raw_url } = files[_file];
          return (
            <IntoItem href={raw_url} target="_blank" key={raw_url + i} isFile>
              <Octicon name="file" />
              <IconText>{filename}</IconText>
            </IntoItem>
          );
        })}
      </RenderFiles>
    </Wrapper>
  );
};

// types testing of paraps
Gist.propTypes = {
  gist: propTypes.object,
};

const Wrapper = styled.div`
  width: 50%;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 20px 0px 30px 0px;
  border-bottom: 1px solid #eee;
`;

const IntoItem = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  /* dynamic styling based on isFile property exist */
  margin-left: ${(props) => props.isFile && "20px"};
`;

const IconText = styled.p`
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #616465;
`;

const RenderFiles = styled.div`
  display: flex;
`;

export default Gist;

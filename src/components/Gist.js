// packages
import Octicon from "react-octicon";

/**Components */
import styled from "styled-components";

const Gist = ({ gist }) => {
  /*   
  nested object destructuring 
  with respected default value for error handling
 */
  const {
    owner: { login = "", avatar_url = "", url = "" },
    description = "",
    created_at = "",
    updated_at = "",
    files = {},
  } = gist;

  console.log("gist[0]", gist[0]);

  const gistDetails = [
    {
      iconName: "code",
      text: "File",
      url: gist["forks_url"],
    },
    {
      iconName: "repo-forked",
      text: "Forks",
      url: gist["forks_url"],
    },
    {
      iconName: "comment",
      text: "Comments",
      url: gist["comments_url"],
    },
    {
      iconName: "star",
      text: "Stars",
      url: gist["forks_url"],
    },
  ];

  const dateFormatter = (date) => date.split("T")[0].replaceAll("-", "/");
  return (
    <Wrapper>
      <HeaderContainer>
        <HeaderLeft>
          <UserImgSection>
            <Image src={avatar_url} alt="user avatar" />
            <AnchorText href={url} target="_blank">
              {login}
            </AnchorText>
          </UserImgSection>
          <DateWrapper>
            <p>Created at: {dateFormatter(created_at)}</p>
            <pre> </pre>
            <p>Last updated: {dateFormatter(updated_at)}</p>
          </DateWrapper>
        </HeaderLeft>

        {/* render gist gistInfo details */}
        <GistDetails>
          {gistDetails.map(({ iconName, text, url }) => {
            return (
              <IntoItem key={iconName} href={url} target="_blank">
                <Octicon name={iconName} />
                <IconText>{text}</IconText>
              </IntoItem>
            );
          })}
        </GistDetails>
      </HeaderContainer>

      <DescText>{description}</DescText>

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

const Wrapper = styled.div`
  width: 50%;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 20px 0px 30px 0px;
  border-bottom: 1px solid #eee;
`;

const HeaderContainer = styled.div`
  display: flex;
`;
const HeaderLeft = styled.div`
  width: 50%;
  /* background-color: yellow; */
`;
const UserImgSection = styled.div`
  display: flex;
  align-items: center;
  /* background-color: yellow; */
`;

const DateWrapper = styled.div`
  display: flex;
`;

const GistDetails = styled.div`
  display: flex;
  width: 50%;
  /* background-color: red; */
  justify-content: space-around;
  color: #305bd2;
  align-items: flex-start;
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

const AnchorText = styled.a`
  color: #305bd2;
  padding: 5px;
  margin: 0px;
  text-decoration: none;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const DescText = styled.p`
  /* font-weight: 550; */
  font-size: 18px;
  color: #616465;
`;

const RenderFiles = styled.div`
  display: flex;
`;

export default Gist;

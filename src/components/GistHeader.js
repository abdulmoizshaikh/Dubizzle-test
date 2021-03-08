import Octicon from "react-octicon";
import styled from "styled-components";

const GistHeader = ({ gist }) => {
  /*   
  nested object destructuring 
  with respected default value for error handling
 */
  const {
    owner: { login = "", avatar_url = "", url = "" },
    created_at = "",
    updated_at = "",
  } = gist;

  // A custom handler for do formatting of dates
  const dateFormatter = (date) => date.split("T")[0].replaceAll("-", "/");

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

  return (
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
  );
};

const HeaderContainer = styled.div`
  display: flex;
`;

const HeaderLeft = styled.div`
  width: 50%;
`;

const UserImgSection = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const AnchorText = styled.a`
  color: #305bd2;
  padding: 5px;
  margin: 0px;
  text-decoration: none;
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

const DateWrapper = styled.div`
  display: flex;
`;

const GistDetails = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
  color: #305bd2;
  align-items: flex-start;
`;

export default GistHeader;

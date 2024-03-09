import { styled } from "styled-components";
import { mobile } from "./Responsive";

const Container = styled.div`
  display: flex;
  background-color: white; /* Inverted background color */
  color: black; /* Inverted text color */
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 60px;
  border-radius: 50%;
`;

const Description = styled.p`
  margin: 20px 5px;
  color: black; /* Inverted text color */
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  background-color: white; /* Inverted background color */
  color: black; /* Inverted text color */
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: black; /* Inverted text color */
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  color: black; /* Inverted text color */
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: black; /* Inverted text color */
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black; /* Inverted text color */
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-content: center;
  color: black; /* Inverted text color */
`;

const Payment = styled.div``;

const Footer = () => {
  return (
    <Container>
      <Left>
        {/* <Logo src="bird.png"></Logo> */}
        <Description>
          Simplify hotel management with our comprehensive system. Track room
          cleanliness, monitor inventory, and generate ideal room images. Manage
          your hotel efficiently with our powerful features.
        </Description>
        <SocialContainer>
          <SocialIcon>
            <i className="fa-brands fa-github"></i>
          </SocialIcon>
          <SocialIcon>
            <i className="fa-brands fa-linkedin"></i>
          </SocialIcon>
          <SocialIcon>
            <i className="fa-brands fa-discord"></i>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Pages links</Title>
        <List>
          <ListItem>A</ListItem>
          <ListItem>B</ListItem>
          <ListItem>C</ListItem>
          <ListItem>D</ListItem>
          <ListItem>E</ListItem>
          <ListItem>F</ListItem>
          <ListItem>G</ListItem>
          <ListItem>H</ListItem>
        </List>
      </Center>
      <Right>
        <Title>CONTACT</Title>
        <ContactItem>
          <i className="fa-solid fa-location-dot me-2"></i> Vile Parle, Mumbai,
          Maharashtra
        </ContactItem>
        <ContactItem>
          <i className="fa-solid fa-phone me-2"></i> +91 99999 99999
        </ContactItem>
        <ContactItem>
          <i className="fa-regular fa-envelope me-2"></i> xyz@gmail.com
        </ContactItem>
        <Payment />
      </Right>
    </Container>
  );
};

export default Footer;

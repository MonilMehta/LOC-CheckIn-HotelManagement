import { styled } from "styled-components";
import { mobile } from "./Responsive";
import { Facebook, Twitter, Instagram, LocationOn, Phone, MailOutline } from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  background-color: #212121; /* Dark background color */
  color: white; /* Text color */
  padding: 30px;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 60px;
  border-radius: 50%;
`;

const Description = styled.p`
  margin: 20px 0;
  max-width: 200px;
  text-align: center;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-top: 20px;
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
  color: #212121; /* Inverted text color */
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
  margin-bottom: 20px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-content: center;
`;

const Payment = styled.div``;

const Footer = () => {
  return (
    <Container>
      <Left>
        {/* <Logo src="bird.png"></Logo> */}
        <Description>
          Stay connected with us on social media for the latest updates and
          promotions.
        </Description>
        <SocialContainer>
          <SocialIcon>
            <Facebook />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Quick Links</Title>
        <List>
          <ListItem>Privacy Policy</ListItem>
          <ListItem>Terms of Service</ListItem>
          <ListItem>FAQs</ListItem>
          <ListItem>Contact Us</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOn style={{ marginRight: '8px' }} />
          Vile Parle, Mumbai, Maharashtra
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: '8px' }} />
          +91 99999 99999
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: '8px' }} />
          info@example.com
        </ContactItem>
        <Payment />
      </Right>
    </Container>
  );
};

export default Footer;

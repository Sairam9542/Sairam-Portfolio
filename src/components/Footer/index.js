import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Bio } from '../../data/constants';

const FooterContainer = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  //background: linear-gradient(100.26deg, rgba(0, 102, 255, 0.05) 42.33%, rgba(150, 0, 225, 0.05) 127.07%);
`;


const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  padding: 1rem;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 20px;
  color: ${({ theme }) => theme.primary};
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    font-size: 12px;
  }
`;

const NavLink = styled.a`
color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  position: relative;
  font-size: 1.2rem;
  padding: 8px 10px;
  display: inline-block;
  :before, :after {
          content: "";
          position: absolute;
          display: block;
          border: 0px solid transparent;
          width: 0%;
          height: 0%;
          transition: all 0.5s ease;
  }
  :after {
          top: 0;
          left: 0;
          border-top: 2px solid transparent;
          border-left: 2px solid transparent;
  }
  :before {
          right: 0;
          bottom: 0;
          border-bottom: 2px solid transparent;
          border-right: 2px solid transparent;
  }
  :hover::before, :hover::after {
          width: 98%;
          height: 96%;
          border-color: ${({ theme }) => theme.primary};
  }
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  padding: 0 0.5rem;
  padding-top: 0.3rem;
  font-size: 1.5rem;
  border: 1px solid ${({ theme }) => theme.primary};
  box-shadow: 0 0 8px 3px rgba(67, 241, 213, 0.4);
  border-radius: 50%;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.4s ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-10px);
    box-shadow: 0 0 30px 4px rgba(67, 241, 213, 0.6);
    filter: brightness(1.1);
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.soft2};
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Sairam Ganapavarapu</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#education">Education</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.Whatsapp} target="display"><WhatsAppIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.facebook} target="display"><FacebookIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="display"><TwitterIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="display"><LinkedInIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="display"><InstagramIcon /></SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; 2024 Sairam Ganapavarapu. All rights reserved.
        </Copyright>

      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;
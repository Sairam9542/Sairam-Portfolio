import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0;
  @media (max-width: 960px) {
    padding: 30px 20px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  padding: 0 0 60px 0;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  margin-bottom: 8px;
  background: linear-gradient(90deg, ${({ theme }) => theme.text_primary} 0%, #00fed5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 20px;
  text-align: center;
  max-width: 650px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 40px;
  border-radius: 24px;
  box-shadow: rgba(0, 254, 213, 0.2) 0px 8px 30px;
  margin-top: 28px;
  gap: 20px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactTitle = styled.h3`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  margin-left: 4px;
`;

const ContactInput = styled.input`
  background-color: ${({ theme }) => theme.bgLight || 'rgba(0, 254, 213, 0.05)'};
  border: 1px solid ${({ theme }) => theme.primary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    border: 1px solid #00fed5;
    box-shadow: 0 0 0 3px rgba(0, 254, 213, 0.15);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: ${({ theme }) => theme.bgLight || 'rgba(0, 254, 213, 0.05)'};
  border: 1px solid ${({ theme }) => theme.primary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 16px;
  min-height: 140px;
  resize: vertical;

  transition: all 0.3s ease;
  
  &:focus {
    border: 1px solid #00fed5;
    box-shadow: 0 0 0 3px rgba(0, 254, 213, 0.15);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary}80;
  }
`;

const ContactButton = styled.button`
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 16px;
  margin-top: 10px;
  background-color:rgb(0, 254, 213);
  border: none;
  border-radius: 12px;
  transition: all 0.3s ease;
  color: #121212;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 254, 213, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ButtonIcon = styled.span`
  margin-left: 8px;
  font-size: 20px;
`;

// Custom Alert Notification that doesn't rely on Material UI's positioning
const CustomAlertContainer = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  min-width: 300px;
  max-width: 90%;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  animation: slideDown 0.3s ease-out forwards;
  
  @keyframes slideDown {
    from {
      transform: translate(-50%, -20px);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`;

const AlertContent = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  width: 100%;
  background-color: ${({ type }) => (type === 'success' ? '#00fed5' : '#f44336')};
  color: white;
  font-weight: 500;
`;

const AlertCloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  margin-left: 20px;
  cursor: pointer;
  font-size: 20px;
  padding: 0 8px;
  line-height: 1;
`;

const AlertMessage = styled.div`
  flex: 1;
`;

const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: 'success', message: '' });
  const form = useRef();
  const alertTimeoutRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    emailjs.sendForm('service_k09ewqd', 'template_6tet5hp', form.current, 'R1TNboRWdRzRYAFDP')
      .then((result) => {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I will get back to you soon.'
        });
        showNotification();
        form.current.reset();
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        setStatus({
          type: 'error',
          message: 'Something went wrong. Please try again later.'
        });
        showNotification();
        setLoading(false);
      });
  };

  const showNotification = () => {
    setShowAlert(true);
    
    // Clear any existing timeout
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
    
    // Auto-hide after 6 seconds
    alertTimeoutRef.current = setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const closeNotification = () => {
    setShowAlert(false);
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current);
    }
  };

  // Clean up the timeout when the component unmounts
  React.useEffect(() => {
    return () => {
      if (alertTimeoutRef.current) {
        clearTimeout(alertTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Get In Touch</Title>
        <Desc>Let's connect! I'm always open to work any Oppurtunities.Just Send the Message to reach me!.</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>
            Send Me A Message
            <span role="img" aria-label="email">✉️</span>
          </ContactTitle>
          
          <InputGroup>
            <InputLabel>Your Name</InputLabel>
            <ContactInput placeholder="John Doe" name="from_name" required />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Your Email</InputLabel>
            <ContactInput placeholder="john@example.com" name="from_email" type="email" required />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Subject</InputLabel>
            <ContactInput placeholder="Job Opportunity" name="subject" />
          </InputGroup>
          
          <InputGroup>
            <InputLabel>Message</InputLabel>
            <ContactInputMessage 
              placeholder="Message..."
              rows="5" 
              name="message" 
              required
            />
          </InputGroup>
          
          <ContactButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
            {!loading && <ButtonIcon>→</ButtonIcon>}
          </ContactButton>
        </ContactForm>
        
        {/* Custom Alert Implementation */}
        <CustomAlertContainer show={showAlert}>
          <AlertContent type={status.type}>
            <AlertMessage>{status.message}</AlertMessage>
            <AlertCloseButton onClick={closeNotification}>×</AlertCloseButton>
          </AlertContent>
        </CustomAlertContainer>
      </Wrapper>
    </Container>
  );
};

export default Contact;
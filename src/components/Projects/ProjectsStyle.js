import styled, { keyframes } from 'styled-components';
import _default from '../../themes/default';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  background: linear-gradient(
    343.07deg, 
    rgba(132, 59, 206, 0.08) 5.71%, 
    rgba(132, 59, 206, 0.02) 64.83%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 98%, 0 100%);
  padding: 80px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top right, rgba(132, 59, 206, 0.04), transparent 60%);
    z-index: -1;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 10px 24px 100px;
  gap: 24px;
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (max-width: 960px) {
    padding: 10px 16px 80px;
    gap: 16px;
  }
`;

export const Title = styled.h2`
  font-size: 48px;
  text-align: center;
  font-weight: 700;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 36px;
    
    &::after {
      height: 3px;
      bottom: -6px;
    }
  }
`;

export const Desc = styled.p`
  font-size: 20px;
  text-align: center;
  max-width: 650px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 12px;
  }
`;

export const ToggleButtonGroup = styled.div`
  display: flex;
  background: rgba(132, 59, 206, 0.06);
  border-radius: 20px;
  padding: 5px;
  margin: 30px 0 40px;
  box-shadow: 0 6px 16px rgba(132, 59, 206, 0.12);
  position: relative;
  width: fit-content;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: rgba(132, 59, 206, 0.2);
    border-radius: 10px;
  }
  
  @media (max-width: 768px) {
    margin: 22px 0 30px;
    border-radius: 16px;
  }
`;

export const ToggleButton = styled.button`
  background: ${({ active, theme }) => active ? theme.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.text_primary};
  border: none;
  outline: none;
  padding: 12px 22px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  margin: 0 3px;
  white-space: nowrap;
  
  ${({ active }) => active && `
    box-shadow: 0 4px 12px rgba(132, 59, 206, 0.3);
    transform: translateY(-1px);
  `}
  
  &:hover {
    background: ${({ active, theme }) => active ? theme.primary : 'rgba(132, 59, 206, 0.1)'};
    transform: ${({ active }) => active ? 'translateY(-2px)' : 'translateY(-1px)'};
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: ${({ active }) => active ? '0 2px 8px rgba(132, 59, 206, 0.3)' : 'none'};
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 12px;
  }
`;

// We can remove the Divider since we're using a different approach

export const Divider = styled.div`
  width: 1.5px;
  background: ${({ theme }) => theme.primary};
`;

const cardEntryAnimation = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  width: 100%;
  perspective: 1000px;
  
  & > * {
    animation: ${cardEntryAnimation} 0.5s ease-out;
    animation-fill-mode: both;
  }
  
  & > *:nth-child(1) { animation-delay: 0.1s; }
  & > *:nth-child(2) { animation-delay: 0.2s; }
  & > *:nth-child(3) { animation-delay: 0.3s; }
  & > *:nth-child(4) { animation-delay: 0.4s; }
  & > *:nth-child(n+5) { animation-delay: 0.5s; }
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
`;
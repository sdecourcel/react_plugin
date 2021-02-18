import styled from 'styled-components';

const Button = styled.button`
  -webkit-appearance: none;
  border: 0;
  background-color: ${(p) => p.theme.colors.secondary};
  color: ${(p) => p.theme.colors.greyDark};
  border-radius: 20px;
  text-align: center;
  height: 40px;
  font-size: 16px;
  line-height: 19px;
  padding: 0 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondaryDark};
  }
`;

export default Button;

import styled from 'styled-components';
import Text from './Text';

const Link = styled(Text.withComponent('a'))`
  text-decoration: underline;
  cursor: pointer;
`;

export default Link;

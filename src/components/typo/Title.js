import styled from 'styled-components';
import Text from './Text';

const Title = styled(Text.withComponent('h1'))`
  font-family: 'Roboto bold', Arial, Helvetica, sans-serif;
  font-size: 50px;
  line-height: 58px;
  margin: 0;
`;

export default Title;

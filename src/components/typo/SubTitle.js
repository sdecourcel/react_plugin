import styled from 'styled-components';
import Text from './Text';

const SubTitle = styled(Text.withComponent('h2'))`
  font-family: 'Roboto bold', Arial, Helvetica, sans-serif;
  font-size: 20px;
  line-height: 58px;
  margin: 0;
`;

export default SubTitle;

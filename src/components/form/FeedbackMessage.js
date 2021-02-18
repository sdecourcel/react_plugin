import styled from 'styled-components';
import Text from 'components/typo/Text';

const FeedbackMessage = styled(Text.withComponent('strong'))`
  color: ${(p) => p.theme.colors.error};
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  display: block;
  text-align: left;
`;

export default FeedbackMessage;

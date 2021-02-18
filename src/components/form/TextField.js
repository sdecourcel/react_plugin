import * as React from 'react';
import styled from 'styled-components';
import Text from 'components/typo/Text';
import FeedbackMessage from './FeedbackMessage';

function TextField({ forwardedRef, label, id, error, errorMessage, ...rest }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={forwardedRef}
        id={id}
        aria-invalid={error}
        aria-describedby={`${error}-${id}`}
        {...rest}
      />
      {error && (
        <FeedbackMessage id={`${error}-${id}`}>{errorMessage}</FeedbackMessage>
      )}
    </div>
  );
}

const Label = styled(Text.withComponent('label'))`
  color: ${(p) => p.theme.colors.greyMedium};
  font-size: 14px;
  line-height: 18px;
  margin: 0;
  display: block;
  text-align: left;
`;

const Input = styled.input`
  -webkit-appearance: none;
  border-style: solid;
  border-width: 1px;
  border-color: ${(p) => p.theme.colors.greyLighter};
  padding: 0 8px;
  margin: 0;
  height: 40px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export default TextField;

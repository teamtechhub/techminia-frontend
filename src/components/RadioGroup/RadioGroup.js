import React from 'react';
import styled from 'styled-components';

const RadioGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


const RadioGroup = ({
  items = [],
  component,
  containerClassName,
  secondaryComponent,
}) => {
  return (
    <RadioGroupWrapper className={`radioGroup ${containerClassName}`.trim()}>
      {items.map(
        (item, index) => component && component(item, index)
      )}

      {secondaryComponent && secondaryComponent}
    </RadioGroupWrapper>
  );
};

export default RadioGroup;

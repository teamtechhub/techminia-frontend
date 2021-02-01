import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Heading = styled.div`
  font-family: ${themeGet('fontFamily.1', 'sans-serif')};
  font-size: ${themeGet('fontSizes.3', '19')}px;
  font-weight: ${themeGet('fontWeights.6', '700')};
  color: ${themeGet('colors.darkBold', '#6c3a1f')};
  margin-bottom: 15px;
`;

export { FieldWrapper, Heading };

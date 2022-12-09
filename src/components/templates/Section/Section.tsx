import styled from '@emotion/styled';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
} from 'styled-system';

interface IProps extends SpaceProps, LayoutProps, FlexboxProps {}
const Section = styled.div<IProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 24px;
  width: 100%;
  background-color: rgb(var(--content));
  ${space}
  ${layout}
  ${flexbox}
`;

export default Section;

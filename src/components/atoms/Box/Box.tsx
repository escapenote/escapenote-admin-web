import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  PositionProps,
  position,
  DisplayProps,
  display,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  color,
  ColorProps,
} from 'styled-system';

interface IProps
  extends PositionProps,
    DisplayProps,
    FlexboxProps,
    GridProps,
    SpaceProps,
    LayoutProps,
    ColorProps {
  center?: boolean;
}
const Box = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  ${position}
  ${display}
  ${flexbox}
  ${grid}
  ${space}
  ${layout}
  ${color}

  ${p =>
    p.center &&
    css`
      align-items: center;
      justify-content: center;
      flex: 1;
    `}
`;

export default Box;

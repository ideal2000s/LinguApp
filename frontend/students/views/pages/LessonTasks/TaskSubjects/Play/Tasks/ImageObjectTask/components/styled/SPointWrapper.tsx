import styled from 'styled-components';

const SPointWrapper = styled.div<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: absolute;
  height: ${({ height }) => `${height}rem` || '0'};
  width: ${({ width }) => `${width}rem` || '0'};
  top: ${({ top, height }) => `calc(${top}% - ${height / 2}rem)` || '0'};
  left: ${({ left, width }) => `calc(${left}% - ${width / 2}rem)` || '0'};
`;

export default SPointWrapper;

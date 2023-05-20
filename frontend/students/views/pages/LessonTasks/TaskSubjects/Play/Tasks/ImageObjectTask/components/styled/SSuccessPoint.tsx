import styled from 'styled-components';
import { Image } from 'react-bootstrap';

const SSuccessPoint = styled(Image)<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: absolute;
  height: ${({ height }) => `${height}rem` || '0'};
  width: ${({ width }) => `${width}` || '0'}rem;
  top: ${({ top, height }) => `calc(${top}% - ${height / 2}rem)` || '0'};
  left: ${({ left, width }) => `calc(${left}% - ${width / 2}rem)` || '0'};
`;

export default SSuccessPoint;

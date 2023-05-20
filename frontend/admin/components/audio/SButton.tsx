import styled from 'styled-components';

const SButton = styled.button`
  border: none;
  border-radius: 0.9rem;
  background: ${(props) => props.theme.primary || '#68bbe3'};
  color: white;
  outline: none !important;
  padding: 0;
  margin-left: 0.5rem;
  width: 1.1rem;
  height: 1.2rem;
  transition: transform 0.2s;
  opacity: 0.9;

  &:disabled {
    background-color: ${({ theme }) => theme.linguBlueBtnBgDisabled || '#5e6e82'};
    color: ${({ theme }) => theme.linguBlueBtnColorDisabled || '#58585a'};
  }
  &:focus {
    transform: scale(1.03);
    transition: transform 0.2s;
    opacity: 1;
  }

  span {
    display: none;
  }

  @media (min-width: 414px) {
    width: 1.4rem;
    height: 1.5rem;
  }

  @media (min-width: 790px) {
    width: 1.6rem;
    height: 1.7rem;

    span {
      display: inline;
      margin-right: 1rem;
    }

    svg + span {
      margin-right: 0;
      margin-left: 1rem;
    }
  }
`;

export default SButton;

import styled from 'styled-components';

const SRootStyle = styled.div`
  font-family: 'Inter', 'Product Sans', sans-serif;

  .container {
    max-width: 1210px;
  }

  .badge-warning {
    color: white;
  }

  .text-center {
    text-align: center;
  }

  .card-title {
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
    line-height: 1.2;
    color: #344050;
    font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
  }

  p.inline-text {
    line-height: 40px;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .bg-blue {
    background-color: ${({ theme }) => theme.primary};
  }

  .bg-white {
    background-color: white;
  }

  checkbox-box {
    border: 1px solid #344050;
  }

  .btn-submit {
    text-transform: uppercase;
    margin-top: 20px;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 5px;
    min-height: 60px;
    color: white;
    font-size: 1.1rem;
    font-weight: 800;
    min-width: 200px;
    &:hover {
      color: white;
      background-color: ${({ theme }) => theme.primary};
    }
  }

  .white {
    color: white;
  }

  hr {
    margin: 12px 0;
  }

  h1,
  h2 {
    &.title {
      font-size: 2rem;
      color: #233048;
      letter-spacing: 0.25px;
      font-weight: bold;
    }
  }

  .introduction {
    letter-spacing: 0.3px;
    color: #222222;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.9rem;
  }

  .black {
    color: #4c5972;
  }
  hr {
    margin: 30px 0;
  }

  .task-container {
    /* margin-bottom: 1.5rem; */
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    //border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.06);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Open Sans', Arial, 'Noto Sans', sans-serif;
    color: #344050;
    text-align: left;
    padding: 1rem;
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: #344050;
      margin-bottom: 29px;
      font-family: 'Product Sans', 'Helvetica Neue', Arial, sans-serif;
    }
    label {
      color: #344050;
      font-weight: 800;
    }
    @media (min-width: 576px) {
      padding: 1.8rem;
    }
  }

  .opacity-0 {
    opacity: 0;
  }

  & * {
    outline-color: ${({ theme }) =>
      theme.linguBlueBtnFocusOutlineColor || '#00a5d7'} !important;
  }
`;

export default SRootStyle;

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme['BLUE_700']};
  }

    body {
      background: ${(props) => props.theme['WHITE']};
      color: ${(props) => props.theme['BLUE_700']};
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
      font-family: 'Inter', sans-serif;
    }
`

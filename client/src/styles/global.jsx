import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing: border-box;
        outline: 0;
    }

    :root{
        --black: #202020;
        --white: #DDDDDD;
        --pinkFocus: #f70776;
        --pink: #c3195d;
        --greenFocus:#01FF70;
        --green:#2ECC40;
    }

    body{
        background-color:var(--black);
    }
`;

import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { Palette } from "@mui/material/styles/createPalette";

export interface IPalette extends Palette {
  primary: {
    main: string;
    main2: string;
    light: string;
    dark: string;
    contrastText: string;
  },

};

export interface ITheme extends Theme {
  palette: IPalette;
};
export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
};


export const theme = createTheme({
  palette: {
    primary: {
      main: '#5D6D97',
      main2: '#5D6E97',
      light: '#AEB6CB',
      // light: '#8c9cc8',
      dark: '#3C5AA8',
      // main: '#5f968e',
      // light: '#8ec7be',
      // dark: '#316861',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4A9DFF',
      light: '#87ceff',
      dark: '#006fcb',
      contrastText: '#fff',
      // main: '#e05858',
      // light: '#ff8985',
      // dark: '#a9242f',
      // contrastText: '#fff',
    },
    warning: {
      main: '#FB8644',
      light: '#FBB68F',
      dark: '#E35932',
      contrastText: '#fff',
    },
    info: {
      main: '#444bfb',
      light: '#8678ff',
      dark: '#0021c7',
      contrastText: '#fff',
    },
    success: {
      main: '#5CDC70',
      light: '#75EE88',
      dark: '#17a942',
      contrastText: '#fff',
    },
    error: {
      main: '#FF1111',
      light: '#FF5151',
      dark: '#c20000',
      contrastText: '#fff',
    },
    grey: {
      300: 'rgba(93, 110, 151, 0.2)',
      A100: 'rgba(120, 120, 120, 0.6)',
      A200: 'rgba(0, 0, 0, 0.4)',
      A400: 'rgba(0, 0, 0, 0.6)',
    }
  },
  typography: {
    fontFamily: [
      'Ubuntu',
      'Roboto',
    ].join(','),
    h1: {
      fontSize: 20,
      lineHeight: 1.15,
      fontWeight: 700,
      fontStyle: 'normal',
      textTransform: 'uppercase',
      "@media (max-width:350px)": {
        fontSize: 16,
      },
      "@media (max-width:768px)": {
        fontSize: 18,
      },
    },
    h2: {
      fontSize: 22,
      lineHeight: 1.2,
      fontWeight: 300,
      fontStyle: 'normal',
    },
    h3: {
      fontSize: 20,
      lineHeight: 1.15,
      fontWeight: 400,
      fontStyle: 'normal',
      margin: 'auto 0',
    },
    h4: {
      fontSize: 18,
      lineHeight: '21px',
      fontWeight: 300,
      fontStyle: 'normal',
    },
    h5: {
      fontSize: 16,
      lineHeight: '18px',
      fontWeight: 300,
      fontStyle: 'normal',
    },
    body1: {
      fontSize: 14,
      lineHeight: '16px',
      fontWeight: 300,
      fontStyle: 'normal',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            fontSize: '14px',
            lineHeight: '16px',
            fontFamily: 'Ubuntu',
            fontStyle: 'normal',
            fontWeight: 400,
            borderRadius: '10px',
            padding: '11px 28px',
            textTransform: 'none',
            margin: '8px',
            flexGrow: 0,
            borderСollapse:'collapse',
            ":disabled": {
              backgroundColor: 'rgba(74, 157, 255, 0.27)',
              color: 'white',
              // opacity: 0.27,
              boxShadow:'none'
            }
// .css-19eep2v-MuiButtonBase-root-MuiButton-root.Mui-disabled{color:rgba(0, 0, 0, 0.26);box-shadow:none;background-color:rgba(0, 0, 0, 0.12);}
          }
        }
      ]
        // fontSize: '1rem',
        // position: 'absolute',
        // left: 15.34%;
        // right: 14.29%;
        // top: 28.95%;
        // bottom: 28.95%;
        //
        // font-family: 'Ubuntu';
        // font-style: normal;
        // font-weight: 400;

      },
  },
  mixins: {
    toolbar: {
      "@media (max-width:350px)": {
        minHeight: Number(process.env.REACT_APP_TOOLBAR_MIN_HEIGHT)-4
      },
      "@media (max-width:768px)": {
        minHeight: Number(process.env.REACT_APP_TOOLBAR_HEIGHT)-2
      },
      minHeight: Number(process.env.REACT_APP_TOOLBAR_HEIGHT)
    }
  }
} as unknown as IThemeOptions);


export const desktop_abtr = {
    drawer : {css: {
      color: '#5D6D97',
      background: '#FFFFFF',
      boxShadow: "4px 0px 10px rgba(93, 109, 151, 0.1)"
   }},
    header : {css: {
      backgroundColor: '#F9F9F9', //
      color: '#5D6E97',
      boxShadow: "4px 0px 10px rgba(93, 109, 151, 0.1)"
    }},
    body :{css: {
      backgroundColor: '#F9F9F9',
      boxShadow: "10px 10px 70px rgba(93, 109, 151, 0.5)",
      position: "absolute"
    }},
    paper :{css: {
      backgroundColor: '#F9F9F9',
    }}
  }
//
// export const desktop_style = {
//     drawer : {css: {
//       color: '#217061',
//       backgroundColor: '#f1f7f6',  /* #dff5eb fallback for old browsers */
//       background: 'linear-gradient(155deg, #f1f7f6 0%, rgba(209,242,227,1) 80%, rgba(151,199,177,1) 100%)'
//    }},
//     header : {css: {
//       backgroundColor: '#457f6f', // '#F0D267',  /* fallback for old browsers */
//       color: 'white',
//       background: 'linear-gradient(345deg, #457f6f 0%, #73bbb1 35%, rgba(27,91,66,1) 100%)',
//     }},
//     body :{css: {
//       backgroundColor: '#f3faf9',  /* fallback for old browsers */
//       background: 'linear-gradient(155deg, #e1e7e2 0%, #c9d2cc 100%)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
//     }}
//   }

  export function StyledH3 (props:any) {
    return(
      <Typography
        variant="h3"
        noWrap
        sx={{
          display: 'flex',
          color: "primary.dark",
          opacity: 0.4
        }}
      >
        {props.children}
      </Typography>
    )
  }

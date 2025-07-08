import React, {useEffect, useState} from "react";
import { Homepage } from "./homepage/Homepage";
import { About } from "./about/About";
import { Gallery } from "./gallery/Gallery";
import { Contact } from "./contact/Contact";
import {createTheme, ThemeProvider, useMediaQuery} from '@mui/material';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { Error } from "./error/Error";

const ThemeContext = React.createContext(null);
export const useMyTheme = () => React.useContext(ThemeContext);
const appTheme = createTheme({
  colorSchemes: {},
  palette: {
    background: {
      main: "#E8ECE4",
      light: "#E8ECE4",
      dark: "#3e4e50"
    },
    primary: {
      main: "#3e4e50",
      light: "#3e4e50",
      dark: "#073036"
    },
    secondary: {
      main: "#9ec1a3",
      light: "#9ec1a3",
      dark: "#9ec1a3"
    },
    text: {
      main: "#343333",
      light: "#343333",
      dark: "#F2F0F2"
    },
    text_primary : {
      main: "#F2F0F2",
      light: "#F2F0F2",
      dark: "#F2F0F2"
    },
    text_secondary: {
      main: "#3e4e50",
      light: "#3e4e50",
      dark: "#073036"
    },
    link: {
      main: "#3e4e50",
      light: "#3e4e50",
      dark: "#cfe0c3"
    },
    link_primary: {
      main: "#cfe0c3",
      light: "#cfe0c3",
      dark: "#cfe0c3"
    },
    link_secondary: {
      main: "#cfe0c3",
      light: "#cfe0c3",
      dark: "#cfe0c3"
    },
  },
  typography: {
    h2: {
      fontFamily: "Vina Sans",
      fontSize: '90px'
    },
    body1: {
      fontFamily: 'Mina',
      fontWeight: '400'
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>,
    errorElement: <Error/>
  },
  {
    path: 'about',
    element: <About/>,
    errorElement: <Error/>
  },
  {
    path: 'gallery',
    element: <Gallery/>,
    errorElement: <Error/>
  },
  {
    path: 'contact',
    element: <Contact/>,
    errorElement: <Error/>
  }
]);

const App = () =>{
  const darkMode = localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') === "true" : useMediaQuery('(prefers-color-scheme: dark)');
  const [theme,setMyTheme] = useState(darkMode ? "dark" : "light");

  useEffect(() => {
    appTheme.colorSchemes.darkMode = theme === "dark";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{theme,setMyTheme}}>
      <ThemeProvider theme={appTheme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
};

export default App;

import React, { useEffect, useState } from "react";
import Homepage from './homepage/Homepage';
import About from './about/About';
import Gallery from './gallery/Gallery';
import Contact from './contact/Contact';
import Error from './error/Error';
import PrivacyPolicy from './legal/PrivacyPolicy';
import LegalNotices from './legal/LegalNotices';
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { IntlProvider } from 'react-intl';
import French from '../i18n/fr.json';
import German from '../i18n/de.json';
import English from '../i18n/en.json';


const Context = React.createContext(null);
export const useAppContext = () => React.useContext(Context);
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
    h1: {
      fontFamily: "Squada",
      textTransform: "uppercase",
      fontSize: '2rem',
      '@media (min-width:380px)': {
        fontSize: '3rem',
      },
      '@media (min-width:550px)': {
        fontSize: '4rem',
      },
      '@media (min-width:720px)': {
        fontSize: '5rem',
      },
      '@media (min-width:1430px)': {
        fontSize: '7rem',
      },
    },
    subtitle1: {
      fontFamily: 'Mina',
      fontSize: '1rem',
      '@media (min-width:720px)': {
        fontSize: '2rem',
      },
      '@media (min-width:1430px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontFamily: "Squada",
      textTransform: "uppercase",
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:750px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:1400px)': {
        fontSize: '4rem',
      },
      '@media (min-width:1600px)': {
        fontSize: '5rem',
      },
    },
    subtitle2: {
      fontFamily: 'Mina',
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
      '@media (min-width:1600px)': {
        fontSize: '2rem',
      },
    },
    body1: {
      fontFamily: 'Mina',
    },
    about: {
      '@media (min-width:850px)': {
        fontSize: '1.3rem',
      },
    },
    projects: {
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:1600px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontFamily: 'Mina',
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:750px)': {
        fontSize: '3.5rem',
      },
      '@media (min-width:1400px)': {
        fontSize: '4rem',
      }
    },
    body2: {
      fontFamily: 'Mina',
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2rem',
      },
      '@media (min-width:750px)': {
        fontSize: '2.5rem',
      },
      '@media (min-width:1400px)': {
        fontSize: '3rem',
      }
    },
    button: {
      fontSize: "0.8rem",
      '@media (min-width:550px)': {
        fontSize: '1rem',
      },
    }
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: 'about' },
          style: {
            fontFamily: 'Mina',
            fontSize: '1rem',
            lineHeight: 1.5,
          },
        },
        {
          props: { variant: 'projects' },
          style: {
            fontFamily: 'Mina',
            fontSize: '1.5rem',
          },
        },
      ],
    },
  },
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
    path: 'projects',
    element: <Gallery/>,
    errorElement: <Error/>
  },
  {
    path: 'contact',
    element: <Contact/>,
    errorElement: <Error/>
  },
  {
    path: 'privacy',
    element: <PrivacyPolicy/>,
    errorElement: <Error/>
  },
  {
    path: 'legal',
    element: <LegalNotices/>,
    errorElement: <Error/>
  }
]);

const App = () =>{
  const preferredColorTheme = useMediaQuery('(prefers-color-scheme: dark)');
  const darkMode = localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') === "true" : preferredColorTheme;
  const [theme,setMyTheme] = useState(darkMode ? "dark" : "light");

  useEffect(() => {
    appTheme.colorSchemes.darkMode = theme === "dark";
    appTheme.palette.mode = theme;
    if (!document.documentElement.classList.contains(theme)) {
      document.documentElement.classList.toggle(theme);
      document.documentElement.classList.toggle(theme === "dark" ? "light" : "dark");
    }
  }, [theme]);

  const [locale, setLocale] = useState('en');
  const [messages, setMessages] = useState(English);

  let lang = English; //default app language
  let local = 'en';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      local = localStorage.getItem("locale");
      if (!local) {
        local = navigator.language?.slice(0, 2) || 'en';
        localStorage.setItem("locale", local);
      }
      lang =
        (local==="de") ? German :
          (local === "fr") ? French :
            English;
      setLocale(local);
      setMessages(lang);
      document.documentElement.lang = local;
    }
    catch (e) {
      console.warn("Failed to load locale:", e);
      setLocale("en");
      setMessages(English);
    }
  }, [])

  function selectLanguage(newLocale) {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
    if (newLocale === 'de') setMessages(German)
    else if (newLocale === 'fr') setMessages(French)
    else setMessages(English);
  }

  return (
    <Context.Provider value={{theme, setMyTheme, locale, selectLanguage}}>
      <ThemeProvider theme={appTheme}>
        <IntlProvider locale={locale} messages={messages}>
          <RouterProvider router={router}/>
        </IntlProvider>
      </ThemeProvider>
    </Context.Provider>
  )
};

export default App;

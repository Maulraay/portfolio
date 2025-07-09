import React, {useEffect, useState} from "react";
import './styles.css';
import {Button, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {withStyles} from "@mui/styles";
import { Menu, DarkMode, DarkModeOutlined } from "@mui/icons-material";
import mainLogo from "../../assets/logo.png";
import { useMyTheme } from "../App";

export const Header = (props) => {
  const goToHomepage = () => {};

  const appTheme = useTheme();
  const {theme,setMyTheme} = useMyTheme();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [currentTheme, setCurrentTheme] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const html = document.documentElement;
    if (!localStorage.getItem("darkMode")) {
      html.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');
      setCurrentTheme(prefersDarkMode ? 'dark' : 'light');
      localStorage.setItem("darkMode", prefersDarkMode.toString());
    }
    else {
      const darkMode = localStorage.getItem('darkMode') === "true";
      html.setAttribute('data-theme', darkMode ? 'dark' : 'light');
      setCurrentTheme(darkMode ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    setMyTheme(currentTheme);
  }, [currentTheme]);

  const StyledButton = withStyles({
    root: {'&:hover': {
        backgroundColor: theme === 'dark' ? appTheme.palette.text_primary.dark : appTheme.palette.text_primary.light,
        color: theme === 'dark' ? appTheme.palette.primary.dark : appTheme.palette.primary.light,
      },
    }})(Button);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    localStorage.setItem("darkMode", currentTheme === 'light' ? 'true' : 'false');
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  return(
    <div className={"header"}>
      <a className={"logo"} href={'/'}>
        <img src={mainLogo} alt={"Main logo"} height={70} onClick={goToHomepage}/>
      </a>

      <div className={"buttons"}>
        <StyledButton color={"#3d383e"} variant={'outlined'} href={'/'}> Home </StyledButton>
        <StyledButton color={"#3d383e"} variant={'outlined'} href={'/about'}> About me </StyledButton>
        <StyledButton color={"#3d383e"} variant={'outlined'} href={'/gallery'}> My projects </StyledButton>
        <StyledButton color={"#3d383e"} variant={'outlined'} href={'/contact'}> Contact </StyledButton>
      </div>
      <div className={"darkModeToggle"}>
        <IconButton className={"darkModeIcon"} onClick={() => toggleTheme()}>
          { currentTheme === 'dark' ? <DarkMode fontSize={"large"}/> : <DarkModeOutlined fontSize={"large"}/> }
        </IconButton>
      </div>
      <div className={"menuIcon"}>
        <IconButton onClick={() => props.toggleMenu(!props.menuState)}>
          <Menu/>
        </IconButton>
      </div>
    </div>
  )
}

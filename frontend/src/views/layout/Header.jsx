import React, {useEffect, useRef, useState} from "react";
import './styles.css';
import { Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon, DarkMode, DarkModeOutlined, KeyboardArrowDown } from "@mui/icons-material";
import mainLogo from "../../assets/logo.png";
import { useAppContext } from "../App";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@mui/styles";

export const toggleTheme = (theme, setTheme) => {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  localStorage.setItem("darkMode", theme === 'light' ? 'true' : 'false');
  setTheme(theme === 'light' ? 'dark' : 'light');
};

export const Header = (props) => {
  const appTheme = useTheme();
  const { theme, setMyTheme, locale, selectLanguage } = useAppContext();

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



  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const isMenuOpened = Boolean(menuAnchorEl);
  const onLanguageSelectorClick = (event) => {
    setMenuAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setMenuAnchorEl(null);
  };
  const onSelect = (event) => {
    selectLanguage(event.target.textContent.toLowerCase());
    handleClose();
  };

  const menuButtonRef = useRef(null);
  const [menuButtonWidth, setMenuButtonWidth] = useState(0);
  useEffect( () => {
    if(menuButtonRef.current){
      setMenuButtonWidth(menuButtonRef.current.offsetWidth || 0);
    }
  }, [menuButtonRef]);

  const StyledMenu = withStyles({
    root: {
      '& .MuiPaper-root': {
        backgroundColor: appTheme.palette.text_primary.main,
        minWidth: `${menuButtonWidth}px`,
        color: theme === 'dark' ? appTheme.palette.primary.dark : appTheme.palette.primary.light,
        border: `${theme === 'dark' ? appTheme.palette.primary.dark : appTheme.palette.primary.light} solid 1px`,
        '& .MuiMenuItem-root': {
          '&:hover': {
            backgroundColor: theme === 'dark' ? appTheme.palette.primary.dark : appTheme.palette.primary.light,
            color: appTheme.palette.text_primary.main,
          },
        }
      }
    }
  })(Menu);

  let dropdownMenu = ["en", "fr", "de"];
  dropdownMenu.splice(dropdownMenu.indexOf(locale),1);
  dropdownMenu = dropdownMenu.map((lang) => (
    <MenuItem key={`menuItem${lang}`} onClick={onSelect} className={"dropdownMenuItem"}>
      {lang.toUpperCase()}
    </MenuItem>
  ));

  return(
    <div className={`header${props.menuState ? " menuOpened" : ""}`}>
      <a className={"logoContainer"} href={'/'}>
        <img src={mainLogo} alt={<FormattedMessage id={"layout.header.logo_alt"} defaultMessage={"Malaury Keslick stylized logo"}/>}  className={"logo"}/>
      </a>
      <div className={"buttons"}>
        <Button variant={'outlined'} href={'/'}> <FormattedMessage id={"layout.header.home"} defaultMessage={"Home"}/> </Button>
        <Button variant={'outlined'} href={'/about'}> <FormattedMessage id={"layout.header.about"} defaultMessage={"About me"}/> </Button>
        <Button variant={'outlined'} href={'/gallery'}> <FormattedMessage id={"layout.header.projects"} defaultMessage={"My projects"}/> </Button>
        <Button variant={'outlined'} href={'/contact'}> <FormattedMessage id={"layout.header.contact"} defaultMessage={"Contact"}/> </Button>
      </div>
      <div className={"darkModeToggle"}>
        <Button
          variant={"contained"}
          endIcon={<KeyboardArrowDown className={"icon"}/>}
          className={"languageSelector"}
          onClick={onLanguageSelectorClick}
          ref={menuButtonRef}
        >
          <span className={"lang"}>{locale}</span>
        </Button>
        <StyledMenu
          anchorEl={menuAnchorEl}
          open={isMenuOpened}
          onClose={handleClose}
          className={"dropdownMenu"}
        >
          {dropdownMenu}
        </StyledMenu>
        <IconButton className={"darkModeIcon"} onClick={() => toggleTheme(currentTheme, setCurrentTheme)} alt={<FormattedMessage id={"layout.header.darkMode_alt"} defaultMessage={"Dark Mode toggle"}/>}>
          { currentTheme === 'dark' ? <DarkMode fontSize={"large"}/> : <DarkModeOutlined fontSize={"large"}/> }
        </IconButton>
        <IconButton onClick={() => props.openMenu()} className={"menuIcon"}>
          <MenuIcon/>
        </IconButton>
      </div>
    </div>
  )
}

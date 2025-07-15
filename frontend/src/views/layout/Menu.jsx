import React, {useState} from "react";
import {Button, IconButton, Typography} from "@mui/material";
import {Cancel, Clear, Copyright, DarkMode, DarkModeOutlined} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import {useAppContext} from "../App";
import {toggleTheme} from "./Header";

export const Menu = (props) => {
  const { theme, locale, selectLanguage } = useAppContext();
  const [currentTheme, setCurrentTheme] = useState(theme);

  let languageList = ["English", "French", "Deutsch"];
  const fullLocale = languageList.find((lang) => lang.slice(0, 2).toLowerCase() === locale);
  languageList.unshift(fullLocale);
  languageList = [...new Set(languageList)]; //we put current locale at the beginning of the list

  const onLanguageClick = (event) => selectLanguage(event.target.textContent.slice(0, 2).toLowerCase());

  return (
    <div className={'menu'}>
      <div className={'topIcons'}>
        <IconButton className={"darkModeIcon"} onClick={() => toggleTheme(currentTheme, setCurrentTheme)} alt={<FormattedMessage id={"layout.header.darkMode_alt"} defaultMessage={"Dark Mode toggle"}/>}>
          { currentTheme === 'dark' ? <DarkMode fontSize={"large"}/> : <DarkModeOutlined fontSize={"large"}/> }
        </IconButton>
        <IconButton className={"closeMenuIcon"} onClick={() => props.closeMenu()}>
          <Cancel/>
        </IconButton>
      </div>
      <div className={'buttons'}>
        <Button variant={'outlined'} href={'/'}> <FormattedMessage id={"layout.header.home"} defaultMessage={"Home"}/> </Button>
        <Button variant={'outlined'} href={'/about'}> <FormattedMessage id={"layout.header.about"} defaultMessage={"About me"}/> </Button>
        <Button variant={'outlined'} href={'/gallery'}> <FormattedMessage id={"layout.header.projects"} defaultMessage={"My projects"}/> </Button>
        <Button variant={'outlined'} href={'/contact'}> <FormattedMessage id={"layout.header.contact"} defaultMessage={"Contact"}/> </Button>
      </div>
      <div className={"languageSelector"}>
        {languageList.map((language) => (
          <Typography
            key={`${language}Button`}
            variant={"button"}
            className={"language"}
            sx={language === fullLocale ?{ textDecoration: "underline", fontWeight: 'bold' } : null}
            onClick={onLanguageClick}>
            {language}
          </Typography>
        ))}
      </div>
      <div className={`copyright`}>
        <Copyright className={'copyrightLogo'} alt={<FormattedMessage id={"layout.footer.copyright_alt"} defaultMessage={"Copyright logo"}/>}/>
        <Typography variant={"overline"} className={"copyrightText"}>
          {new Date().getFullYear()} - Maulray
        </Typography>
        <div className={"socialNetworks"}>
          <IconButton href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={linkedin} height={"20px"} alt={"LinkedIn redirection"}/>
          </IconButton>
          <IconButton href={"https://github.com/Maulraay"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={github} height={"20px"} alt={"GitHub redirection"}/>
          </IconButton>
        </div>
      </div>
    </div>
  )
}


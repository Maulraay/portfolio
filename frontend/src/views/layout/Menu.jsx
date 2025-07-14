import React, {useState} from "react";
import {Button, IconButton, Typography} from "@mui/material";
import {Cancel, Clear, Copyright, DarkMode, DarkModeOutlined} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import {useAppContext} from "../App";
import {toggleTheme} from "./Header";

export const Menu = (props) => {
  const { theme } = useAppContext();
  const [currentTheme, setCurrentTheme] = useState(theme);

  return (
    <div className={'menu'}>
      <div className={'topIcons'}>
        <IconButton className={"darkModeIcon"} onClick={() => toggleTheme(currentTheme, setCurrentTheme)} alt={<FormattedMessage id={"layout.header.darkMode_alt"} defaultMessage={"Dark Mode toggle"}/>}>
          { currentTheme === 'dark' ? <DarkMode fontSize={"large"}/> : <DarkModeOutlined fontSize={"large"}/> }
        </IconButton>
        <Cancel onClick={() => props.closeMenu()}/>
      </div>
      <div className={'buttons'}>
        <Button variant={'outlined'} href={'/'}> <FormattedMessage id={"layout.header.home"} defaultMessage={"Home"}/> </Button>
        <Button variant={'outlined'} href={'/about'}> <FormattedMessage id={"layout.header.about"} defaultMessage={"About me"}/> </Button>
        <Button variant={'outlined'} href={'/gallery'}> <FormattedMessage id={"layout.header.projects"} defaultMessage={"My projects"}/> </Button>
        <Button variant={'outlined'} href={'/contact'}> <FormattedMessage id={"layout.header.contact"} defaultMessage={"Contact"}/> </Button>
      </div>
      <div className={`copyright`}>
        <Copyright className={'copyrightLogo'} alt={<FormattedMessage id={"layout.footer.copyright_alt"} defaultMessage={"Copyright logo"}/>}/>
        <Typography variant={"button"} className={"copyrightText"}>
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


import React from "react";
import './styles.css';
import {IconButton, Typography} from "@mui/material";
import { Copyright, LocalPhone } from "@mui/icons-material";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";

export const Footer = () => {

  return(
    <div className={'footer'}>
      <div className={'copyright'}>
        <Copyright className={'copyrightLogo'}/>
        <Typography variant={"button"} className={"copyrightText"}>
          2025 - Maulray
        </Typography>
        <div className={"socialNetworks"}>
          <IconButton href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"}>
            <img src={linkedin} height={"20px"} alt={"LinkedIn redirection"}/>
          </IconButton>
          <IconButton href={"https://github.com/Maulraay"} target={"_blank"}>
            <img src={github} height={"20px"} alt={"GitHub redirection"}/>
          </IconButton>
        </div>
      </div>
      <Typography className={'support'}>
        <LocalPhone/>
        Want to know more about me ?
        <a href={"/contact"} className={'link'}>Let's plan a call!</a>
      </Typography>
    </div>
  )
}

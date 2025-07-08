import React from "react";
import './styles.css';
import { Typography } from "@mui/material";
import { Copyright, LocalPhone } from "@mui/icons-material";

export const Footer = () => {

  return(
    <div className={'footer'}>
      <div className={'copyright'}>
        <Copyright className={'copyrightLogo'}/>
        <Typography variant={"button"}>
          2025 - Maulray
        </Typography>
      </div>
      <Typography className={'support'}>
        <LocalPhone/>
        Want to know more about me ?
        <a href={"/contact"} className={'link'}>Let's plan a call!</a>
      </Typography>
    </div>
  )
}

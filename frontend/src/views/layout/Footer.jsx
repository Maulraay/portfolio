import React from "react";
import './styles.css';
import { IconButton, Typography } from "@mui/material";
import { Copyright, LocalPhone } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";
import linkedin from "../../../public/assets/linkedin.png";
import github from "../../../public/assets/github.png";

export const Footer = (props) => {
  const intl = useIntl();

  return(
    <div className={`footer${props.menuState ? " menuOpened" : ""}`}>
      <div className={`copyright`} style={props.menuState ? { display: "none" } : {}}>
        <Copyright className={'copyrightLogo'} alt={intl.formatMessage({id: "layout.footer.copyright_alt", defaultMessage: "Copyright logo"})}/>
        <Typography variant={"overline"} className={"copyrightText"}>
          {new Date().getFullYear()} - Maulray
        </Typography>
        <div className={"socialNetworks"}>
          <IconButton href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={linkedin} height={"20px"} alt={intl.formatMessage({id: "layout.footer.linkedin_alt", defaultMessage: "LinkedIn logo"})} loading="lazy"/>
          </IconButton>
          <IconButton href={"https://github.com/Maulraay"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={github} height={"20px"} alt={intl.formatMessage({id: "layout.footer.github_alt", defaultMessage: "GitHub logo"})} loading="lazy"/>
          </IconButton>
        </div>
      </div>
      <Typography className={'support'}>
        <LocalPhone alt={intl.formatMessage({id: "layout.footer.phone_alt", defaultMessage: "Phone logo"})}/>
        <FormattedMessage id={"layout.footer.learnMore"} defaultMessage={"Want to know more about me ?"}/>
        <a href={"/contact"} className={'link'}><FormattedMessage id={"layout.footer.contact"} defaultMessage={"Let's plan a call!"}/></a>
      </Typography>
    </div>
  )
}

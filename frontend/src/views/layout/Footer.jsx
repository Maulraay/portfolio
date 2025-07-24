import React from "react";
import { IconButton, Typography } from "@mui/material";
import { LocalPhone } from "@mui/icons-material";
import { FormattedMessage, useIntl } from "react-intl";

export const Footer = (props) => {
  const intl = useIntl();

  return(
    <div className={`footer${props.menuState ? " menuOpened" : ""}`}>
      <div className={`copyright`} style={props.menuState ? { display: "none" } : {}}>
        <Typography variant={"overline"} className={"copyrightText"}>
          <FormattedMessage id={"layout.footer.madeBy"} defaultMessage={"Made by Maulray"}/> - {new Date().getFullYear()}
        </Typography>
        <div className={"socialNetworks"}>
          <IconButton href={"https://www.linkedin.com/in/malaurykeslick/"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={"/assets/linkedin.png"} height={"20px"} alt={intl.formatMessage({id: "layout.footer.linkedin_alt", defaultMessage: "LinkedIn logo"})}/>
          </IconButton>
          <IconButton href={"https://github.com/Maulraay"} target={"_blank"} rel={"noopener noreferrer"}>
            <img src={"/assets/github.png"} height={"20px"} alt={intl.formatMessage({id: "layout.footer.github_alt", defaultMessage: "GitHub logo"})}/>
          </IconButton>
        </div>
        <Typography className={"legalRedirection"}>
          <a href={"/legal"}  className={'link'}><FormattedMessage id={"legal.title"} defaultMessage={"Legal notices"}/></a> | <a href={"/privacy"}  className={'link'}><FormattedMessage id={"privacy.title"} defaultMessage={"Privacy policy"}/></a>
        </Typography>
      </div>
      <Typography className={'support'}>
        <LocalPhone alt={intl.formatMessage({id: "layout.footer.phone_alt", defaultMessage: "Phone logo"})}/>
        <FormattedMessage id={"layout.footer.learnMore"} defaultMessage={"Want to know more about me ?"}/>
        <a href={"/contact"} className={'link'}><FormattedMessage id={"layout.footer.contact"} defaultMessage={"Let's plan a call!"}/></a>
      </Typography>
    </div>
  )
}

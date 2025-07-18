import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography, Button } from "@mui/material";
import portrait from "../../../public/assets/portrait.png";
import background from "../../../public/assets/background.png";
import smallBackground from "../../../public/assets/background_small.png";
import { FormattedMessage } from "react-intl";

export const Homepage = () => {
  return(
    <Layout>
      <div className={"backgroundDiv"}>
        <img src={background} className={"background"} loading="lazy"/>
        <img src={smallBackground} className={"smallBackground"} loading="lazy"/>
        <div className={"homepage"}>
          <div className={"presentation"}>
            <Typography variant={"h1"} className={"title"}>
              <FormattedMessage id={"homepage.hi"} defaultMessage={"Hi!"}/>
            </Typography>
            <Typography variant={"h1"} className={"title"}>
              <FormattedMessage id={"homepage.iAm"} defaultMessage={"I am Malaury Keslick"}/>
            </Typography>
            <Typography variant={"subtitle1"} className={"title"}>
              <FormattedMessage id={"homepage.jobTitle"} defaultMessage={"A Node.js Web and Software Engineer"}/>
            </Typography>
            <div className={"buttons"}>
              <Button href={'/about'}>
                <FormattedMessage id={"homepage.learnMore"} defaultMessage={"Want to learn more ?"}/>
              </Button>
              <Button href={'/contact'}>
                <FormattedMessage id={"homepage.contact"} defaultMessage={"Contact me!"}/>
              </Button>
            </div>
          </div>
          <img className={"portrait"} src={portrait} alt={<FormattedMessage id={"homepage.picture"} defaultMessage={"Main portrait"}/>} loading="lazy"/>
        </div>
      </div>
    </Layout>
  )
}

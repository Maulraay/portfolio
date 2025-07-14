import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography, Button } from "@mui/material";
import portrait from "../../assets/portrait.png";
import background from "../../assets/background.png";
import smallBackground from "../../assets/background_small.png";
import { FormattedMessage } from "react-intl";

export const Homepage = () => {
  return(
    <Layout>
      <div className={"backgroundDiv"}>
        <img src={background} className={"background"}/>
        <img src={smallBackground} className={"smallBackground"}/>
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
              <Button href={'/about'} size={"large"}>
                <FormattedMessage id={"homepage.learnMore"} defaultMessage={"Want to learn more ?"}/>
              </Button>
              <Button href={'/contact'} size={"large"}>
                <FormattedMessage id={"homepage.contact"} defaultMessage={"Contact me!"}/>
              </Button>
            </div>
          </div>
          <img className={"portrait"} src={portrait} alt={<FormattedMessage id={"homepage.picture"} defaultMessage={"Main portrait"}/>}/>
        </div>
      </div>
    </Layout>
  )
}

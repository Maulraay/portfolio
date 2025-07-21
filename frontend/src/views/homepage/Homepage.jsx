import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography, Button } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

export const Homepage = () => {
  const intl = useIntl();

  return(
    <Layout>
      <div className={"backgroundDiv"}>
        <img src={"/assets/background.png"} className={"background"} loading="lazy" alt=""/>
        <img src={"/assets/background_small.png"} className={"smallBackground"} loading="lazy" alt=""/>
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
          <img className={"portrait"} src={"/assets/portrait.png"} alt={intl.formatMessage({id: "homepage.picture", defaultMessage: "Main portrait"})} loading="lazy"/>
        </div>
      </div>
    </Layout>
  )
}

import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography, Button } from "@mui/material";
import portrait from "../../assets/portrait.png";
import background from "../../assets/background.png";
import { FormattedMessage } from "react-intl";

export const Homepage = () => {
  return(
    <Layout>
      <div className={"homepage"} style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat"}}>
        <div className={"presentation"}>
          <Typography variant={"h2"} fontSize={110} className={"title"}>
            <FormattedMessage id={"homepage.hi"} defaultMessage={"Hi!"}/>
          </Typography>
          <Typography variant={"h2"} fontSize={110} className={"title"}>
            <FormattedMessage id={"homepage.iAm"} defaultMessage={"I am Malaury Keslick"}/>
          </Typography>
          <Typography variant={"body1"} fontSize={50} className={"title"}>
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
        <img className={"portrait"} src={portrait} height={"70%"} alt={<FormattedMessage id={"homepage.picture"} defaultMessage={"Main portrait"}/>}/>
      </div>
    </Layout>
  )
}

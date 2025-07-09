import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import {Typography, Button} from "@mui/material";
import portrait from "../../assets/portrait.png";
import background from "../../assets/background.png";

export const Homepage = () => {
  return(
    <Layout>
      <div className={"homepage"} style={{backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat"}}>
        <div className={"presentation"}>
          <Typography variant={"h2"} fontSize={110} className={"title"}>
            Hi!
          </Typography>
          <Typography variant={"h2"} fontSize={110} className={"title"}>
            I am Malaury Keslick
          </Typography>
          <Typography variant={"body1"} fontSize={50} className={"title"}>
            A Node.js Web and Software Engineer
          </Typography>
          <div className={"buttons"}>
            <Button href={'/about'} size={"large"}>
              Want to learn more ?
            </Button>
            <Button href={'/contact'} size={"large"}>
              Contact me!
            </Button>
          </div>
        </div>
        <img className={"portrait"} src={portrait} height={"70%"} alt={"My portrait"}/>
      </div>
    </Layout>
  )
}

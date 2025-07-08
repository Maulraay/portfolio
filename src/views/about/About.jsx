import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import {Typography} from "@mui/material";
import construction from "../../assets/underConstruction.png";

export const About = () => {
  return (
    <Layout>
      <div className={"about"}>
        <Typography variant={"body1"} fontSize={50} className={"title"}>
          This page will exist soon, stay tuned!
        </Typography>
        <img className={"logo"} src={construction} height={"70%"} alt={"Page under construction image"}/>
      </div>
    </Layout>
  )
}

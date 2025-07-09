import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import construction from "../../assets/underConstruction.png";

export const Gallery = () => {
  return (
    <Layout>
      <div className={"gallery"}>
        <Typography variant={"body1"} fontSize={50} className={"title"}>
          This page will exist soon, stay tuned!
        </Typography>
        <img className={"logo"} src={construction} height={"70%"} alt={"Page under construction image"}/>
        <Typography variant={"body1"} fontSize={25} className={"title"}>
          Until then, you can find the source code of this website on <a href={"https://github.com/Maulraay/portfolio/tree/master"} target={"_blank"} className={'link'}>my Github</a>!
        </Typography>
      </div>
    </Layout>
  )
}

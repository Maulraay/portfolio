import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import construction from "../../../public/assets/underConstruction.png";
import { FormattedMessage } from "react-intl";

export const Gallery = () => {
  return (
    <Layout>
      <div className={"gallery"}>
        <Typography variant={"body1"} fontSize={50} className={"title"}>
          <FormattedMessage id={"projects.willExistSoon"} defaultMessage={"This page will exist soon, stay tuned!"}/>
        </Typography>
        <img className={"logo"} src={construction} height={"70%"} alt={<FormattedMessage id={"projects.underConstruction"} defaultMessage={"Drawing: page under construction"}/>} loading="lazy"/>
        <Typography variant={"body1"} fontSize={25} className={"title"}>
          <FormattedMessage id={"projects.gitHubRedirection"} defaultMessage={"Until then, you can find the source code of this website on my "}/>
          <a href={"https://github.com/Maulraay/portfolio/tree/master"} target={"_blank"} rel={"noopener noreferrer"} className={'link'}>Github</a>!
        </Typography>
      </div>
    </Layout>
  )
}

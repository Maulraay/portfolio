import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

const Gallery = () => {
  const intl = useIntl();

  return (
    <Layout>
      <div className={"gallery"}>
        <Typography variant={"projects"} className={"title"}>
          <FormattedMessage id={"projects.willExistSoon"} defaultMessage={"This page will exist soon, stay tuned!"}/>
        </Typography>
        <img className={"underConstruction"} src={"/assets/underConstruction.webp"} height={"70%"} alt={intl.formatMessage({id: "projects.underConstruction", defaultMessage: "Drawing: page under construction"})} loading="lazy"/>
        <Typography variant={"subtitle2"} className={"title"}>
          <FormattedMessage id={"projects.gitHubRedirection"} defaultMessage={"Until then, you can find the source code of this website on my "}/>
          <a href={"https://github.com/Maulraay/portfolio/tree/master"} target={"_blank"} rel={"noopener noreferrer"} className={'link'}>Github</a>!
        </Typography>
      </div>
    </Layout>
  )
};

export default Gallery;

import React from "react";
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

const Error = () => {
  const intl = useIntl();

  return (
    <Layout>
      <div className={'error'}>
        <img src={"./assets/error.webp"} className={""} alt={intl.formatMessage({id: "error.img_alt", defaultMessage: "'OOPS' illustration"})}/>
        <div className={'errorText'}>
          <Typography variant={"projects"} className={'errorTypography'}>
            <FormattedMessage id={"error.title"} defaultMessage={"Something went wrong..."}/>
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_1"} defaultMessage={"It looks like this page isn’t responding at the moment. This might be due to high traffic or a temporary issue on my end."}/>
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_2"} defaultMessage={"Here are a few things you can try :"}/>
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_3"} defaultMessage={"• Refresh the page after a few moments."}/>
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_4"} defaultMessage={"• Check your internet connection."}/>
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_5_1"} defaultMessage={"• If the issue persists, please "}/>
            <a href={"https://github.com/Maulraay/portfolio/issues/new"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}><FormattedMessage id={"error.content_5_2"} defaultMessage={"fill an issue"}/></a>
            <FormattedMessage id={"error.content_5_3"} defaultMessage={" or contact me at "}/>
            <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>.
          </Typography>
          <Typography variant={"body1"} className={'errorTypography'}>
            <FormattedMessage id={"error.content_6"} defaultMessage={"I apologize for the inconvenience and appreciate your patience!"}/>
          </Typography>
        </div>
      </div>
    </Layout>
  )
}

export default Error;

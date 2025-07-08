import React from "react";
import './styles.css';
import {Layout} from "../layout/Layout";
import { Typography } from "@mui/material";
import { WarningTwoTone, TrendingFlatTwoTone } from "@mui/icons-material";

export const Error = () => {
  return (
    <Layout>
      <div className={'body'}>
        <Typography fontSize={50} className={'errorTypography'}>
          <WarningTwoTone className={'icon'} fontSize={"inherit"}/>
          Oops! Something went wrong.
        </Typography>
        <Typography className={'errorTypography'}>
          It looks like our server isn’t responding at the moment. This might be due to high traffic or a temporary issue on our end.
        </Typography>
        <Typography className={'errorTypography'}>
          Here are a few things you can try:
        </Typography>
        <Typography className={'errorTypography'}>
          <TrendingFlatTwoTone className={'icon'}/>
          Refresh the page after a few moments.
        </Typography>
        <Typography className={'errorTypography'}>
          <TrendingFlatTwoTone className={'icon'}/>
          Check your internet connection.
        </Typography>
        <Typography className={'errorTypography'}>
          <TrendingFlatTwoTone className={'icon'}/>
          If the issue persists, please contact our support team.
        </Typography>
        <Typography className={'errorTypography'}>
          We apologize for the inconvenience and appreciate your patience!
        </Typography>
      </div>
    </Layout>
  )
}

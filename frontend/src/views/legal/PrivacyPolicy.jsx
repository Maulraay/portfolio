import React from "react";
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className={'privacy'}>
        <Typography variant='h2'>
          <FormattedMessage id={"privacy.title"} defaultMessage="Privacy policy"/>
        </Typography>
        <div className={'content'}>
          <Typography variant='about' className={"preamble"}>
            <FormattedMessage id={"privacy_1_1"} defaultMessage="This website includes a contact form that allows visitors to send a message to the site owner."/><br/>
            <FormattedMessage id={"privacy_1_2"} defaultMessage="The following data is collected:"/><br/>
            <FormattedMessage id={"privacy_1_3"} defaultMessage="• Name"/><br/>
            <FormattedMessage id={"privacy_1_4"} defaultMessage="• Email address"/><br/>
            <FormattedMessage id={"privacy_1_5"} defaultMessage="• Subject"/><br/>
            <FormattedMessage id={"privacy_1_6"} defaultMessage="• Message"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_2"} defaultMessage="This data is sent directly via email to the site owner and is not stored on the server or used for any other purpose."/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_3_1"} defaultMessage="No data is shared with third parties."/><br/>
            <FormattedMessage id={"privacy_3_2"} defaultMessage="This site does not use tracking cookies or analytics tools."/>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"privacy_4"} defaultMessage="Purpose of data collection"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_4_1"} defaultMessage="The collected data is used solely to respond to messages sent via the contact form."/>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"privacy_5"} defaultMessage="Data retention"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_5_1"} defaultMessage="Messages received may be kept in the site owner's email inbox for a maximum period of 1 year."/><br/>
            <FormattedMessage id={"privacy_5_2"} defaultMessage="Messages that are part of an ongoing project or conversation may be retained longer as necessary."/>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"privacy_6"} defaultMessage="Your rights"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_6_1"} defaultMessage="In accordance with the GDPR, you have the right to access, correct, or delete your personal data."/><br/>
            <FormattedMessage id={"privacy_6_2"} defaultMessage="To do so, contact: "/>
            <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>.
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"privacy_7"} defaultMessage="Data controller"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"privacy_7_1"} defaultMessage="Name"/>: Malaury Keslick<br/>
            Email: <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>
          </Typography>
          <div className={"endingSpace"}/>
        </div>
      </div>
    </Layout>
  )
}

export default PrivacyPolicy;

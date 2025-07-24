import React from "react";
import { Layout } from "../layout/Layout";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

const LegalNotices = () => {
return (
    <Layout>
      <div className={'legal'}>
        <Typography variant='h2'>
          <FormattedMessage id={"legal.title"} defaultMessage="Legal Notices"/>
        </Typography>
        <Typography variant='about'>
          <FormattedMessage id={"legal.preamble"} defaultMessage="This site is a personal and non-professional portfolio."/>
        </Typography>
        <div className={'content'}>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"legal.editor.title"} defaultMessage="Site author:"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"legal.editor.content.name"} defaultMessage="Name"/>: Malaury Keslick alias Maulray<br/>
            Email: <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a><br/>
            <FormattedMessage id={"legal.editor.content.status"} defaultMessage="Status: Individual, no commercial activity"/><br/>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"legal.host.title"} defaultMessage="Hosting details:"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"legal.host.content.intro"} defaultMessage="This website is hosted by:"/><br/>
            Netlify<br/>
            <FormattedMessage id={"legal.host.content.address_1"} defaultMessage="2325 3rd Street, Suite 296"/><br/>
            <FormattedMessage id={"legal.host.content.address_2"} defaultMessage="San Francisco, California 94107"/><br/>
            <a href={"https://www.netlify.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>https://www.netlify.com</a>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"legal.property.title"} defaultMessage="Intellectual property:"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"legal.property.content"} defaultMessage="The content of this site (texts, images, projects) is the property of its author, unless otherwise stated. Reproduction is prohibited without authorisation."/>
          </Typography>
          <Typography variant='subtitle1' className={'sectionTitle'}>
            <FormattedMessage id={"legal.contact.title"} defaultMessage="Contact:"/>
          </Typography>
          <Typography variant='about'>
            <FormattedMessage id={"legal.contact.content_1"} defaultMessage="For all enquiries, please use "/>
            <a href={"/contact"}  className={'link'}><FormattedMessage id={"legal.contact.content_2"} defaultMessage="the contact form"/></a>
            <FormattedMessage id={"legal.contact.content_3"} defaultMessage=" or write directly to: "/>
            <a href={"mailto:mkeslick.pro@gmail.com"} target={"_blank"} rel={"noopener noreferrer"} className={"link"}>mkeslick.pro@gmail.com</a>.
          </Typography>
          <div className={"endingSpace"}/>
        </div>
      </div>
    </Layout>
  )
}

export default LegalNotices;

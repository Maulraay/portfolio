import React from "react";
import { Layout } from "../layout/Layout";
import { Button, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppContext } from "../App";
import PictureViewer from "../components/PictureViewer";

const About = () => {
  const intl = useIntl();

  const { locale } = useAppContext();

  return (
    <Layout>
      <div className={"about"}>
        <div className={"titleAndOrnaments"}>
          <img src={"/assets/left_ornament_about.webp"} alt="" className={"ornament"}/>
          <Typography variant={"h2"} className={"title"}>
            <FormattedMessage id={"about.title"} defaultMessage={"A little bit more about me"}/>
          </Typography>
          <img src={"/assets/right_ornament_about.webp"} alt="" className={"ornament"}/>
        </div>
        <div className={"globalPresentation"}>
          <div className={"text"}>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.personalPresentation_1"} defaultMessage={"Hey there! I'm Malaury, a 26-year-old software engineer. I'm moving back to Strasbourg after two wonderful years in Switzerland, in the canton of St. Gallen. This chapter allowed me to nurture my creativity and refine my technical skills through the complete design and development of websites like this one, while enjoying an inspiring and relaxing environment between mountains and large lakes."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.personalPresentation_2"} defaultMessage={"When I'm not coding, I love cooking, drawing, singing, and playing video games with my friends. Naturally curious, I'm driven by the desire to understand how things work and to make them accessible. I enjoy creating simple, useful, and intuitive solutions that make life easier rather than more complicated."}/>
            </Typography>
          </div>
          <PictureViewer src={"/assets/meInBuchs.webp"} className={"picture"} width={"30%"} alt={intl.formatMessage({id: "about.personalPresentation_portrait_alt", defaultMessage: "Myself in front of the Werdenbergsee and castle, located in Buchs SG, Switzerland"})}/>
        </div>
        <div className={"divider"}/>
        <div className={"backgroundPresentation"}>
          <PictureViewer src={"/assets/diplome.webp"} width={"30%"} className={"picture"} alt={intl.formatMessage({id: "about.backgroundPresentation_portrait_alt", defaultMessage: "Myself with my graduation gown and diploma at my graduation ceremony"})}/>
          <div className={"text"}>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_1"} defaultMessage={"I have always liked figuring things out - whether it was puzzles, math problems, or tricky bugs in my code. That curiosity naturally led me to study software engineering at Telecom Nancy - a french engineering school from the Mines-Telecom institute. It is a generalist program that gave me strong fundamentals in everything from algorithms to system architecture, and the flexibility to explore all areas of development and switch from one language to another."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_2"} defaultMessage={"I then began my career as a full-stack web engineer at Sopra Steria, within the AI team in Strasbourg, where I worked for three years. I contributed to the development and maintenance of large-scale chatbot solutions, mainly using the MERN stack (MongoDB, Express, React & Node.js)."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_3"} defaultMessage={"Over the past two years, I've continued to expand my skills through the development of this personal website and a site for a research professor, helping her make her scientific work more accessible and centralize course materials for her students."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_4"} defaultMessage={"Today, I'm looking for a web development position in Strasbourg or nearby, or primarily remote. I'd love to join a multidisciplinary team where I can put my skills to use on meaningful, accessible, and purpose-driven projects."}/>
            </Typography>
          </div>
        </div>
        <div className={"divider"}/>
        <div className={"resumeIntegration"} >
          <Typography variant={"about"} align={"center"}>
            <FormattedMessage id={"about.resumeIntroduction_1"} defaultMessage={"If you'd like to know more about my background or specific skills, feel free to take a look at my CV below. And if you have any questions or just want to chat, don't hesitate to "}/>
            <a href={"/contact"} className={'link'}><FormattedMessage id={"about.resumeIntroduction_link"} defaultMessage={"get in touch"}/></a>
            <FormattedMessage id={"about.resumeIntroduction_2"} defaultMessage={" - I am always happy to connect!"}/>
          </Typography>
          <div className={"buttons"}>
            <Button href={`/assets/resume_${locale}.pdf`} size={"large"} target={"_blank"} rel={"noopener noreferrer"}>
              <FormattedMessage id={"about.openResume"} defaultMessage={"Open in pdf-viewer"}/>
            </Button>
            <Button href={`/assets/resume_${locale}.pdf`} size={"large"} target={"_blank"} rel={"noopener noreferrer"} download={true}>
              <FormattedMessage id={"about.downloadResume"} defaultMessage={"Download"}/>
            </Button>
          </div>
          <PictureViewer src={`/assets/resume_${locale}.webp`} width={"60%"} className={"resume"} alt={intl.formatMessage({id: "about.resume_alt", defaultMessage: "Resume"})}/>
          <div className={"endingSpace"}/>
        </div>
      </div>
    </Layout>
  )
};

export default About;

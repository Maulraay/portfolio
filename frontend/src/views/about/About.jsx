import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import { Button, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppContext } from "../App";
import PictureViewer from "../components/PictureViewer";
import meInBuchs from "../../../public/assets/meInBuchs.png";
import diploma from "../../../public/assets/diplome.png";
import resume_en from "../../../public/assets/resume_en.png";
import resume_fr from "../../../public/assets/resume_fr.png";
import resume_de from "../../../public/assets/resume_de.png";
import leftOrnament from "../../../public/assets/left_ornament_about.png";
import rightOrnament from "../../../public/assets/right_ornament_about.png";

export const About = () => {
  const intl = useIntl();

  const { locale } = useAppContext();
  const resume = locale === "de" ? resume_de : locale === "fr" ? resume_fr : resume_en;

  return (
    <Layout>
      <div className={"about"}>
        <div className={"titleAndOrnaments"}>
          <img src={leftOrnament} alt="" className={"ornament"} loading="lazy"/>
          <Typography variant={"h2"} className={"title"}>
            <FormattedMessage id={"about.title"} defaultMessage={"A little bit more about me"}/>
          </Typography>
          <img src={rightOrnament} alt="" className={"ornament"} loading="lazy"/>
        </div>
        <div className={"globalPresentation"}>
          <div className={"text"}>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.personalPresentation_1"} defaultMessage={"Hey there! I am Malaury - a 26-year-old full-stack web developer from France, now happily living in Buchs, in the canton of St. Gallen, Switzerland. I moved here to join my partner and to finally enjoy a life surrounded by the things I love: fresh air, mountains, lakes, and a slower pace that lets me breathe and create freely."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.personalPresentation_2"} defaultMessage={"When I’m not deep into code, you’ll probably find me singing, learning to play the piano, drawing or enjoying a cozy video game session. I’ve always been driven by curiosity and a deep need to understand how things work - which is probably why I fell for computer science in the first place. I love building things that are useful, clear, and that help people save time, not waste it."}/>
            </Typography>
          </div>
          <PictureViewer src={meInBuchs} className={"picture"} width={"30%"} alt={intl.formatMessage({id: "about.personalPresentation_portrait_alt", defaultMessage: "Myself in front of the Werdenbergsee and castle, located in Buchs SG, Switzerland"})}/>
        </div>
        <div className={"divider"}/>
        <div className={"backgroundPresentation"}>
          <PictureViewer src={diploma} width={"30%"} className={"picture"} alt={intl.formatMessage({id: "about.backgroundPresentation_portrait_alt", defaultMessage: "Myself with my graduation gown and diploma at my graduation ceremony"})}/>
          <div className={"text"}>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_1"} defaultMessage={"I have always liked figuring things out - whether it was puzzles, math problems, or tricky bugs in my code. That curiosity naturally led me to study software engineering at Telecom Nancy - a french engineering school from the Mines-Telecom institute. It is a generalist program that gave me strong fundamentals in everything from algorithms to system architecture, and the flexibility to explore all areas of development and switch from one language to another."}/>
            </Typography>
            <Typography variant={"about"} align={"justify"}>
              <FormattedMessage id={"about.backgroundPresentation_2"} defaultMessage={"Since 2021, I have been working as a full-stack developer (mostly with the MERN stack - MongoDB, Express.js, React.js, Node.js), building AI-based chatbots, large-scale web platforms, and user-friendly interfaces. What I’m looking for now is a team and a project I can really get behind - something useful, meaningful, ideally with an environmental or social dimension. And of course, somewhere I can keep learning and growing while settling into this new Swiss life I’m building."}/>
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
            <Button href={`../../../public/assets/resume_${locale}.pdf`} size={"large"} target={"_blank"} rel={"noopener noreferrer"}>
              <FormattedMessage id={"about.openResume"} defaultMessage={"Open in pdf-viewer"}/>
            </Button>
            <Button href={`../../../public/assets/resume_${locale}.pdf`} size={"large"} target={"_blank"} rel={"noopener noreferrer"} download={true}>
              <FormattedMessage id={"about.downloadResume"} defaultMessage={"Download"}/>
            </Button>
          </div>
          <PictureViewer src={resume} width={"60%"} className={"resume"} alt={intl.formatMessage({id: "about.resume_alt", defaultMessage: "Resume"})}/>
          <div className={"endingSpace"}/>
        </div>
      </div>
    </Layout>
  )
}

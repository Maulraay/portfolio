import React from "react";
import './styles.css';
import { Layout } from "../layout/Layout";
import {Button, Typography} from "@mui/material";
import meInBuchs from "../../assets/meInBuchs.png";
import diploma from "../../assets/diplome.png";
import resume from "../../assets/resume.png";
import leftOrnament from "../../assets/left_ornament_about.png";
import rightOrnament from "../../assets/right_ornament_about.png";

export const About = () => {
  return (
    <Layout>
      <div className={"about"}>
        <div className={"titleAndOrnaments"}>
          <img src={leftOrnament}/>
          <Typography variant={"h2"} fontSize={80} className={"title"}>
            A little bit more about me
          </Typography>
          <img src={rightOrnament}/>
        </div>
        <div className={"globalPresentation"}>
          <div className={"text"}>
            <Typography variant={"body1"} fontSize={22} align={"justify"}>
              Hey there! I am Malaury - a 26-year-old full-stack web developer from France, now happily living in Buchs, in the canton of St. Gallen, Switzerland. I moved here to join my partner and to finally enjoy a life surrounded by the things I love: fresh air, mountains, lakes, and a slower pace that lets me breathe and create freely.
            </Typography>
            <Typography variant={"body1"} fontSize={22} align={"justify"}>
              When I’m not deep into code, you’ll probably find me singing, learning to play the piano, drawing or enjoying a cozy video game session. I’ve always been driven by curiosity and a deep need to understand how things work - which is probably why I fell for computer science in the first place. I love building things that are useful, clear, and that help people save time, not waste it.
            </Typography>
          </div>
          <img src={meInBuchs} className={"picture"} width={"30%"} alt={"Myself in front of the Werdenbergsee and castle"}/>
        </div>
        <div className={"divider"}/>
        <div className={"background"}>
          <img src={diploma} width={"30%"} className={"Graduation ceremony picture"}/>
          <div className={"text"}>
            <Typography variant={"body1"} fontSize={22} align={"justify"}>
              I have always liked figuring things out - whether it was puzzles, math problems, or tricky bugs in my code. That curiosity naturally led me to study software engineering at Telecom Nancy - a french engineering school from the Mines-Telecom institute. It is a generalist program that gave me strong fundamentals in everything from algorithms to system architecture, and the flexibility to explore all areas of development and switch from one language to another.
            </Typography>
            <Typography variant={"body1"} fontSize={22} align={"justify"}>
              Since 2021, I have been working as a full-stack developer (mostly with the MERN stack - MongoDB, Express.js, React.js, Node.js), building AI-based chatbots, large-scale web platforms, and user-friendly interfaces. What I’m looking for now is a team and a project I can really get behind - something useful, meaningful, ideally with an environmental or social dimension. And of course, somewhere I can keep learning and growing while settling into this new Swiss life I’m building.
            </Typography>
          </div>
        </div>
        <div className={"divider"}/>
        <div className={"resumeIntegration"} >
          <Typography variant={"body1"} fontSize={21} align={"center"}>
            If you'd like to know more about my background or specific skills, feel free to take a look at my CV below. And if you have any questions or just want to chat, don't hesitate to <a href={'/contact'} className={'link'}>get in touch</a> - I'm always happy to connect!          </Typography>
          <div className={"buttons"}>
            <Button href={'/assets/resume.pdf'} size={"large"} target={"_blank"} rel={"noopener noreferrer"}>
              Open in pdf-viewer
            </Button>
            <Button href={'/assets/resume.pdf'} size={"large"} target={"_blank"} rel={"noopener noreferrer"} download={true}>
              Download
            </Button>
          </div>
          <img src={resume} width={"60%"} className={"resume"}/>
          <div className={"endingSpace"}/>
        </div>
      </div>
    </Layout>
  )
}

import React from "react";
import { Layout } from "../layout/Layout";
import { Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";

const ProjectCard = (props = {}) => {
  const {project, ...rest} = props;

  const TitleComponent = (props) => (
    <Typography fontSize={"1.5rem"} className={props.mode}>
      {project.title} <br/>
      <Typography sx={{ fontStyle: 'italic' }}>
        {project.date}
      </Typography>
    </Typography>
  )

  return (
    <Card>
      <div className={"smallScreenHeader"}>
        <CardMedia
          component="img"
          alt={project.imgAlt}
          sx={{ width: "20%", objectFit: "contain", minWidth: "250px" }}
          image={`/assets/${project.img}.webp`}
        />
        <TitleComponent mode={"smallScreenCardTitle"} />
      </div>
      <CardContent>
        <TitleComponent mode={"bigScreenCardTitle"} />
        <Typography sx={{ textAlign: "justify", hyphens: "auto", overflowWrap: "break-work", wordBreak: "break-word" }} className={"projectDescr"}>
          {project.description}
        </Typography>
        <div className={"stack"}>
          {project.stack && project.stack.map((item, index) => {
            const className = item.split(" ")[0];
            return (<Chip key={`tech${index}`} label={item} className={className} />)
          })}
        </div>
      </CardContent>
    </Card>
  )
}

const Gallery = () => {
  const intl = useIntl();

  const projects = [
    {
      key: "Project_1",
      img: "researcher",
      imgAlt: intl.formatMessage({id: "projects.1.img_alt", defaultMessage: "Teacher-researcher illustration"}),
      title: intl.formatMessage({id: "projects.1.title", defaultMessage: "Teacher-researcher website development"}),
      date: intl.formatMessage({id: "projects.1.date", defaultMessage: "2025 - Currently in designing phase"}),
      description: intl.formatMessage({id: "projects.1.descr", defaultMessage: "Descr todo"}),
      stack: ["Figma", "Javascript", "HTML", "CSS", "Webpack", "Google Drive API", "Netlify"]
    },
    {
      key: "Project_2",
      img: "portfolio",
      imgAlt: intl.formatMessage({id: "projects.2.img_alt", defaultMessage: "Portfolio illustration"}),
      title: intl.formatMessage({id: "projects.2.title", defaultMessage: "Personal portfolio development (aka this website!)"}),
      date: intl.formatMessage({id: "projects.2.date", defaultMessage: "2025"}),
      description: intl.formatMessage({id: "projects.2.descr", defaultMessage: "Descr todo"}),
      stack: ["Javascript", "HTML", "CSS", "Webpack", "Netlify"]
    },
    {
      key: "Project_3",
      img: "chatbot",
      imgAlt: intl.formatMessage({id: "projects.3.img_alt", defaultMessage: "Chatbot illustration"}),
      title: intl.formatMessage({id: "projects.3.title", defaultMessage: "Junior Web Engineer at Sopra Steria, Strasbourg, France"}),
      date: intl.formatMessage({id: "projects.3.date", defaultMessage: "From 2021 to 2024"}),
      description: intl.formatMessage({id: "projects.3.descr", defaultMessage: "Descr todo"}),
      stack: ["Javascript", "Typescript", "React", "HTML", "CSS", "Webpack", "Express", "MongoDB", "IBM Cloud", "Openshift"]
    }
  ];

  return (
    <Layout>
      <div className={"galleryBackground"}>
        <div className={"gallery"}>
          <Typography variant={"h2"} className={"title"}>
            <FormattedMessage id={"projects.title"} defaultMessage={"Discover my work"}/>
          </Typography>
          <div className={"projectsContainer"}>
            {projects ? projects.map((item, index) => {
              return (<ProjectCard project={item} key={index}/>)
            }) : null}
          </div>
          <Typography variant={"subtitle2"} className={"title"}>
            <FormattedMessage id={"projects.gitHubRedirect"} defaultMessage={"Feel free to visit my "}/><a href={"https://github.com/Maulraay"} target={"_blank"} rel={"noopener noreferrer"} className={'link'}>Github</a><FormattedMessage id={"projects.gitHubRedirect_2"} defaultMessage={"!"}/>
          </Typography>
        </div>
      </div>
    </Layout>
  )
};

export default Gallery;

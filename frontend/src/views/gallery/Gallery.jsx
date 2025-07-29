import React, {useEffect, useState} from "react";
import { Layout } from "../layout/Layout";
import {Box, Card, CardContent, CardMedia, Chip, IconButton, Typography} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";

const projects = [
  {
    key: "Project_1",
    title: "Project 1",
    description: "Project 1 descr",
    stack: ["tech1", "tech2", "tech3", "tech4"]
  },
  {
    key: "Project_2",
    title: "Project 2",
    description: "Project 2 descr",
    stack: ["tech1", "tech2", "tech3", "tech4"]
  },
  {
    key: "Project_3",
    title: "Project 3",
    description: "Project 3 descr",
    stack: ["tech1", "tech2", "tech3", "tech4"]
  }
];

const ProjectCard = (project) => {
  return (
    <Card>
      <div className={"cardHeader"}>
        <Typography variant={"about"} align={"justify"}>
          {project.title}
        </Typography>
      </div>
      <CardContent>
        {project.description}
      </CardContent>
      <div className={"stack"}>
        {project.stack.map((item, index) => {
          return (<Chip key={`tech${index}`} label={item}/>)
        })}
      </div>
    </Card>
  )
}

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [visibleProjects, setVisibleProjects] = useState(projects.slice(
    Math.max(currentIndex - 1, 0),
    Math.min(currentIndex + 2, projects.length)
  ));

  const total = projects.length;
  const mod = (n, m) => ((n % m) + m) % m;

  const getRelativeIndex = (index) => {
    if (index === mod(currentIndex - 1, total)) return "left";
    if (index === currentIndex) return "center";
    if (index === mod(currentIndex + 1, total)) return "right";
    return "hidden";
  };

  const next = () => setCurrentIndex((i) => mod(i + 1, total));
  const prev = () => setCurrentIndex((i) => mod(i - 1, total));

  const getStyles = (position) => {
    const base = {
      position: "absolute",
      transition: "all 0.5s ease",
      height: "85%",
      width: "30%",
      opacity: 0,
      transform: "translateX(0) scale(0.8)",
      zIndex: 1,
    };

    switch (position) {
      case "left":
        return {
          ...base,
          opacity: 0.6,
          transform: "translateX(-100%) scale(0.8)",
        };
      case "center":
        return {
          ...base,
          opacity: 1,
          transform: "translateX(0) scale(1)",
          zIndex: 3,
        };
      case "right":
        return {
          ...base,
          opacity: 0.6,
          transform: "translateX(100%) scale(0.8)",
        };
      default:
        return {
          ...base,
          left: "100%",
          opacity: 0,
          pointerEvents: "none",
        };
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
    >
      <IconButton
        onClick={prev}
        sx={{ zIndex: 3 }}
      >
        <ChevronLeft fontSize="large" />
      </IconButton>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "80%", height: "100%", position: "relative"}}
      >
        {visibleProjects.map((project, index) => {
          const pos = getRelativeIndex(index);
          const style = getStyles(pos);

          return (
            <Box key={project.id} sx={style}>
              <ProjectCard {...project} />
            </Box>
          );
        })}
      </Box>

      <IconButton
        onClick={next}
        sx={{ zIndex: 3 }}
      >
        <ChevronRight fontSize="large" />
      </IconButton>
    </Box>
  );
}

const Gallery = () => {

  return (
    <Layout>
      <div className={"gallery"}>
        <Typography variant={"h2"} className={"title"}>
          Discover my work
        </Typography>
        <div className={"projectsContainer"}>
          <ProjectCarousel />
        </div>
        <Typography variant={"subtitle2"} className={"title"}>
          Feel free to visit my <a href={"https://github.com/Maulraay"} target={"_blank"} rel={"noopener noreferrer"} className={'link'}>Github</a>!
        </Typography>
      </div>
    </Layout>
  )
};

export default Gallery;

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({image, file, title, description}) => {
  const notifyGa = () => {ga && ga('send', 'event', 'File Download', 'click', title)};
  return pug`
    .project-card.animated
      h2.project-card__title= title
        if file && file !== ""
          span &nbsp
          a(href=${file} onClick=${notifyGa})
            FontAwesomeIcon.download(icon=${faFile})
      .project-card__info
        if image && image !== ""
          img.project-card__image(src=${image})
        ReactMarkdown(source=${description})
  `
};

export default ProjectCard

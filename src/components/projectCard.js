import React from 'react'
import ReactMarkdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({image, file, title, description}) => (
  pug`
    .project-card.animated
      h2.project-card__title= title
        if file && file !== ""
          span &nbsp
          a(href=${file})
            FontAwesomeIcon(icon=${faFile})
      if image !== ""
        .column
          img.project-card__image(src=${image})
      .project-card__info
        ReactMarkdown(source=${description})
  `
)

export default ProjectCard

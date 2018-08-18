import React from 'react'
import ReactMarkdown from 'react-markdown'

const ProjectCard = ({image, title, description}) => (
  pug`
    .project-card.animated
      h2.project-card__title= title
      if image !== ""
        .column
          img.project-card__image(src=${image})
      .project-card__info
        ReactMarkdown(source=${description})
  `
)

export default ProjectCard

import React from 'react'
import Section from '../components/section'
import ProjectCard from '../components/projectCard'
import ProjectStore from '../models/ProjectStore'
class IndexPage extends React.Component {
  render() {
    return pug`
      div
        Section
          h1 About
          p I'm a web developer at The Humane League. I come from a background in academic philosophy, where I specialized in metaethics, the philosophy of probability, and the philosophy of mind.  On this website, you can find a selection of papers and projects.
        Section
          h1 Projects
          ${this.renderCheckBoxes()}
          ${this.renderProjects()}
    `}

    renderCheckBoxes() {
      return pug`
        span
          label Philosophy
          .button
          label Ethics
          .button
          label Metaethics
          .button
      `
    }

    renderProjects() {
      return ProjectStore.all.map(project => (
        pug`
          ProjectCard(
            image=${project.image},
            description=${project.description},
            title=${project.title},
          )
        `
      ))
    }
}

export default IndexPage

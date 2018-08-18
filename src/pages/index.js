import React from 'react'
import Section from '../components/section'
import ProjectCard from '../components/projectCard'
import ProjectStore from '../models/ProjectStore'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

class IndexPage extends React.Component {
  constructor() {
    super();
    this.state = { selectedFields: [] }
  }
  render() {
    return pug`
      div
        Section
          h1 About
          p I'm a web developer at The Humane League. I come from a background in academic philosophy, where I specialized in metaethics, the philosophy of probability, and the philosophy of mind.  On this website, you can find a selection of papers and projects.
        Section
          h1 Projects
          .row
            ${this.renderCheckBoxes()}
          br
          br
          ReactCSSTransitionGroup(
            transitionName=${ {
              enter: 'bounce',
              enterActive: 'fadeIn',
              leave: 'fadeOut',
              leaveActive: 'leaveActive',
            } }
            transitionEnterTimeout=${500}
            transitionLeaveTimeout=${500}
          )
            ${this.renderProjects()}
    `}

    renderCheckBoxes() {
      const selectables = ProjectStore.getTags();
      return pug`
        .row
          = selectables.map(this.renderSelectable.bind(this))
      `;
    }

    renderSelectable(name) {
      return pug`
        span.select-option
          label= name
          .button(
            onClick=${this.handleSelect.bind(null, name)}
            className=${this.state.selectedFields.indexOf(name) !== -1 && "selected"}
        )
      `;
    }
    renderProjects() {
      return ProjectStore.filter(this.state.selectedFields).map(project => (
        pug`
          ProjectCard(
            image=${project.image},
            description=${project.description},
            key=${project.title},
            title=${project.title},
          )
        `
      ))
    }

    handleSelect = ( field ) => {
      let fields = this.state.selectedFields;
      if (fields.indexOf(field) == -1) { fields.push(field) }
      else { fields.splice(fields.indexOf(field), 1);}
      this.setState({ selectedFields: fields })
    }
}

export default IndexPage

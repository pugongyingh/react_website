import React from 'react'

const Section = ({children}) => (
  pug`
    .section
      .section-content
        ${children}
  `
)

export default Section

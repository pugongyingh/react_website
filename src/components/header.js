import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  pug`
  nav
    div
      h1 Derek Shiller
      h5 Web Developer / Philosopher
    img.avatar(src="/static/assets/images/avatar.jpg")
  `
)

export default Header

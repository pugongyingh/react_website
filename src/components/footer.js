import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons'

class Footer extends React.Component {
  render(){
    return pug`
      .footer
        .icon-row
          FontAwesomeIcon(icon=${faGithub})
          FontAwesomeIcon(icon=${faLinkedin})
          FontAwesomeIcon(icon=${faEnvelope})
          .icon-holder
            FontAwesomeIcon.CV(icon=${faFile})
            .cv CV

          .icon-holder
            FontAwesomeIcon(icon=${faFile})
            .resume R
    `
  }
}

export default Footer;

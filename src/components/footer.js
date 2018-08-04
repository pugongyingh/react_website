import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';
import files from '../../public/data/files.json';

class Footer extends React.Component {
  render(){
    return pug`
      .footer
        .icon-row
          a(href="https://github.com/dcshiller")
            FontAwesomeIcon(icon=${faGithub})
          a(href="https://www.linkedin.com/in/derek-shiller-3a254b121")
            FontAwesomeIcon(icon=${faLinkedin})
          a(href="mailto:dcshiller@gmail.com")
            FontAwesomeIcon(icon=${faEnvelope})
          a(href=${files.cv})
            .icon-holder
              FontAwesomeIcon.CV(icon=${faFile})
              .cv CV
          a(href=${files.resume})
            .icon-holder
              FontAwesomeIcon(icon=${faFile})
              .resume R
    `
  }
}

export default Footer;

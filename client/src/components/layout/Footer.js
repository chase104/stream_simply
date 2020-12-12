import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Footer = () => {
  return (
    <div style={{backgroundColor: "#181b24", display: "flex", marginTop: "80px"}} className="main-footer">
      <div className="container">
        <div className="column-holder" >
          <div className="footer-column">
            <h5 className="footer-title">APP By Chase Van Halen</h5>
            <ul className="list-unstyled">
              <li>chase.vanhalen88@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/chase-van-halen-8068a5108/" target="_blank" className="footer-link">LinkedIn <ExitToAppIcon /></a> </li>
              <li><a href="https://github.com/chase104" target="_blank">GitHub <ExitToAppIcon /></a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5  className="footer-title">Other Apps By Chase</h5>
            <ul className="list-unstyled">
            <li><a href="https://github.com/chase104" target="_blank">FreeFinance <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank">A Kitchen's Cookbook <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank">CodingParadise <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank">Local Business Hub <ExitToAppIcon /></a></li>
            </ul>
          </div>
          <div className="footer-column">
          <h5  className="footer-title">Is Chase Looking For A Job?</h5>
          <div>blinking light here</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

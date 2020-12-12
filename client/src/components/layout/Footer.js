import React from 'react'

const Footer = () => {
  return (
    <div style={{backgroundColor: "#181b24", display: "flex"}} className="main-footer">
      <div className="container">
        <div className="" style={{display: "flex"}}>
          <div className="footer-column">
            <h5 className="footer-title">APP Created By Chase Van Halen</h5>
            <ul className="list-unstyled">
              <li>chase.vanhalen88@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/chase-van-halen-8068a5108/">LinkedIn</a></li>
              <li><a href="https://github.com/chase104">GitHub</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5  className="footer-title">Other Apps By Chase</h5>
            <ul>
            <li><a href="https://github.com/chase104">FreeFinance</a></li>
            <li><a href="https://github.com/chase104">A Kitchen's Cookbook</a></li>
            <li><a href="https://github.com/chase104">CodingParadise</a></li>
            <li><a href="https://github.com/chase104">Local Business Hub</a></li>
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

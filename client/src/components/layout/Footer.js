import React, {useState, useEffect} from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlareIcon from '@material-ui/icons/Flare';
import RemoveIcon from '@material-ui/icons/Remove';



const Footer = () => {


  const [blinkerState, setBlinkerState] = useState(true)
  const [effectInterval, setEffectInterval] = useState(true)

  useEffect(() => {
    setInterval(function(){
      setBlinkerState(false)
      setTimeout(function(){
        setBlinkerState(true)
      }, 100)
    }, 1000)
  }, [])



  return (
    <div style={{backgroundColor: "#181b24", display: "flex", marginTop: "80px"}} className="main-footer">
      <div className="container">
        <div className="column-holder" >
          <div className="footer-column">
            <h5 className="footer-title">APP By Chase Van Halen</h5>
            <ul className="list-unstyled">
              <li className="footer-link">chase.vanhalen88@gmail.com</li>
              <li><a href="https://www.linkedin.com/in/chase-van-halen-8068a5108/" target="_blank" className="footer-link footer-hover">LinkedIn <ExitToAppIcon /></a> </li>
              <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">GitHub <ExitToAppIcon /></a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h5  className="footer-title">Other Apps By Chase</h5>
            <ul className="list-unstyled">
            <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">FreeFinance <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">A Kitchen's Cookbook <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">CodingParadise <ExitToAppIcon /></a></li>
            <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">Local Business Hub <ExitToAppIcon /></a></li>
            </ul>
          </div>
          <div className="footer-column">
          <h5  className="footer-title">Is Chase Available For A Job?</h5>
          <div className="blinker-holder">
            {blinkerState ? <FlareIcon  className="blinker-icon"/> : <RemoveIcon className="blinker-icon"/>}
            <div className="available-color">Yes</div>
          </div>
          <ul className="list-unstyled">
            <li style={{color: "#ffdb84", paddingLeft: "4px"}}>Full Stack Developer</li>
            <li style={{color: "#ffdb84", paddingLeft: "4px"}}>Front-End / Back-End</li>
            <li><a href="https://github.com/chase104" target="_blank" className="footer-link footer-hover">Portfolio <ExitToAppIcon /></a></li>

          </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

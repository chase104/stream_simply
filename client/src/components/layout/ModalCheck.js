import React, { Component } from 'react'
class Modal extends Component  {

  componentDidMount() {
    console.log("mounting");
    const M = window.M
    document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, {});
});
  console.log("finish mounting");
  }

  render() {
    return (
      <div>
        <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4 className="black-text">Modal Header</h4>
            <p className="black-text">A bunch of text</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal

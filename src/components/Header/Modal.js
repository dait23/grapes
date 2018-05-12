import React, {Component} from 'react';

class Modal extends Component {
  render() {
    return (
      <div>


    
        <div className="modal fade" id="myModal" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <i className="ion-close"></i></button>
              <div className="modal-body login-box">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" classN="active"><a href="#tab1" data-toggle="tab">SIGN IN</a></li>
                  <li role="presentation"><a href="#tab2" data-toggle="tab">CREATE A ACCOUNT</a></li>
                </ul>

                <div className="tab-content">
                  <div role="tabpanel" className="tab-pane active" id="tab1">
                    <form className="row">
                      <div className="form-group col-xs-12">
                        <label>Your E-mail</label>
                        <input type="text" />
                      </div>
                      <div className="form-group col-xs-6">
                        <label>Your Password</label>
                        <input type="password" />
                      </div>
                      <div className="form-group col-xs-6">
                        <label>&nbsp;</label>
                        <button type="submit">SIGN IN</button>
                      </div>
                      <div className="form-group col-xs-12 text-center"> <a href="#">Forget Password ?</a> </div>
                      <div className="form-group col-xs-12 text-center"> Or </div>
      
                      
                      <div className="form-group col-xs-6"> <a href="#" className="twitter"><i className="fa fa-twitter"></i> TWITTER</a> </div>
           
                      <div className="form-group col-xs-6"> <a href="#" className="facebook"><i className="fa fa-facebook"></i> FACEBOOK</a> </div>
               
                    </form>
                    <div className="new-account">
                      <h5>Don't you have an account</h5>
                      <a href="#tab2" data-toggle="tab">SIGN UP FOR FREE</a> </div>
                  </div>
                  <div role="tabpanel" className="tab-pane" id="tab2">
                    <form className="row">
                      <div className="form-group col-xs-12">
                        <label>Your E-mail</label>
                        <input type="text" />
                      </div>
                      <div className="form-group col-xs-6">
                        <label>Your Password</label>
                        <input type="password" />
                      </div>

                      <div className="form-group col-xs-6">
                        <label>Your Password Again</label>
                        <input type="password" />
                      </div>
   
                      <div className="form-group col-xs-12 text-center">
                        <p> Creating an account I agree </p>
                        <p>
                          <input type="checkbox" />
                          <a href="#">Terms Policy</a> and <a href="#">Privacy Policy</a></p>
                      </div>
                      <div className="form-group col-xs-12">
                        <label>&nbsp;</label>
                        <button type="submit">SIGN UP</button>
                      </div>
                      <div className="form-group col-xs-12 text-center"> <span className="or">Or </span></div>

                      
                      <div className="form-group col-xs-6"> <a href="#" className="twitter"><i className="fa fa-twitter"></i> TWITTER</a> </div>

                      <div className="form-group col-xs-6"> <a href="#" className="facebook"><i className="fa fa-facebook"></i> FACEBOOK</a> </div>
                    </form>
                  </div>
   
                </div>

              </div>

            </div>
    
          </div>

        </div>
      




      </div>
    )
  }
}

export default Modal;

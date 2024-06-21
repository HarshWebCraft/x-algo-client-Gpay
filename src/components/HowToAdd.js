import React from 'react'
import help1 from '../images/help1.png'
import help2 from '../images/help2.png'
import help3 from '../images/help3.png'
import help4 from '../images/help4.png'
import help5 from '../images/help5.png'
import help6 from '../images/help6.png'
import help7 from '../images/help7.png'
function HowToAdd() {
    return (
        <div>
            <div className="body body--start p-home">
        <div className="fr-view">
          <div className="body body--start ">
            <section className="main" id="main">
              <div className="main__bg main__bg-0 position-absolute w-100 h-100"></div>
              <div className="main__wrapper position-relative">
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <h1 className="main__title">Configure-AngelBroking</h1>
                      <p><span style={{fontSize: '18px'}}>To connect Angel Broking , follow the steps below</span></p><p><br /></p><p><span style={{fontSize: '18px'}}>1. &nbsp;Make an account / Login to SmartAPI <a href="https://smartapi.angelbroking.com/signin" rel="noopener noreferrer" target="_blank">here</a></span></p><p><br /></p><p><br /></p>
                      <div className="fr-img-space-wrap">
                        <img src={help1} style={{width: '400px'}} className="fr-fic fr-dib fr-fil" />
                        <p className="fr-img-space-wrap2" />
                      </div>
                      <p><br /></p>
                      <p><br /></p>
                      <p><span style={{fontSize: '18px'}}>2 Create a new app to allow connection between Angel Broking and . Click on "Create new app".
                        </span>
                      </p>
                      <p><br />
                      </p><p><br />
                      </p><p>
                        <img src={help2} style={{width: '400px'}} className="fr-fic fr-dib fr-=fil" />
                      </p><p>
                        <span style={{fontSize: '18px'}}><br /></span>
                      </p><p><span style={{fontSize: '18px'}}>3
                          . Create a SmartAPI trading app with below details:</span></p><ol><li><span style={{fontSize: '18px'}}>Redirect URL: </span></li>
                        </ol><p><br />
                      </p><p></p><p><br /></p><p><span style={{fontSize: '18px'}}>4. Note down the API Key and Secret Key</span></p><p><br /></p><p><img src={help3} style={{width: '700px'}} className="fr-fic fr-dib fr-fil" /></p><p><br /></p><p><br />
                      </p><p><span style={{fontSize: '18px'}}>5. Login to Tradetron, and go to Broker &amp; Exchanges from the top right corner&nbsp;</span></p><p><br /></p><p><br /></p><p><img src={help4} style={{width: '550px'}} className="fr-fic fr-dib fr-fil" /></p><p><br /></p><p><br /></p><p><span style={{fontSize: '18px'}}>6. Add Broker &amp; Select Angel Broking from the drop-down menu</span></p><p><br /></p><p><img src={help5} style={{width: '550px'}} className="fr-fic fr-dib fr-fil" /></p><p><span style={{fontSize: '18px'}}>7. Populate the API Key and other login details and click save</span></p>
                      <p><br /></p><p><img src={help6} style={{width: '550px'}} className="fr-fic fr-dib fr-fil" /></p><p><br /></p><p><br /></p><p><br /></p><p><span style={{fontSize: '18px'}}>8.&nbsp;<span style={{fontSize: '18px', color: 'rgb(65, 65, 65)', fontFamily: 'sans-serif', fontStyle: 'normal', fontVariantLigatures: 'normal', fontVariantCaps: 'normal', fontWeight: 400, letterSpacing: 'normal', orphans: 2, textAlign: 'left', textIndent: '0px', textTransform: 'none', whiteSpace: 'normal', widows: 2, wordSpacing: '0px', WebkitTextStrokeWidth: '0px', backgroundColor: 'rgb(255, 255, 255)', textDecorationThickness: 'initial', textDecorationStyle: 'initial', textDecorationColor: 'initial', display: 'inline !important', float: 'none'}}>Now the broker is added successfully. However, to trade, you need to generate the token manually every day before the market opens. Go to the broker and exchange section and click on the token generation button for the same</span></span></p><div className="fr-img-space-wrap"><img src={help7} style={{width: '750px'}} className="fr-fic fr-dib fr-fil" /><p className="fr-img-space-wrap2">&nbsp;</p></div><p><br /></p><p><span style={{fontSize: '18px'}}>Now you are all set for Algo trading!</span><strong><br /></strong></p><p><br /></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
        </div>
    )
}

export default HowToAdd
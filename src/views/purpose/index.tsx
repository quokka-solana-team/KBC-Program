import { Link } from 'react-router-dom';

function Purpose() {
  return (
    <div>
      <div className="header" style={{ margin: '0 50px' }}>
        <div className="logo">
          <Link to={`/`} className='standard-logo'>
            <img
              src="images/logo.png"
              alt="KidsBeatCancer"
              width='60'
            />
          </Link>
        </div>
        <div className="header-links">
          <ul className="header-items">

            <li className="header-item">
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            <li className="header-item current">
              <Link className="header-link" to="/purpose">
                Puropse
              </Link>
            </li>
            <li className="header-item">
              <Link className="header-link" to="/partners">
                Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <section id="content" >
        <div className="content-wrap pb-0 " style={{
          background: "#fff url('images/hero-bg.svg') repeat top center",
          backgroundSize: "cover",
        }}>

          <div className="container mw-md mt-0">
            <h2 className="display-3 fw-bolder">
              The&nbsp;<span className="gradient-text gradient-red-yellow">Purpose</span>

            </h2>
            <div className="row justify-content-center mt-4">
              <div className="col-md-10 col-11">
                <p className="lead" style={{ textAlign: 'justify' }}>
                  KidsBeatCancer is a non-profit project created by four blockchain enthusiasts aiming
                  to bring the best of this technology to the world while making a social impact with
                  it. Throughout the journey that lies ahead, this non-profit project aims to assist
                  and support other non-profit institutions and initiatives that investigate, treat
                  and fight Childhood cancer diseases, with unmatched transparency and commitment
                  thanks to public blockchains.
                </p>
                <p className="lead" style={{ textAlign: 'justify' }}>
                  JOJO encompasses the kid inside each of us. It is the true depiction of our most pure and emphatic emotions, the ones that arise in our early age accompanied by the love, care and kindness of our family, early friends and school mentors.
                  The illusion and ambition that woke us up as kids was the fuel for our everyday adventures, a magic power to tirelessly discover new things, to grow along the way and devise a happy future.
                </p>
                <p className="lead justify" style={{ textAlign: 'justify' }}>
                  JOJO represents all of it, represents the illusion and happiness in us
                  and the enormous will to live life to its fullest, to discover it.
                  But, above all, JOJO has a special meaning, a special purpose that resonates
                  with each of us, as individuals and as a society:
                </p>

                <h4 className="display-6 fw-light" style={{ lineHeight: 1.5 }}>
                  JOJO represents the
                  &nbsp;<span className="gradient-text gradient-red-yellow">bravest</span>
                  &nbsp;and
                  &nbsp;<span className="gradient-text gradient-red-yellow">strongest</span>
                  &nbsp;warriors of our time.

                </h4>
                <p className="lead justify" style={{ textAlign: 'justify' }}>
                  The ones who face every day the battle against
                  cancer, child cancer, with its ups and downs, falls and rises,
                  but always with a smile on their faces, the illusion and joy in
                  their eyes for a better tomorrow and the unbeatable desire to live and enjoy life.

                </p>
                <p className="lead" style={{ textAlign: 'justify' }}>

                  JOJO is one of them, and JOJO is one of us.
                  And let me tell you something... JOJO beats cancer. <span className="gradient-text gradient-red-yellow fw-bold">#KidsBeatCancer</span>.
                </p>
              </div>
            </div>


          </div>
        </div>
        <div className="content-wrap pb-0 ">
          <div className="section text-center mb-0">
            <div className="mw-xs mx-auto">
              <h3 className="display-4 fw-bolder text-uppercase mt-3">
                We do it thanks to
                <span className="gradient-text gradient-red-yellow">&nbsp;Them</span>
              </h3>
              <p className="mt-4">
                Thank you doctors, nurses, researchers, families, intitutions, social workers... And thank you <strong>Fighters</strong>.
              </p>

              <div className="clear"></div>

              <div
                className="row justify-content-center align-items-center mt-4 col-mb-30"
              >


              </div>
            </div>
          </div>
        </div>

        <div className="clear"></div>

        <div className="container mb-5">
          <div className="row justify-content-center text-center mt-5">
            <div className="col-lg-8 mt-5">
              <div>
                <h3 className="fw-bolder display-4 mb-4">
                  The Team
                </h3>
                <p className="mb-5 text-black-50 fw-light">
                  We joined because we were all open and motivated to work on something meaningful. If you are too, contact us. Let's make good things happen!

                </p>

              </div>
            </div>
          </div>

          <div className="clear"></div>

          <div className="row justify-content-center col-mb-50 mt-3">
            <div className="col-lg-3 col-sm-6 h-translatey-4 tf-ts">
              <a href="mailto:marti@kidsbeatcancer.org">
                <div className="team-image h-invert-image">
                  <img src="images/Marti.png" alt="Portfoio Item" />
                  <div className="bg-overlay">
                    <div
                      className="bg-overlay-content align-items-start justify-content-start flex-column px-5 py-4"
                    >
                      <h3 className="mb-0 mt-1 gradient-text gradient-red-yellow">Marti</h3>
                      <h5 className="gradient-text gradient-red-yellow">Community</h5>
                    </div>

                  </div>
                </div>
              </a>
            </div>

            <div className="col-lg-3 col-sm-6 h-translatey-4 tf-ts">
              <a href="mailto:joan@kidsbeatcancer.org">

                <div className="team-image h-invert-image">
                  <img src="images/Joan R.png" alt="Portfoio Item" />
                  <div className="bg-overlay">
                    <div
                      className="bg-overlay-content align-items-start justify-content-start flex-column px-5 py-4"
                    >
                      <h3 className="mb-0 mt-1 gradient-text gradient-red-yellow">Joan R.</h3>
                      <h5 className="gradient-text gradient-red-yellow">Developer</h5>
                    </div>

                  </div>
                </div>
              </a>
            </div>

            <div className="col-lg-3 col-sm-6 h-translatey-4 tf-ts">
              <a href="mailto:art@kidsbeatcancer.org">

                <div className="team-image h-invert-image">
                  <img src="images/Joan S.png" alt="Portfoio Item" />
                  <div className="bg-overlay">
                    <div
                      className="bg-overlay-content align-items-start justify-content-start flex-column px-5 py-4"
                    >
                      <h3 className="mb-0 mt-1 gradient-text gradient-red-yellow">Joan S.</h3>
                      <h5 className="gradient-text gradient-red-yellow">Artist</h5>
                    </div>

                  </div>
                </div>
              </a>
            </div>



            <div className="col-lg-3 col-sm-6 h-translatey-4 tf-ts">
              <a href="mailto:nicolau@kidsbeatcancer.org">

                <div className="team-image h-invert-image">
                  <img src="images/Nico.png" alt="Portfoio Item" />
                  <div className="bg-overlay">
                    <div
                      className="bg-overlay-content align-items-start justify-content-start flex-column px-5 py-4"
                    >
                      <h3 className="mb-0 mt-1 gradient-text gradient-red-yellow">Nico</h3>
                      <h5 className="gradient-text gradient-red-yellow">Developer</h5>
                    </div>

                  </div>
                </div>
              </a>
            </div>


          </div>
        </div>

        <div className="clear"></div>
      </section>

      <div className="line line-sm mb-0"></div>

      {/* Footer */}
      <footer id="footer" className="border-0 " style={{ backgroundColor: '#fff' }}>

        <div className="container">
          <div className="footer-widgets-wrap  m-0 p-3">
            <div className="row justify-content-between">
              <div className="col-sm-4 center footer-logo">
                <img
                  src="images/logo.png"
                  alt="KidsBeatCancer" width="50px"
                />
              </div>
              <div className="col-sm-4 row align-items-center justify-content-center footer-copy" style={{ margin: 'auto' }}>
                <div className="col-auto text-center">

                  <span
                    className="display-9  text-dark"
                  >
                    &copy; 2021 KidsBeatCancer
                  </span>
                </div>
              </div>
              <div className="col-sm-4  row align-items-center justify-content-center footer-social" style={{ margin: 'auto' }}>
                <div className="col-auto text-center">
                  <a href="https://discord.com" target='_blank' rel="noreferrer" className="social-icon  si-small  si-discord si-dark">
                    <i className="icon-discord"></i>
                    <i className="icon-discord"></i>
                  </a>

                  <a href="https://twitter.com" target='_blank' rel="noreferrer" className="social-icon  si-small si-twitter si-dark">
                    <i className="icon-twitter"></i>
                    <i className="icon-twitter"></i>
                  </a>

                  <a href="https://github.com" target='_blank' rel="noreferrer" className="social-icon si-small  si-github si-dark">
                    <i className="icon-github"></i>
                    <i className="icon-github"></i>
                  </a>
                </div>
              </div>
              <div className="col-sm-4 row align-items-center justify-content-center footer-copy-responsive" style={{ margin: 'auto' }}>
                <div className="col-auto text-center">

                  <span
                    className="display-9  text-dark"
                  >
                    &copy; 2021 KidsBeatCancer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}

export default Purpose;
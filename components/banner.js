import React from 'react'

const Banner = () => (
  <banner id="banner">
    <div className="bannerImage">
      <br/>
      <div className="bannerStripe">
        <div className="bannerText">
          <h1>Meet DealMe</h1>
          <p>
            DealMe was founded by a group of NVD students who found pains in
            traditional promotional materials used by brick and mortar
          </p>
          <p>
            For shoppers, we provide a personalized experience
          </p>
          <p>
            For stores, an intelligent platform that shows returns on your
            marketing investment
          </p>
        </div>
      </div>
    </div>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: Arial, Molengo, "Josefin Sans", "Source Sans Pro",
            "Droid Serif";
      }
      .bannerImage {
        width: 100%;
        padding: 20vh 0px;
        background-image: url("./images/banner_busymall.png");
        background-color: lightblue;
      }
      .bannerStripe {
        width: 100%;
        margin: 0 auto;
        padding: 10px 0px;
        background: rgba(32, 32, 32, 0.5);
      }
      .bannerText {
        width: 60%;
        margin: 0 auto;
        text-align: center;
        color: #F0F0F0;
      }
      h1 {
          font-size: 5rem;
          margin-top: 20px;
          margin-bottom: 10px;
      }
      p {
        font-size: 1.2em;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </banner>
)

export default Banner

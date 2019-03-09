import React from 'react'
import Link from 'next/link'

import Banner from '../components/banner'
import Head from '../components/head'
import Nav from '../components/nav'

const Home = () => (
  <div>
    <Head title="Home" />

    <Nav />
    <Banner />

    <div id="about" className="about">
      <h1 className="title">About Us</h1>
      <p className="description">
        DealMe strives to provide value for brick and mortar stores and their
        customers.
      </p>
      <p className="description">
        For shoppers, we aim to aleviate the pain experienced when they are
        bombarded by mass marketing efforts. We understand that shoppers do, in
        fact, want to make use of promotional offers - but only if the offers
        align to their interests. At DealMe, we provide shoppers a platform to
        view the deals relevant to them and their interests.
      </p>
      <p className="description">
        For stores, we provide a platform to bring some of the benefits of
        e-commerce to brick and mortar. Our platform empowers you to create and
        distribute promotions to customers that have shown interest in your
        business. The platform also gives you concrete data on the performance
        of each and every promotion you have created through our services.
      </p>

      <div className="row">

        <div className="imgDetail">
          <img src='/images/analysis.svg' alt="Intelligent" />
          <h2>Intelligent</h2>
          <p className="description">
            Stores receive concrete data about the performance about their
            promotions
          </p>
        </div>
        <div className="imgDetail">
          <img src='/images/snowflake.svg' alt="Unique" />
          <h2>Unique</h2>
          <p className="description">
            Each shopper's experience will be unique, as the deals you see are
            tailored to your preferences
          </p>
        </div>
        <div className="imgDetail">
          <img src='/images/padlock.svg' alt="Secure" />
          <h2>Secure</h2>
          <p className="description">
            We hash your passwords, encrypt your data, and ensure all
            interactions are done over a secure network so that your data stays
            your data
          </p>
        </div>
      </div>
    </div>

    <div id="team" className="team">
      <h1 className="title">The DealMe Team</h1>
      <div className="row">
        <div className="imgDetail">
          <img src="/images/team_drulofs.gif" alt="Darren Rulofs" />
          <h2>Darren Rulofs</h2>
          <p className="description">CEO</p>
        </div>
        <div className="imgDetail">
          <img src="/images/team_lmarcil.gif" alt="Liam Marcil" />
          <h2>Liam Marcil</h2>
          <p className="description">CFO</p>
        </div>
        <div className="imgDetail">
          <img src="/images/team_chackwell.gif" alt="Catherine Hackwell" />
          <h2>Catherine Hackwell</h2>
          <p className="description">COO</p>
        </div>
      </div>
      <div className="row">
        <div className="imgDetail">
          <img src="/images/team_rliu.gif" alt="Ryan Liu" />
          <h2>Ryan Liu</h2>
          <p className="description">CTO</p>
        </div>
        <div className="imgDetail">
          <img src="/images/team_ahong.gif" alt="Alfred Hong" />
          <h2>Alfred Hong</h2>
          <p className="description">CXO</p>
        </div>
        <div className="imgDetail">
          <img src="/images/team_mstefanovic.gif" alt="Mihailo Stefanovic" />
          <h2>Mihailo Stefanovic</h2>
          <p className="description">CPO</p>
        </div>
      </div>
    </div>

    <style jsx>{`
      .imgDetail {
        padding: 10px;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
      .about {
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
      .team {
        width: 60%;
        margin: 0 auto;
        text-align: center;
      }
    `}</style>
  </div>
)

export default Home

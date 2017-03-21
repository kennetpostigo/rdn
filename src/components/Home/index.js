import React from 'react';
import { Link } from 'react-router-dom';
import Card from './../Standalone/Card.js';
import Edit from './../Standalone/Edit.js';
import Languages from './../Standalone/Languages.js';
import './styles/Home.css';

function Home(props) {
  return (
    <div className="child-container home">
      <div className="home-banner">
        <h1>Reason Developer Network</h1>
      </div>
      <div className="content-container">
        <div className="rdn-options">
          <Languages />
          <Edit match={props.match} />
        </div>
        <div className="header">
          <h2>Documentation</h2>
          <Link to="/resources/documentation/native"><p>view all</p></Link>
        </div>
        <div className="section">
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
        </div>

        <div className="header">
          <h2>Guides</h2>
          <Link to="/resources/guides/native"><p>view all</p></Link>
        </div>
        <div className="section">
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
        </div>
        <div className="header">
          <h2>Talks & Slides</h2>
          <Link to="/resources/talksAndSlides/native"><p>view all</p></Link>
        </div>
        <div className="section">
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
          <Card title="Test" link="/reader">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

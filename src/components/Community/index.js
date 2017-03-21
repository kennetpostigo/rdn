import React from 'react';
import Edit from './../Standalone/Edit.js';
import Languages from './../Standalone/Languages.js';
import Markdown from './../Standalone/Markdown.js';
import md from './Community.md';
import './styles/Community.css';

function Community(props) {
  return (
    <div className="child-container">
      <div className="community-banner">
        <h1>Community</h1>
      </div>
      <div className="content-container">
        <div className="rdn-options">
          <Languages />
          <Edit />
        </div>
        <Markdown md={md} />
      </div>
    </div>
  );
}

export default Community;

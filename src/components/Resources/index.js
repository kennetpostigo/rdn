import React, { Component } from 'react';
import Edit from './../Standalone/Edit.js';
import Languages from './../Standalone/Languages.js';
import Dropdown from './Dropdown.js';
import Selection from './Selection.js';
import Listing from './Listing.js';
import mdpath from './../../markdown.js';
import './styles/Resources.css';

function Resources({ match }) {
  return (
    <div className="child-container">
      <div className="resources-banner">
        <Dropdown match={match} />
      </div>
      <div className="content-container">
        <div className="rdn-options">
          <Languages />
          <Edit match={match} />
        </div>
      </div>
      <Selection match={match} />
      <div className="content-container">
        <Listing
          category={match.params.category}
          technology={match.params.technology}
          listing={Object.keys(
            mdpath[match.params.category][match.params.technology]
          ).map(item => item)}
        />
      </div>
    </div>
  );
}

export default Resources;

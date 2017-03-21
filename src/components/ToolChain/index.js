import React from 'react';
import Markdown from './../Standalone/Markdown.js';
import Edit from './../Standalone/Edit.js';
import Languages from './../Standalone/Languages.js';
import Tooling from './Tooling.md';
import './styles/Toolchain.css';

function ToolChain(props) {
  return (
    <div className="child-container toolchain">
      <div className="tooling-banner">
        <h1>Tooling</h1>
      </div>
      <div className="markdown-container">
        <div className="rdn-options">
          <Languages />
          <Edit match={props.match} />
        </div>
        <Markdown md={Tooling} />
      </div>
    </div>
  );
}

export default ToolChain;

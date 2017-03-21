import React from 'react';
import {
  Navbar,
  Navbrand,
  NavItemsLeft,
  NavItemsRight,
  NavItemsCenter,
  NavDrawer
} from 'rad-navbar';
import { Link } from 'react-router-dom';
import './styles/ReaderMenu.css';
import asyncMarkdown from './../Standalone/AsyncMarkdown.js';
import Edit from './../Standalone/Edit.js';
import Languages from './../Standalone/Languages.js';

function ReaderMenu({category, technology, name, section, title, rr}) {
  const Markdown = asyncMarkdown(() => 
    import(`./../../../${category}/${technology}/${name}/tableOfContents.md`)
    .then(module => module, err => console.log(err))
  );

  return (
    <Navbar
      className="reader-menu"
      breakPoint={0}
      height={50}
      menu="independant"
      position="bottom"
    >
      <NavDrawer menuPosition="left" position="bottom">
        <div className="reader-toc">
          <Markdown />
        </div>
      </NavDrawer>
      <NavItemsLeft>
        <p className="reader-section">{section}</p>
      </NavItemsLeft>
      <NavItemsCenter>
        <p className="reader-title">{title}</p>
      </NavItemsCenter>
      <NavItemsRight>
        <Languages />
        <Edit match={rr} />
      </NavItemsRight>
    </Navbar>
  );
}

export default ReaderMenu;

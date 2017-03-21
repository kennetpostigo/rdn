import React from 'react';
import asyncMarkdown from './../Standalone/AsyncMarkdown.js';
import ReaderMenu from './ReaderMenu.js';
import './styles/Reader.css';

function Reader(props) {
  if (!props.match.params.section) {
    var Markdown = asyncMarkdown(() => 
      import(`./../../../${props.match.params.category}/${props.match.params.technology}/${props.match.params.name}/${props.match.params.content}.md`)
      .then(module => module, err => console.log(err))
    );
  } else {
    var Markdown = asyncMarkdown(() => 
      import(`./../../../${props.match.params.category}/${props.match.params.technology}/${props.match.params.name}/${props.match.params.section}/${props.match.params.content}.md`)
      .then(module => module, err => console.log(err))
    );
  }
  return (
    <div className="child-container reader">
      <div className="markdown-container">
        <Markdown />
      </div>
      <ReaderMenu
        title={props.match.params.name
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, s => s.toUpperCase())}
        section={props.match.params.content
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, s => s.toUpperCase())}
        category={props.match.params.category}
        technology={props.match.params.technology}
        name={props.match.params.name}
        rr={props.match}
        content={props.match.params.content}
      />
    </div>
  );
}

export default Reader;

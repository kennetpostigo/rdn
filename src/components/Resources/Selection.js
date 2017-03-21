import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Selection.css';

function Selection({ match }) {
  var technology = ['native', 'server', 'web', 'crossPlatform', 'tooling'];
  return (
    <div className="selection">
      {technology.map((value, index) => {
        if (match.params.technology === value) {
          return (
            <Link
              to={
                `/resources/${match.params.category}/${match.params.technology}`
              }
              className="normalize-link active"
              key={index}
            >
              <p>
                {value
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, s => s.toUpperCase())}
              </p>
            </Link>
          );
        }
        return (
          <Link
            to={`/resources/${match.params.category}/${value}`}
            className="normalize-link inactive"
            key={index}
          >
            <p>
              {value
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, s => s.toUpperCase())}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default Selection;

import React from 'react';
import Card from './../Standalone/Card.js';
import asyncMarkdown from './../Standalone/AsyncMarkdown';
import './styles/Listing.css';

function Listing({ category, technology, listing }) {
  const test = (category, technology, key) => {
    var Markdown = asyncMarkdown(() => 
      import(`./../../../${category}/${technology}/${key}/meta.md`)
      .then(module => module, err => console.log(err))
    );
    return <Markdown />
  };
  
  return (
    <div className="listing">
      {listing.map((key, i) => (
        <Card
          key={i}
          title={key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
            return str.toUpperCase();
          })}
          link={`/reader/${category}/${technology}/${key}/introduction`}
        >
          {test(category, technology, key)}
        </Card>
      ))}
    </div>
  );
}

export default Listing;

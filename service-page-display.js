var React = require('react');

const SearchResult = function(props) {
  const service = props.service;
   return React.createElement('div', { className: 'result-container', id: service.title},
    React.createElement('div', { className: 'result-picture-container' },
        React.createElement('img', { className: 'result-picture', src: service.photo })
    ),
    React.createElement('div', { className: 'result-title' }, service.title),
    React.createElement('div', { className: 'result-author' }, service.author_role+": "+service.author),
    React.createElement('div', { className: 'button-container' },
        React.createElement('a', { className: 'button', href: "/apply-for-service?service=" + service.title}, 'Click for more info')
    )
  );
};


const SearchResults = function(props) {
  const results = props.results;
  return React.createElement(
    "div",
    { className: "results" },
    results.map(function(service) {
      return React.createElement(SearchResult, {
        service: service,
        key: service.title,
      });
    })
  );
};

module.exports = SearchResults;

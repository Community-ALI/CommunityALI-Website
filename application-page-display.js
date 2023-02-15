var React = require('react');

const SearchResult = function(props) {
  const service = props.service;
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("h1", { className: "result-title" }, service.name),
    React.createElement("h5", { className: "result-author" }, service.w_number),
    React.createElement("p", { className: "result-time" }, service.email),
    React.createElement("p", { className: "result-time" }, service.service)
  );
};

const SearchResults = function(props) {
  const results = props.results;
  return React.createElement(
    "div",
    { className: "search-results" },
    React.createElement("h3", null, "add ?keyword=___ in order to search"),
    results.map(function(service) {
      return React.createElement(SearchResult, {
        service: service,
        key: service.title,
      });
    })
  );
};

module.exports = SearchResults;
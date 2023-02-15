var React = require('react');

const SearchResult = function(props) {
  const service = props.service;
  return React.createElement(
    "div",
    { className: "result-container" },
    React.createElement("h1", { className: "result-title" }, service.title),
    React.createElement("h5", { className: "result-author" }, service.author),
    React.createElement("p", { className: "result-time" }, service.startTime),
    React.createElement("p", { className: "result-date" }, service.date),
    React.createElement("p", { className: "result-description" }, service.description),
    React.createElement("a", { className: "result-link", href: "/apply-for-service.html?service=" + service.title}, "Apply")
  );
};

const SearchResults = function(props) {
  const results = props.results;
  return React.createElement(
    "div",
    { className: "search-results" },
    results.map(function(service) {
      return React.createElement(SearchResult, {
        service: service,
        key: service.title,
      });
    })
  );
};

module.exports = SearchResults;

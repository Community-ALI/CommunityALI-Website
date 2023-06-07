// database
const models = require("../connect-to-database");
const Services = models.Services;

function search(keyword,attribute,dbServices,filteredData) {
  // list of matches
 for (service of dbServices){
      //find out if text is in the given attribute
      text = service[attribute].toLowerCase();
      if (text.includes(keyword.toLowerCase())){
          // don't create miltiple copies of the same result if the keyword appears twice
          if (filteredData.includes(service)){

          }
          else{
            filteredData.push(service)
          }
          
      }
  }
 return filteredData; 
}


// get all services from database
const get_services = async function (keywords, fields) {
  try {
    filteredData = [];
    foundServices = await Services.find().select(fields).exec();
    
    filterAttribute = 'title';
    if (keywords != undefined){
        keywords = keywords.trim();
        var subStrings = keywords.split(" "); 
        for (subString of subStrings){
          filteredData = search(subString, filterAttribute, foundServices, filteredData);
        }
      } else {
        // if no query has been made, return all services
        filteredData = foundServices;
      }
    return filteredData;

  } catch (error) {
    console.log(error);
    return { success: false, error: 'internal database error' };
  }
}




// export to app.js 
module.exports = get_services;
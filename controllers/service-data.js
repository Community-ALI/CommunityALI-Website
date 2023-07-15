// database
const models = require("../connect-to-database");
const Services = models.Services;

function search(keyword, attribute, dbServices, filteredData) {
  // list of matches
  for (service of dbServices) {
    //find out if text is in the given attribute
    text = service[attribute].toLowerCase();
    if (text.includes(keyword.toLowerCase())) {
      // don't create miltiple copies of the same result if the keyword appears twice
      if (filteredData.includes(service)) {

      }
      else {
        filteredData.push(service)
      }
    }
  }
  return filteredData;
}

const find_filter_service = async function (sortingType, serviceType, fields, categories) {
  try {
    serviceTypes = serviceType.split(',');
    console.log(`filterType: ${serviceTypes}, sortingType: ${sortingType}`);
    var sort;
    switch (sortingType) {
      case 'reverse_alphabetical':
        sort = -1;
        break;
      default:
        sort = 1;
    }
    if (serviceTypes.includes('all') & categories.includes('all')) {
      services = await Services.find()
        .select(fields)
        .sort({ title: sort })
        .exec();
    } else if (serviceTypes.includes('all')) {
      services = await Services.find({
        categories: { $in: categories }
      })
        .select(fields)
        .sort({ title: sort })
        .exec();
    } else if (categories.includes('all')) {
      services = await Services.find({
        serviceType: { $in: serviceTypes }
      })
        .select(fields)
        .sort({ title: sort })
        .exec();
    } else {
      services = await Services.find({
        serviceType: { $in: serviceTypes },
        categories: { $in: categories }
      })
        .select(fields)
        .sort({ title: sort })
        .exec();
    }
    return services;
  } catch (err) {
    console.log(err);
    return { success: false, error: 'internal database error' };
  }
}

// get all services from database
const get_services = async function (keywords, fields, sortingType, serviceType, categories) {
  try {
    filteredData = [];
    foundServices = find_filter_service(sortingType, serviceType, fields, categories);

    filterAttribute = 'title';
    if (keywords != undefined) {
      keywords = keywords.trim();
      var subStrings = keywords.split(" ");
      for (subString of subStrings) {
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
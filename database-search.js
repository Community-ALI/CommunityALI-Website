
function filterData(user_input,foundServices){
    if (user_input) {
    }
    else{
        user_input = '';
    }
    json_data = foundServices; // require('./services.json'); // TODO get actual database data

    list = search(user_input,"title", [] , json_data)
    list = search(user_input,"author", list, json_data)
    list = search(user_input,"description", list, json_data)
    // TODO filter list
    // list = Filter(list)
    return (list)
};



function search(keyword,attribute,list,json_data) {
     // list of matches
    for (service of json_data){
        //find out if text is in the given attribute
        // console.log(String(service[attribute])); // successfully outputs the string "hello world"

        // console.log(keyword);
        text = (service[attribute]).toLowerCase(); // line 22, this is the error
        
        if (text.includes(keyword.toLowerCase())){
            // don't create miltiple copies of the same result if the keyword appears twice
            if (list.includes(service)){

            }
            else{ // if this is the first time we have seen this service
                list.push(service) // add the service to the list
            }
            
        }
    }
    return list; 
  }


  function Filter(list){
    
    // add filters to a list
    filters = []
    newList = []
    for (service of list){ // for every service
        schools = service.schools
        matches = 0 
        neededMatches = filters.length
        for (filter of filters){ // only adds the service if it has every school required by the filter
            for (school of schools){
                if (school == filter){
                    matches+=1 // this school has a match
                }
            }
        }
        if (matches >= neededMatches){ // if every filter had a match
            newList.push(service) // add this service to the list
        }
        
    }

    return newList

}
module.exports.filterData = filterData;
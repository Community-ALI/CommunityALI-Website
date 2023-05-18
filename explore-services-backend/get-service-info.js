const models = require("../connect-to-database");
const Services = models.Services;


const get_service_info = function(req,res){
  try{
    var selected_service = req.query.service;
    // get database data
    Services.find(function(err, foundServices){
      if(!err){
        // find this exact service
        var selected_service_json = 'ERROR: no service found'
        for (service of foundServices){
          if (service.title == selected_service) {
            selected_service_json = service;
          }
        }
        if (selected_service_json == 'ERROR: no service found'){
          console.error(selected_service_json);
          res.send(selected_service_json);
          return 
        }
        // send the service to the client
        console.log('sending data');
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        res.json(selected_service_json);
          
        };
    });
    }
    catch{
      res.error('page not found');
    }
}
module.exports = get_service_info;

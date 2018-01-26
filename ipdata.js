const request = require('request');

var ipData = (address, callback) =>{
  var encodedAddress = encodeURIComponent(address);
  console.log("Called me "+address);
  request( {
    url: `http://ip-api.com/json/${address}`,
    json: true
  }, (error, response, body) => {
      if(error){
        callback("Unable to connect to the google servers");
      }else if (body.status === 'fail'){
        callback("Unable to find that address data");
      }else if(body.status === 'success'){
        callback(undefined,{
          as: body.as,
          city: body.city
        });
      }
  });

}
module.exports = {
  ipData
};

const fetch = require('node-fetch');
const express = require("express");
const router = express.Router();

function MergeAgent(){
  let self = this;
  self.delayDays = 15;
  self.dateLimit = new Date();
  self.init = () => {
      self.dateLimit.setDate(self.dateLimit.getDate() - self.delayDays);
  };
  self.lstServers = [
    {
      name: 'left',
      url: 'https://left-finyzlkrza-uc.a.run.app/graphql',
      query: 'query {leftmovesdate(date:"' + self.dateLimit.toString() + '") {_id move created}}',
      result: 'leftmovesdate',
      lastResponse: new Date(),
      bussy: false
    },
    {
      name: 'right',
      url: 'https://right-finyzlkrza-uc.a.run.app/graphql',
      query: 'query {rigthmovesdate(date:"' + self.dateLimit.toString() + '") {_id move created}}',
      result: 'rigthmovesdate',
      lastResponse: new Date(),
      bussy: false
    },
    {
      name: 'front',
      url: 'https://front-finyzlkrza-uc.a.run.app/graphql',
      query: 'query {frontmovesdate(date:"' + self.dateLimit.toString() + '") {_id move created}}',
      result: 'frontmovesdate',
      lastResponse: new Date(),
      bussy: false
    },
    {
      name: 'back',
      url: 'https://back-finyzlkrza-uc.a.run.app/graphql',
      query: 'query {backmovesdate(date:"' + self.dateLimit.toString() + '") {_id move created}}',
      result: 'backmovesdate',
      lastResponse: new Date(),
      bussy: false
    }
  ];
  self.resultData = new Array();
  self.mergeMicroServices = () => {
    self.lstServers.map((srv) => {
      if (srv.bussy == false){
        self.getData(srv);
      }
      else {
        console.log('Reject call ' + srv.url + ' is bussy ' + srv.bussy);
      }
    });
  };
  self.filterItems = (dateLimit, jsonObject) => {
    var filterResponse = new Array();
    if (typeof(jsonObject) != "undefined" ){
          for(var i in jsonObject){
            let move = jsonObject[i];
            var aDate = new Date(move.created);
            if (aDate != dateLimit){
              filterResponse.push(move);
            }
          }
      }
      return filterResponse;
  };
  self.getData = async (server) => {
    server.bussy = true;
    let endPoint = server.url;
    let query = server.query;
    fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(resp => {
      return resp.json();
    }).then(data => {
       console.log("Success Called " + endPoint);
        server.bussy = false;
        server.lastResponse = new Date();
       let respData = data.data[server.result];
       let filteredItems = self.filterItems(self.dateLimit, respData);
       if (typeof(filteredItems) != "undefined"){
         self.resultData = self.resultData.filter((item) => {return item.server != server.name;});
         filteredItems.map((data) => {
           data.server = server.name;
           if (data.created && typeof(data.created) === 'string' && !isNaN(data.created) && Number(data.created) > 0){
             data.created = new Date(Number(data.created));
           }
           self.resultData.push(data);
         });
         self.resultData.sort(function(a, b){
           return new Date(b.created) - new Date(a.created);
         });
       }
       return true;
     }).catch(error => {
       console.log(error);
       server.bussy = false;
       return false;
     });
  };
}

const model = new MergeAgent();
model.init();
model.mergeMicroServices();

router.get('/', async (req, res) => {
  model.mergeMicroServices();
  let result = model.resultData;
  result.sort(function(a, b){
    return new Date(b.created) - new Date(a.created);
  });
  res.json(result);
});

module.exports = router;

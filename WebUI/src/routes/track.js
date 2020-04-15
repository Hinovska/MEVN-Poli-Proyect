const express = require("express");
const router = express.Router();

const {backwardmoves} = require("../../data/backward.json");
const {frontmoves} = require("../../data/front.json");
const {leftmoves} = require("../../data/left.json");
const {rigthmoves} = require("../../data/right.json");
const move = require("../models/move");

router.get('/', async (req, res) => {
  const delayDays = 15;
  let dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - delayDays);
  let result = new Array();
  let backwardItems = await filterItems(dateLimit, backwardmoves)
  if (typeof(backwardItems) != "undefined"){
        backwardItems.map((data) => {
          data.created = new Date(data.created);
          result.push(data);
        });
  }
  let frontItems = await filterItems(dateLimit, frontmoves)
  if (typeof(frontItems) != "undefined"){
        frontItems.map((data) => {
          data.created = new Date(data.created);
          result.push(data);
        });
  }
  let leftItems = await filterItems(dateLimit, leftmoves)
  if (typeof(leftItems) != "undefined"){
        leftItems.map((data) => {
          data.created = new Date(data.created);
          result.push(data);
        });
  }
  let rigthItems = await filterItems(dateLimit, rigthmoves)
  if (typeof(rigthItems) != "undefined"){
        rigthItems.map((data) => {
          data.created = new Date(data.created);
          result.push(data);
        });
  }
  //console.log(backwardmoves);
  //console.log(result);
  result.sort(function(a, b){
    return new Date(b.created) - new Date(a.created);
  });
  res.json(result);
});

const filterItems = (dateLimit, jsonObject) => {
  if (typeof(jsonObject) != "undefined" ){
        return jsonObject.filter((move) => {
        aDate = new Date(move.created);
        return aDate >= dateLimit;
      });
    }
};

module.exports = router;

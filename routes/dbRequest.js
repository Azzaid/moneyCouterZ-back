/**
 * Created by p.zamulko on 05.05.2018.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var songModel = require('../models/song');

router.get('/', function(req, res){
  songModel.find((error, songsList)=>{
    res.json(songsList);
  });});

router.get('/:artist/:song/:genre/:year', function(req, res){
  let artistSearchRegex=new RegExp((req.params.artist==='_')?'.*':req.params.artist+'.*');
  let songSearchRegex=new RegExp((req.params.song==='_')?'.*':req.params.song+'.*');
  let genreSearchRegex=new RegExp((req.params.genre==='_')?'.*':req.params.genre+'.*');
  let yearSearchRegex=new RegExp((req.params.year==='_')?'.*':req.params.year+'.*');
  songModel.find({artist:{$regex: artistSearchRegex, $options: 'i'}, song:{$regex: songSearchRegex, $options: 'i'}, genre:{$regex: genreSearchRegex, $options: 'i'}, year:{$regex: yearSearchRegex, $options: 'i'}},(error, songsList)=>{
    console.log('got some', songsList);
    res.json(songsList);
  });});
  

module.exports = router;

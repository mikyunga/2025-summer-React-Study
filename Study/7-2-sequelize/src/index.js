// const express = require('express');
// console.log(express);
import 'dotenv/config';
import app from './app';
import initDB from './initDB';

app.set('PORT', process.env.PORT);

app.listen(app.get('PORT'), () => {
  console.log(`server listening on ${app.get('PORT')}`);
  initDB();
});

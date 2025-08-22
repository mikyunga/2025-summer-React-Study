// const express = require('express');
// console.log(express);
import 'dotenv/config';
import app from './app';

app.set('PORT', process.env.PORT);

app.listen(app.get('PORT'), () => {
  console.log(`server listening on ${app.get('PORT')}`);
  console.log(process.env.SECRET_KEY);
  console.log(app.get('PORT'));
});

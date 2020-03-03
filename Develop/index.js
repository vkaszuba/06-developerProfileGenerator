const inquirer = require('inquirer');
// const fs = require('fs');
const axios = require('axios');
const html = require('./generateHTML');
const pdf = require('html-pdf');
var options = { format: 'Letter' }

console.log(html.generateHTML);
const questions = [
  {
    name: "userName",
    type: 'input',
    message: "What is your GitHub"
  },
  {
    name: "color",
    type: "list",
    choices: [
      "red", "blue", "green", "pink"
    ],
    message: "Favorite color?"
  }
];

function writeToFile(fileName, data) {
  pdf.create(data, options).toFile(fileName, (err, res) => {
    if (err) {return err}
    console.log(res);
  })
};

function init() {
  inquirer.prompt(questions)
  .then(function (ans) {
    axios.get(`https://api.github.com/users/${ans.userName}`)
      .then(res => {
        res.data.color = ans.color;
        writeToFile(`${res.data.name}_GitProfile.pdf`, html.generateHTML(res.data));
      });
  });
};

init();
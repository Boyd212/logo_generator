const inquirer = require("inquirer");
const fs = require("fs");
const { Square, Triangle, Circle } = require("./assets/shape");
function writeToFile(fileName, answers) {
  let svgString = "";
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
  svgString += "<g>";
  svgString += `${answers.shape}`;

  let shapeChoice;
  if (answers.shape === "Square") {
    shapeChoice = new Square();
    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
  } else if
  (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
  } else {
    shapeChoice = new Circle();
    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  svgString += "</g>";
  svgString += "</svg>";

  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "What text would you like?...Enter three characters",
        name: "text",
      },
      {
        type: "input",
        message:
          "Choose text color",
        name: "textColor",
      },
      {
        type: "list",
        message: "What shape would you like?",
        choices: [ "Square","Triangle", "Circle" ],
        name: "shape",
      },
      {
        type: "input",
        message:
          "Choose a color for the shape.",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
      if (answers.text.length > 3) {
        console.log("Must enter a 3 characters");
        promptUser();
      } else {
        writeToFile("logo.svg", answers);
      }
    });
}
promptUser();
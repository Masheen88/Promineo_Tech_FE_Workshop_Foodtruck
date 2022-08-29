//* Dark/Light Mode - Begin
//toggle dark mode with button id "toggleDarkMode"
giveMeDarkMode();
function giveMeDarkMode() {
  console.log("Dark Mode Go!");
  let toggleDarkMode = document.getElementById("toggleDarkMode");

  //enables dark mode by default.
  let bodyDefault = document.getElementsByTagName("body")[0]; //gets the body tag
  let darkModeButtonDefault = document.getElementById("toggleDarkMode");
  bodyDefault.classList.add("dark"); //adds the class "dark" to the body tag
  //if dark mode add class moon to body
  if (bodyDefault.classList.contains("dark")) {
    bodyDefault.classList.add("moon");
    darkModeButtonDefault.classList.add("dark");
  }

  //toggle dark mode with button id "toggleDarkMode"
  toggleDarkMode.addEventListener("click", function () {
    let pageBody = document.getElementsByTagName("body")[0]; //gets the body element
    let darkModeButton = document.getElementById("toggleDarkMode");
    // console.log(darkModeButton);

    // toggle multipe classes on body
    let toggleMultipleClasses = function (element, button) {
      // if body is dark, remove dark and moon classes and add light and sun classes
      if (pageBody.classList.contains("dark")) {
        pageBody.classList.remove("dark");
        pageBody.classList.remove("moon");
        button.classList.remove("dark");

        pageBody.classList.add("light");
        pageBody.classList.add("sun");
        button.classList.add("light");
      }
      // if pageBody is light, remove light and sun classes and add dark and moon classes
      else if (pageBody.classList.contains("light")) {
        pageBody.classList.remove("light");
        pageBody.classList.remove("sun");
        button.classList.remove("light");

        pageBody.classList.add("dark");
        pageBody.classList.add("moon");
        button.classList.add("dark");
      }
    };
    toggleMultipleClasses(pageBody, darkModeButton);
  });
}
//* Dark/Light Mode - End

// Rest of Code Goes below here -------------------------------------------------

//TODO: Animate image to move from the left to right of the screen

let foodTruckContainer1 = document.getElementById("foodTruckContainer-1");
moveTruck();
function moveTruck() {
  console.log("truck is 1 is moving");
  $("#foodTruckContainer-1").animate(
    {
      left: "+=2500", //moves truck from left to right
    },
    16000, //animation speed
    function () {
      // Animation complete.
      resetTruck();
    }
  );
}

// reset truck to off screen to the left and move it to the right
function resetTruck() {
  console.log("truck is 1 is resetting");
  $("#foodTruckContainer-1").animate(
    {
      left: "-=3500", //moves truck from right to left
    },
    0, //animation speed
    function () {
      // Animation complete.
      //when truck is reset, move it to the right
      moveTruck();
    }
  );
}

//TODO: Need function to build recipe using ingredients and add it to a list (API)

//TODO: Allow user to select from list of recipes and order them

//TODO: If recipe is out of stock, prevent selection and alert user

//TODO: Allow user to create their own food truck instance and add it a list (API)
//*Can have 3 receipes for each food truck

//TODO: Display instances of each food truck on the page randomly

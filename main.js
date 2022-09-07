//* Dark/Light Mode - Begin
//toggle dark mode with button id "toggleDarkMode"

function giveMeDarkMode(i) {
  console.log("Dark Mode Go!");
  let toggleDarkMode = document.getElementById("toggleDarkMode");

  //enables dark mode by default.
  let bodyDefault = document.getElementsByTagName("body")[0]; //gets the body tag
  let darkModeButtonDefault = document.getElementById("toggleDarkMode"); //gets the toggleDarkMode button
  bodyDefault.classList.add("dark"); //adds the class "dark" to the body tag

  let trucklightDefault = document.getElementById(`foodtruckHeadlight-${i}`); //gets the truck light
  let trucklightOffDefault = document.getElementById(
    `foodtruckHeadlightOff-${i}` //gets the truck light off
  );

  //hide foodTruckCoin
  let foodTruckCoinDefault = document.getElementById(`foodTruckCoin-${i}`); //gets the foodTruckCoin
  foodTruckCoinDefault.style.display = "none"; //hides the foodTruckCoin
  let truckRoadImage = document.getElementById("truckRoadImage"); //gets the truckRoadImage
  //darken truckRoadImage
  truckRoadImage.style.filter = "brightness(0.2)"; //darkens the truckRoadImage

  //if dark mode add class moon to body
  if (bodyDefault.classList.contains("dark")) {
    bodyDefault.classList.add("moon");
    darkModeButtonDefault.classList.add("dark");
  }

  //toggle dark mode with button id "toggleDarkMode"
  toggleDarkMode.addEventListener("click", function () {
    let pageBody = document.getElementsByTagName("body")[0]; //gets the body element

    // toggle multiple classes on body
    let toggleMultipleClasses = function (button) {
      let navbar = document.getElementById("navbar");

      // if body is dark, remove dark and moon classes and add light and sun classes
      if (pageBody.classList.contains("dark")) {
        navbar.classList.remove("bg-black");
        navbar.classList.remove("bg-dark");
        navbar.classList.remove("navbar-dark");

        navbar.classList.add("bg-light");
        navbar.classList.add("navbar-light");

        pageBody.classList.remove("dark");
        pageBody.classList.remove("moon");

        pageBody.classList.add("light");
        pageBody.classList.add("sun");

        button.classList.remove("dark");
        button.classList.add("light");

        //set navbar to bg-light

        trucklightDefault.classList.remove("lightOn");
        trucklightOffDefault.classList.remove("lightOff");

        trucklightDefault.classList.add("lightOff");
        trucklightOffDefault.classList.add("lightOn");
        //bright truckRoadImage
        truckRoadImage.style.filter = "brightness(1)";
      }
      // if pageBody is light, remove light and sun classes and add dark and moon classes
      else if (pageBody.classList.contains("light")) {
        navbar.classList.remove("bg-light");
        navbar.classList.remove("navbar-light");

        navbar.classList.add("bg-black");
        navbar.classList.add("navbar-dark");

        pageBody.classList.remove("light");
        pageBody.classList.remove("sun");

        pageBody.classList.add("dark");
        pageBody.classList.add("moon");

        button.classList.remove("light");
        button.classList.add("dark");

        trucklightDefault.classList.remove("lightOff");
        trucklightOffDefault.classList.remove("lightOn");

        trucklightDefault.classList.add("lightOn");
        trucklightOffDefault.classList.add("lightOff");
        //darken truckRoadImage
        truckRoadImage.style.filter = "brightness(0.2)";
      }
    };
    toggleMultipleClasses(pageBody);
  });
}
//* Dark/Light Mode - End

//! Rest of Code Goes below here -------------------------------------------------

//TODO: Pull in API data for food truck instances
const foodTruckData = "http://localhost:3000/foodtrucks"; //food truck data from API
let allFoodTrucksData = []; //array to hold all food truck data

//wait for ajax to return data before moving to next function
let getFoodDataFromAPI = $.getJSON(foodTruckData, function (data) {
  allFoodTrucksData = data;
  // console.log(allFoodTrucksData);
});

/*
GET data request is wrapped in a promise so that it will 
wait for the data to return before moving to the next function
*/
getFoodDataFromAPI.then(function () {
  if (allFoodTrucksData.length === 0) {
    console.log("test");
    setTimeout(getFoodDataFromAPI, 1000);
    //wait for
  } else {
    //for loop to create food truck instances
    for (let i = 0; i < allFoodTrucksData.length; i++) {
      console.log(
        "loop iteration:",
        i,
        `allFoodTrucksData:`,
        allFoodTrucksData[i]
      );
      //append food truck instances to the foodTruckContainer
      $("#truckRoad").append(
        String.raw`
         <div class="foodTruckContainer" id="foodTruckContainer-${i}">
        <div id="foodtruck-${i}">
        <img
        class="foodTruckImage"
        src="${allFoodTrucksData[i].foodTruckTypeImage}"
        alt="Snow"
        style="width: 25%"
      />
      <div class="bottom-left">Bottom Left</div>
      <div class="top-left">Top Left</div>
      <div class="top-right">Top Right</div>
      <div class="bottom-right">Bottom Right</div>
      <div class="centered">${allFoodTrucksData[i].name}</div>
      <img
        id="foodTruckCoin-${i}"
        src="./images/coinnobg.gif"
        style="width: 10%; top: 35px; left: 125px"
      />
      <img
        id="foodtruckHeadlight-${i}"
        src="./images/foodtruck-headlights.png"
        style="width: 25%"
        class="lightOn"
      />
      <img
        id="foodtruckHeadlightOff-${i}"
        src="./images/foodtruck-headlightsOFF.png"
        style="width: 25%; pointer-events: none"
        class="lightOff"
      />
    </div>
        </div>
        </div>
        `
      );
      startFoodTruck(i);
      giveMeDarkMode(i);
    }

    console.log("after for loop");

    //TODO: Animate image to move from the left to right of the screen

    let foodTruckContainer = document.getElementById("foodTruckContainer-1");

    //start food truck offscreen to the left
    function startFoodTruck(startEngine) {
      // on click display foodTruckCoin and move up and down
      $(`#foodTruckContainer-${startEngine}`).click(function () {
        console.log("truck is 1 is clicked");
        $("#foodTruckCoin").show();
        //play sound
        let audio = new Audio("./assets/coinsound.wav");
        audio.play();
        $("#foodTruckCoin").animate(
          {
            //move the coin up and then back down
            top: "-=50",
          },
          1000, //animation speed
          function () {
            // Animation complete.
            $("#foodTruckCoin").hide();
            $("#foodTruckCoin").css("top", "35px");
          }
        );
      });

      $(`#foodTruckContainer-${startEngine}`).css("left", "-1000px");
      moveTruck(startEngine);
    }

    function moveTruck(truckId) {
      console.log("truck is 1 is moving");

      $(`#foodTruckContainer-${truckId}`).animate(
        {
          left: "+=3000", //moves truck from left to right
          bounce: 1000,
        },
        randomizeSpeed(), //animation speed
        function () {
          // Animation complete.

          resetTruck(truckId);
        }
      );
    }

    // reset truck to off screen to the left and move it to the right
    function resetTruck(truckId) {
      console.log(`truck #${truckId} is resetting`);
      $(`#foodTruckContainer-${truckId}`).animate(
        {
          left: "-=3000", //moves truck from right to left (resets it to offscreen)
        },
        0, //animation speed
        function () {
          // Animation complete.
          //when truck is reset, move it to the right
          moveTruck(truckId);
        }
      );
    }

    //randomizeS the speed of the truck
    function randomizeSpeed() {
      let randomNumber = Math.floor(Math.random() * 1000) + 1;
      //2% chance to deliver food SUPER FAST!
      if (randomNumber <= 2) {
        return Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
      } else {
        // return a random number between 15 and 30 seconds
        return Math.floor(Math.random() * (3000 - 1500 + 1)) + 15000;
      }
    }

    //TODO: Need function to build recipe using ingredients and add it to a list (API)

    //TODO: Allow user to select from list of recipes and order them

    //TODO: If recipe is out of stock, prevent selection and alert user

    //TODO: Allow user to create their own food truck instance and add it a list (API)
    //*Can have 3 recipes for each food truck

    //TODO: Display instances of each food truck on the page randomly
  }
});

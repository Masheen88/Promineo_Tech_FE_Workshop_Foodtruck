let getOnTheHighway = document.getElementById("getOnTheHighway");
let runGameSwitch = false;

// do not execute the rest of the code until the popup is closed
function popup() {
  console.log("popup is open");
  let popup = document.getElementById("popup");
  popup.addEventListener("click", function () {
    //if getOnTheHighway is clicked set runGameSwitch to true
    if (event.target.id == "getOnTheHighway") {
      runGameSwitch = true;
      console.log("runGameSwitch is true");
    }
    // remove div with id popup
    // fade the popup slowly
    $("#popup").fadeOut(3000, function () {
      $(this).remove();
    });
    if (runGameSwitch == true) {
      // run game
      let newFoodApp = new FoodTruckApp();
      newFoodApp.runApp();
    }
  });
}
popup();

class FoodTruckApp {
  runApp() {
    let bodyDefault = document.getElementsByTagName("body")[0]; //gets the body tag

    //Some cool music
    let toggleMusic = document.getElementById("toggleMusic");
    //music by: https://www.youtube.com/watch?v=H9J61Cr2VPI
    let bgMusic = document.getElementById("bgMusic");

    //music by: Matthew Cox
    let bgMusicDark = document.getElementById("bgMusicDark");
    bgMusicDark.volume = 0.1;
    bgMusicDark.play();
    //pause music
    toggleMusic.addEventListener("click", function () {
      if (bgMusicDark.paused) {
        bgMusicDark.pause();
      } else {
        bgMusicDark.pause();
      }
    });

    //* Dark/Light Mode - Begin
    const html = String.raw;
    //toggle dark mode with button id "toggleDarkMode"

    function giveMeDarkMode() {
      // console.log("Dark Mode Go!");

      //enables dark mode by default.
      let toggleDarkMode = document.getElementById("toggleDarkMode");
      let darkModeButtonDefault = document.getElementById("toggleDarkMode"); //gets the toggleDarkMode button
      bodyDefault.classList.add("dark"); //adds the class "dark" to the body tag

      let foodTruckLightOnDefaultClass = document.querySelectorAll(
        `.foodTruckHeadlightOn`
      ); //gets the truck light
      let foodTruckLightOffDefaultClass = document.querySelectorAll(
        `.foodTruckHeadlightOff`
      ); //gets the truck light off
      // console.log("light off length:", foodTruckLightOffDefaultClass.length);

      //hide foodTruckCoin

      let truckRoadImage = document.getElementById("truckRoadImage"); //gets the truckRoadImage
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
            navbar.classList.remove("bg-black", "bg-dark", "navbar-dark");
            pageBody.classList.remove("dark", "moon");
            button.classList.remove("dark");

            navbar.classList.add("bg-light", "navbar-light");
            pageBody.classList.add("light", "sun");
            button.classList.add("light");

            truckRoadImage.style.filter = "brightness(1)";

            // change music if dark mode
            bgMusicDark.pause();
            bgMusic.volume = 0.05;
            bgMusic.play();
            //pause music on click
            toggleMusic.addEventListener("click", function () {
              if (bgMusic.paused) {
                bgMusic.play();
              } else {
                bgMusic.pause();
              }
            });

            // foodTruckLightOnDefaultClass display none
            for (let i = 0; i < foodTruckLightOnDefaultClass.length; i++) {
              foodTruckLightOnDefaultClass[i].style.display = "none";
              foodTruckLightOffDefaultClass[i].style.display = "unset";
            }
          }
          // if pageBody is light, remove light and sun classes and add dark and moon classes
          else if (pageBody.classList.contains("light")) {
            navbar.classList.remove("bg-light", "navbar-light");
            pageBody.classList.remove("light", "sun");
            button.classList.remove("light");

            navbar.classList.add("bg-black", "bg-dark", "navbar-dark");
            pageBody.classList.add("dark", "moon");
            button.classList.add("dark");

            truckRoadImage.style.filter = "brightness(0.2)";

            bgMusic.pause();
            bgMusicDark.volume = 0.1;
            bgMusicDark.play();

            //pause music on click
            toggleMusic.addEventListener("click", function () {
              if (bgMusicDark.paused) {
                bgMusicDark.play();
              } else {
                bgMusicDark.pause();
              }
            });

            // foodTruckLightOffDefaultClass display none
            for (let i = 0; i < foodTruckLightOffDefaultClass.length; i++) {
              foodTruckLightOffDefaultClass[i].style.display = "none";
              foodTruckLightOnDefaultClass[i].style.display = "unset";
            }
          }
        };
        toggleMultipleClasses(pageBody);
      });
    }
    //* Dark/Light Mode - End
    // ? blue comments are for testing
    //! Rest of Code Goes below here -------------------------------------------------

    //TODO: Pull in API data for food truck instances
    //api using JSON-server
    // const foodTruckData = "http://localhost:3000/foodtrucks"; //food truck data from API

    //api using mockAPI
    const foodTruckData =
      "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/foodtrucks";

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

        // get 10 random foodtrucks from allFoodTrucksData and push to randomFoodTrucksData array, remove duplicates
        let randomFoodTrucksData = [];
        while (randomFoodTrucksData.length < 10) {
          let randomFoodTruck =
            allFoodTrucksData[
              Math.floor(Math.random() * allFoodTrucksData.length)
            ];
          if (randomFoodTrucksData.indexOf(randomFoodTruck) === -1) {
            randomFoodTrucksData.push(randomFoodTruck);
          }

          //if no more trucks can be added to randomFoodTrucksData, break out of loop
          if (randomFoodTrucksData.length === allFoodTrucksData.length) {
            break;
          }
        }
        console.log("randomFoodTrucksData:", randomFoodTrucksData);

        for (let i = 0; i < randomFoodTrucksData.length; i++) {
          // console.log(
          //   "loop iteration:",
          //   i,
          //   `allFoodTrucksData:`,
          //   randomFoodTrucksData[i]
          // );

          //append food truck instance to foodTruckLane 1, 2, or 3 at random
          let foodTruckLane = Math.floor(Math.random() * 3) + 1; //random number between 1 and 3

          //append food truck instances to the foodTruckContainer
          $(`#truckLane${foodTruckLane}`).append(
            html`
              <span id="foodTruckSpan-${i}" class="bounce">
                <div class="foodTruckContainer" id="foodTruckContainer-${i}">
                  <div id="foodtruck-${i}">
                    <img
                      class="foodTruckImage"
                      src="${randomFoodTrucksData[i].foodTruckTypeImage}"
                      alt="food truck image"
                      style="width: 25%"
                    />
                    <div class="bottom-left">Bottom Left</div>
                    <div class="top-left">Top Left</div>
                    <div class="top-right">Top Right</div>
                    <div class="bottom-right">Bottom Right</div>
                    <div class="centered">${randomFoodTrucksData[i].name}</div>
                    <img
                      id="foodTruckCoin-${i}"
                      src="./images/coinnobg.gif"
                      style="width: 10%; top: 35px; left: 125px; display: none"
                    />
                    <img
                      class="foodTruckHeadlightOff"
                      id="foodtruckHeadlightOff-${i}"
                      src="./images/foodtruck-headlightsOFF.png"
                      style="width: 25%;opacity: 0; display: none;"
                      class="lightOff"
                    />
                    <img
                      class="foodTruckHeadlightOn"
                      id="foodtruckHeadlight-${i}"
                      src="./images/foodtruck-headlights.png"
                      style="width: 25%"
                      class="lightOn"
                    />
                  </div>
                </div>
              </span>
            `
          );

          // Starts the foodTruck
          startFoodTruckCoins(i);
          // delay the moveFoodTruck function by a random time
          moveFoodTruck(i);

          // forces the function to only run once when the last food truck is created
          if (i === randomFoodTrucksData.length - 1) {
            giveMeDarkMode(); //Sets everything to default dark mode.
          }
        }

        // console.log("after for loop");

        //TODO: Animate image to move from the left to right of the screen

        function startFoodTruckCoins(coinsId) {
          // console.log("startFoodTruckCoins", coinsId);
          // on click display foodTruckCoin and move up and down
          $(`#foodTruckSpan-${coinsId}`).click(function () {
            // console.log("truck clicked", $(`#foodTruckCoin-${coinsId}`));
            let foodTruckCoin = $(`#foodTruckCoin-${coinsId}`);

            //append jquery css to foodTruckCoin
            foodTruckCoin.addClass("foodTruckCoinDoStuff").show();

            // $(`#foodTruckCoin-${coinsId}`).show();

            //play sound
            let audio = new Audio("./assets/coinsound.wav");

            audio.volume = 0.08;
            audio.play();
            foodTruckCoin.animate(
              {
                //move the coin up and then back down
                top: "-=50",
              },
              1000, //animation speed
              function () {
                // Animation complete.
                foodTruckCoin.removeClass("foodTruckCoinDoStuff").show().hide();
                foodTruckCoin.css("top", "35px");
                orderFood(coinsId);
              }
            );
          });
        }

        //TODO: Animate image to move from the left to right of the screen
        function moveFoodTruck(truckId) {
          $(`#foodTruckContainer-${truckId}`).css("left", "-1000px");
          // console.log(`truck is ${truckId} is moving`);

          function delay() {
            //return random number between 1 and 5 seconds
            return Math.floor(Math.random() * 5000) + 1000;
          }

          //puts a delay between each truck at random
          setTimeout(function () {
            // console.log("Why won't this truck start?!?!");

            $(`#foodTruckContainer-${truckId}`).animate(
              {
                left: "+=7680", //moves truck from left to right
              },
              randomizeSpeed(), //animation speed
              function () {
                // Animation complete.

                resetTruck(truckId);
              }
            );
          }, delay());
        }

        // reset truck to off screen to the left and move it to the right
        function resetTruck(truckId) {
          // console.log(`truck #${truckId} is resetting`);
          $(`#foodTruckContainer-${truckId}`).animate(
            {
              left: "-=7680", //moves truck from right to left (resets it to offscreen)
            },
            0, //animation speed
            function () {
              // Animation complete.
              //when truck is reset, move it to the right

              //move existing truck to a new lane
              function moveFoodTruckToNewLane(truckId) {
                // console.log(`truck #${truckId} is moving to a new lane`);
                //get current lane
                let currentLane = $(`#foodTruckSpan-${truckId}`)
                  .parent()
                  .attr("id");
                // console.log("current lane", currentLane);

                //get new lane
                let newLane = Math.floor(Math.random() * 3) + 1; //random number between 1 and 3
                // console.log("new lane", newLane);

                //move truck to new lane
                $(`#truckLane${newLane}`).append(
                  $(`#foodTruckSpan-${truckId}`)
                );
              }

              moveFoodTruckToNewLane(truckId);

              moveFoodTruck(truckId);
            }
          );
        }

        //randomizeS the speed of the truck
        function randomizeSpeed() {
          let randomNumber = Math.floor(Math.random() * 1000) + 1;
          //2% chance to deliver food SUPER FAST!
          if (randomNumber <= 2) {
            return Math.floor(Math.random() * (3000 - 1000 + 1)) + 100;
          } else {
            // return a random number between 15 and 30 seconds
            return Math.floor(Math.random() * (6000 - 80000 + 1)) + 60000;
          }
        }

        //TODO: Allow user to select from list of recipes and order them
        function orderFood(truckId) {
          console.log("Ordering Food");
          //displays a popup form with the food truck's menu inside truckOrderingMenu
          console.log("order food", randomFoodTrucksData[truckId].recipes);
          $(`#truckOrderingMenu`).html(
            html`
              <div class="truckOrderingMenu">
                <div class="truckOrderingMenuHeader">
                  <h2>${randomFoodTrucksData[truckId].name}</h2>
                  <h3>Menu</h3>
                  <!-- order Status link -->
                  <Button id="orderStatusLink">Order Stats</Button>
                  <!-- button to close the menu -->
                  <button id="closeMenuButton">X</button>
                </div>
                <div class="truckOrderingMenuBody">
                  <div class="truckOrderingMenuBodyLeft">
                    <div class="truckOrderingMenuBodyLeftTop">
                      <h4>Food</h4>
                      <form id="orderForm"}">
                        <div class="truckOrderingMenuBodyLeftTopFood">
                          <div class="truckOrderingMenuBodyLeftTopFoodItem">
                            <h5 id="recipe1Name">
                              ${randomFoodTrucksData[truckId].recipes[0].recipe1}
                            </h5>
                            <p>Price: $1.00</p>
                            <p>Calories: 100</p>
                            <p>Ingredients: 1, 2, 3</p>

                            <labal>Qty: </labal>
                            <input
                              type="number"
                              id="recipe1Quantity"
                              name="recipe1Quantity"
                              min="0"
                              value= "0"
                            />
                          </div>
                          <div class="truckOrderingMenuBodyLeftTopFoodItem">
                            <h5 id="recipe2Name">
                              ${randomFoodTrucksData[truckId].recipes[0].recipe2}
                            </h5>
                            <p>Price: $1.00</p>
                            <p>Calories: 100</p>
                            <p>Ingredients: 1, 2, 3</p>
                            <labal>Qty: </labal>
                            <input
                              type="number"
                              id="recipe2Quantity"
                              name="recipe2Quantity"
                              min="0"
                              value= "0"
                            />
                          </div>
                          <div class="truckOrderingMenuBodyLeftTopFoodItem">
                            <h5 id="recipe3Name">
                              ${randomFoodTrucksData[truckId].recipes[0].recipe3}
                            </h5>
                            <p>Price: $1.00</p>
                            <p>Calories: 100</p>
                            <p>Ingredients: 1, 2, 3</p>
                            <labal>Qty: </labal>
                            <input
                              type="number"
                              id="recipe3Quantity"
                              name="recipe3Quantity"
                              min="0"
                              value= "0"
                            />
                          </div>
                        </div>
                        <h2 id="OrderError"></h2>
                        <h3 id="OrderSuccess"></h3>
                        <button type="submit" id="submitOrderButton">
                          Submit Order
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            `
          );

          let orderForm = document.querySelector("#orderForm");
          orderForm.addEventListener("submit", placeOrder, true);

          let orderStats = document.querySelector("#orderStatusLink");
          orderStats.addEventListener("click", viewOrderStats, true);

          // close menu button
          $(`#closeMenuButton`).click(function () {
            $(`#truckOrderingMenu`).html("");
          });

          function viewOrderStats() {
            console.log("view order stats");
            $(`#truckOrderingMenu`).html(
              html`
                <div class="truckOrderStatsMenu">
                  <div class="truckOrderStatsHeader">
                    <h2>${randomFoodTrucksData[truckId].name}</h2>
                    <h3>Order Stats</h3>
                    <!-- button to close the menu -->
                    <button id="closeMenuButton">X</button>
                  </div>
                  <div class="truckOrderStatsBody">
                    <div class="truckOrderStatsBodyLeft">
                      <div class="truckOrderStatsContainer">
                        <h5>Orders Taken</h5>
                        <div>
                          <div id="truckOrderStatsContainer1">
                            <h5 id="recipe1Name">
                              ${randomFoodTrucksData[truckId].recipes[0]
                                .recipe1}
                            </h5>
                            <p>
                              ${randomFoodTrucksData[truckId].orders[0]
                                .recipe1Qty}
                            </p>
                          </div>
                          <div id="truckOrderStatsContainer2">
                            <h5 id="recipe1Name">
                              ${randomFoodTrucksData[truckId].recipes[0]
                                .recipe2}
                            </h5>
                            <p>
                              ${randomFoodTrucksData[truckId].orders[0]
                                .recipe2Qty}
                            </p>
                          </div>
                          <div id="truckOrderStatsContainer3">
                            <h5 id="recipe1Name">
                              ${randomFoodTrucksData[truckId].recipes[0]
                                .recipe3}
                            </h5>
                            <p>
                              ${randomFoodTrucksData[truckId].orders[0]
                                .recipe3Qty}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              `
            );

            // close menu button and go back to menu

            $(`#closeMenuButton`).click(function () {
              $(`#truckOrderingMenu`).html("");
              orderFood(truckId);
            });
          }

          function placeOrder(event) {
            event.preventDefault();
            //display error if any of the fields are empty
            if (
              $(`#recipe1Quantity`).val() == "" ||
              $(`#recipe2Quantity`).val() == "" ||
              $(`#recipe3Quantity`).val() == ""
            ) {
              console.log("Please fill out all fields before submitting");
              //display html error message
              $(`#OrderError`).html(
                html`
                  <div>
                    <h3>Order Error</h3>
                    <p>One or more fields are empty</p>
                    <button id="closeOrderError">X</button>
                  </div>
                `
              );
              //close menu button
              $(`#closeOrderError`).click(function () {
                $(`#OrderError`).html("");
              });

              return;
            }

            console.log("place order");
            //get recipe1Quantity on submit
            let recipe1Quantity = $(`#recipe1Quantity`).val();
            console.log("recipe1Quantity", recipe1Quantity);
            let recipe2Quantity = $(`#recipe2Quantity`).val();
            console.log("recipe2Quantity", recipe2Quantity);
            let recipe3Quantity = $(`#recipe3Quantity`).val();
            console.log("recipe3Quantity", recipe3Quantity);

            //get the name of each item ordered
            let recipe1Name = $(`#recipe1Name`).val();
            console.log("recipe1Name:", recipe1Name);
            let recipe2Name = $(`#recipe2Name`).val();
            console.log("recipe2Name:", recipe2Name);
            let recipe3Name = $(`#recipe3Name`).val();
            console.log("recipe3Name:", recipe3Name);

            let currentOrderQty1 = parseInt(
              randomFoodTrucksData[truckId].orders[0].recipe1Qty
            );
            console.log("currentOrderQty1:", currentOrderQty1);
            let currentOrderQty2 = parseInt(
              randomFoodTrucksData[truckId].orders[0].recipe2Qty
            );
            console.log("currentOrderQty2:", currentOrderQty2);
            let currentOrderQty3 = parseInt(
              randomFoodTrucksData[truckId].orders[0].recipe3Qty
            );
            console.log("currentOrderQty3:", currentOrderQty3);

            // add the new order to the current order
            let newOrderQty1 = parseInt(recipe1Quantity) + currentOrderQty1;
            console.log("newOrderQty1:", newOrderQty1);
            let newOrderQty2 = parseInt(recipe2Quantity) + currentOrderQty2;
            console.log("newOrderQty2:", newOrderQty2);
            let newOrderQty3 = parseInt(recipe3Quantity) + currentOrderQty3;
            console.log("newOrderQty3:", newOrderQty3);

            // push newOrderQty1 to foodTruckData array and update the API
            randomFoodTrucksData[truckId].orders[0] = {
              recipe1Qty: newOrderQty1,
              recipe2Qty: newOrderQty2,
              recipe3Qty: newOrderQty3,
            };
            console.log(
              "randomFoodTrucksData before API Update",
              randomFoodTrucksData[truckId].orders[0]
            );

            // set values back to default
            $(`#recipe1Quantity`).val("0");
            $(`#recipe2Quantity`).val("0");
            $(`#recipe3Quantity`).val("0");
            $(`#OrderError`).html("");

            //display order success message for 3 seconds

            //disable button for 3 seconds
            $(`#submitOrderButton`).prop("disabled", true);
            setTimeout(function () {
              $(`#submitOrderButton`).prop("disabled", false);
            }, 3000);

            $(`#OrderSuccess`).html(
              html`
                <div>
                  <h3>Order Success</h3>
                  <p>Your order has been placed</p>
                </div>
              `
            );

            //TODO: Need function to place order and add it to a list (API)
            // update the API
            $.ajax({
              url: `${foodTruckData}/${randomFoodTrucksData[truckId].id}`,
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              //update orders array with new order
              data: JSON.stringify({
                orders: [
                  {
                    recipe1Qty: newOrderQty1,
                    recipe2Qty: newOrderQty2,
                    recipe3Qty: newOrderQty3,
                  },
                ],
              }),
              success: function (response) {
                console.log("response:", response);
              },
            });
            setTimeout(function () {
              $(`#OrderSuccess`).html("");
              viewOrderStats(truckId);
            }, 3000);
          }
        }

        //TODO: Need function to build recipe using ingredients and add it to a list (API)

        //TODO: If recipe is out of stock, prevent selection and alert user

        //TODO: Allow user to create their own food truck instance and add it a list (API)
        //*Can have 3 recipes for each food truck

        //TODO: Display instances of each food truck on the page randomly
      }
    });
  }
}

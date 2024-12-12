var carMovementArray = [];
var enemyMovementArray = [];
var carMoveBack = [];
var enemyMoveBack = [];
var carMoveLeft = [];
var enemyMoveLeft = [];
var carMoveForward = [];
var enemyMoveForward = [];
var carMoveRight = [];
var enemyMoveRight = [];
var carTopPos = [""];
var enemyTopPos = [""];
var carLeftPos = [""];
var enemyLeftPos = [""];
var carMoveSpeed = [0, 0, 0, 0]; // [w, a, s, d]
var enemyMoveSpeed = [0, 0, 0, 0];
var carDrivingSpeeds = [1, 0.5];
var enemyDrivingSpeeds = [1, 0.5];
var carCurrentLap = [];
var enemyCurrentLap = [];
let carSkin = ['△', '▽', '▷', '◁', '◸', '◹', '◺', '◿'];
let enemySkin = ['▲', '▼', '▶', '◀', '◤', '◥', '◣', '◢'];

window.onload = function() {
    var car = document.getElementById("car");
    car.style.left = (936) + "px";
    car.style.top = (675) + "px";
    var enemyCar = document.getElementById("enemyCar");
    enemyCar.style.left = (936) + "px";
    enemyCar.style.top = (725) + "px";
}

function operateCar(key, player) {
    if (player) {
        var car = document.getElementById("car")
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        function carTopPosRefresh() {
            let carTopPos = ""
            for (x=0; x<`${car.style.top}`.length; x++) {
                if (`${car.style.top}`[x] == "p") {
                    break
                } else {
                    carTopPos += `${car.style.top}`[x];
                };
            };
            return(carTopPos);
        };
        carTopPos[0] = carTopPosRefresh()
        function carLeftPosRefresh() {
            let carLeftPos = ""
            for (x=0; x<`${car.style.left}`.length; x++) {
                if (`${car.style.left}`[x] == "p") {
                    break
                } else {
                    carLeftPos += `${car.style.left}`[x];
                };
            };
            return(carLeftPos);
        };
        carLeftPos[0] = carLeftPosRefresh();
        if ((carTopPos[0] > 751) || (carLeftPos[0] > 1670) || (carLeftPos[0] < 210) || (carTopPos[0] < 205) || ((carLeftPos[0] > 373) && (carTopPos[0] > 360) && (carLeftPos[0] < 1510) && (carTopPos[0] < 622))) {
            carDrivingSpeeds = [0.25, 0.125];
        } else {
            carDrivingSpeeds = [1, 0.5];
        }
        if (key == "KeyS") {
            carTopPos[0] = carTopPosRefresh()
            if (carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")) {
                if (carMovementArray.includes("moveBack") == false ) {
                    let carMoveBackInt = (setInterval(function() {
                        if ((carTopPos[0] > (screenHeight - 50)) != true) {
                            if ((carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")) == false) {
                                car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[0]) + "px";
                                carTopPos[0] = carTopPosRefresh();
                                carMoveSpeed[2] = carDrivingSpeeds[0]; 
                                car.innerHTML = carSkin[1]
                            } else {
                                car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[1]) + "px";
                                carTopPos[0] = carTopPosRefresh();
                                carMoveSpeed[2] = carDrivingSpeeds[1];
                            };
                        } else {
                            carMoveSpeed[2] = 0;
                        };
                    }, 1));
                    carMoveBack.push(carMoveBackInt);
                    carMovementArray.push("moveBack");
                } else {
                    let carMoveBackIndex = carMovementArray.indexOf("moveBack");
                    carMovementArray.splice(carMoveBackIndex, 1);
                    clearInterval(carMoveBack[0]);
                    carMoveBack.splice(0, 1);
                    let carMoveBackInt = (setInterval(function() {
                        if ((carTopPos[0] > (screenHeight - 50)) != true) {
                            car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[1]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[2] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[2] = 0;
                        }
                    }, 1));
                    carMoveBack.push(carMoveBackInt);
                    carMovementArray.push("moveBack");
                };
            } else if (carMovementArray.includes("moveBack") == false ) {
                let carMoveBackInt = (setInterval(function() {
                    if (carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")){
                        if ((carTopPos[0] > (screenHeight - 50)) != true) {
                            car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[1]) + "px";
                            carMoveSpeed[2] = carDrivingSpeeds[1];
                            carTopPos[0] = carTopPosRefresh();
                        };
                    } else {
                        if ((carTopPos[0] > (screenHeight - 50)) != true) {
                            car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[0]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[2] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[0] = 0;
                        }
                    };
                }, 1));
                carMoveBack.push(carMoveBackInt);
                carMovementArray.push("moveBack");
            } else if (carMovementArray.includes("moveBack") == true ) {
                if (carMoveSpeed[2] == carDrivingSpeeds[1]) {
                    let carMoveBackIndex = carMovementArray.indexOf("moveBack");
                    carMovementArray.splice(carMoveBackIndex, 1);
                    clearInterval(carMoveBack[0]);
                    carMoveBack.splice(0, 1);
                    let carMoveBackInt = (setInterval(function() {
                        if ((carTopPos[0] > (screenHeight - 50)) != true) {
                            car.style.top = (Number(carTopPos[0]) + carDrivingSpeeds[0]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[2] = carDrivingSpeeds[0];
                        } else {
                           carMoveSpeed[2] = 0;
                        };
                    }, 1));
                   carMoveBack.push(carMoveBackInt);
                   carMovementArray.push("moveBack");
                };
            };
        };
        if (key == "KeyW") {
            carTopPos[0] = carTopPosRefresh()
            if (carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")) {
                if (carMovementArray.includes("moveForward") == false ) {
                    let carMoveForwardInt = (setInterval(function() {
                        if ((carTopPos[0] < 2) != true) {
                            if ((carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")) == false) {
                                car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[0]) + "px";
                                carTopPos[0] = carTopPosRefresh();
                                carMoveSpeed[0] = carDrivingSpeeds[0];
                                car.innerHTML = carSkin[0]
                            } else {
                                car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[1]) + "px";
                                carTopPos[0] = carTopPosRefresh();
                                carMoveSpeed[0] = carDrivingSpeeds[1];
                            };
                        } else {
                            carMoveSpeed[0] = 0;
                        };
                    }, 1));
                    carMoveForward.push(carMoveForwardInt);
                    carMovementArray.push("moveForward");
                }  else {
                    let carMoveForwardIndex = carMovementArray.indexOf("moveForward");
                    carMovementArray.splice(carMoveForwardIndex, 1);
                    clearInterval(carMoveForward[0]);
                    carMoveForward.splice(0, 1);
                    let carMoveForwardInt = (setInterval(function() {
                        if ((carTopPos[0] <(2)) != true) {
                            car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[1]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[0] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[0] = 0;
                        };
                    }, 1));
                    carMoveForward.push(carMoveForwardInt);
                    carMovementArray.push("moveForward");
                };
            } else if (carMovementArray.includes("moveForward") == false ) {
                let carMoveForwardInt = (setInterval(function() {
                    if (carMovementArray.includes("moveLeft") || carMovementArray.includes("moveRight")){
                        if ((carTopPos[0] < 2) != true) {
                            car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[1]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[0] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[0] = 0;
                        };
                    } else {
                        if ((carTopPos[0] < 2) != true) {
                            car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[0]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[0] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[0] = 0;
                        };
                    };
                }, 1));
                carMoveForward.push(carMoveForwardInt);
                carMovementArray.push("moveForward");
            }  else if (carMovementArray.includes("moveForward") == true ) {
                if (carMoveSpeed[0] == carDrivingSpeeds[1]) {
                    let carMoveForwardIndex = carMovementArray.indexOf("moveForward");
                    carMovementArray.splice(carMoveForwardIndex, 1);
                    clearInterval(carMoveForward[0]);
                    carMoveForward.splice(0, 1);
                    let carMoveForwardInt = (setInterval(function() {
                        if ((carTopPos[0] < 2) != true) {
                            car.style.top = (Number(carTopPos[0]) - carDrivingSpeeds[0]) + "px";
                            carTopPos[0] = carTopPosRefresh();
                            carMoveSpeed[0] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[0] = 0;
                        };
                    }, 1));
                    carMoveForward.push(carMoveForwardInt);
                    carMovementArray.push("moveForward");
                };
            };
        };
        if (key == "KeyA") {
            carLeftPos[0] = carLeftPosRefresh()
            if (carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")) {
                if (carMovementArray.includes("moveLeft") == false ) {
                    let carMoveLeftInt = (setInterval(function() {
                        if ((carLeftPos[0] < 2) != true) {
                            if ((carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")) == false) {
                                car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[0]) + "px";
                                carLeftPos[0] = carLeftPosRefresh();
                                carMoveSpeed[1] = carDrivingSpeeds[0];
                                car.innerHTML = carSkin[3]
                            } else {
                                car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[1]) + "px";
                                carLeftPos[0] = carLeftPosRefresh();
                                carMoveSpeed[1] = carDrivingSpeeds[1];
                            };
                        } else {
                            carMoveSpeed[1] = 0;
                        };
                    }, 1));
                    carMoveLeft.push(carMoveLeftInt);
                    carMovementArray.push("moveLeft");
                }  else {
                    let carMoveLeftIndex = carMovementArray.indexOf("moveLeft");
                    carMovementArray.splice(carMoveLeftIndex, 1);
                    clearInterval(carMoveLeft[0]);
                    carMoveLeft.splice(0, 1);
                    let carMoveLeftInt = (setInterval(function() {
                        if ((carLeftPos[0] < (2)) != true) {
                            car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[1]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[1] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[1] = 0;
                        };
                    }, 1));
                    carMoveLeft.push(carMoveLeftInt);
                    carMovementArray.push("moveLeft");
                };
            } else if (carMovementArray.includes("moveLeft") == false ) {
                let carMoveLeftInt = (setInterval(function() {
                    if (carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")){
                        if ((carLeftPos[0] < 2) != true) {
                            car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[1]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[1] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[1] = 0;
                        };
                    } else {
                        if ((carLeftPos[0] < 2) != true) {
                            car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[0]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[1] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[1] = 0;
                        };
                    };
                }, 1));
                carMoveLeft.push(carMoveLeftInt);
                carMovementArray.push("moveLeft");
            }  else if (carMovementArray.includes("moveLeft") == true ) {
                if (carMoveSpeed[1] == carDrivingSpeeds[1]) {
                    let carMoveLeftIndex = carMovementArray.indexOf("moveLeft");
                    carMovementArray.splice(carMoveLeftIndex, 1);
                    clearInterval(carMoveLeft[0]);
                    carMoveLeft.splice(0, 1);
                    let carMoveLeftInt = (setInterval(function() {
                        if ((carLeftPos[0] < 2) != true) {
                            car.style.left = (Number(carLeftPos[0]) - carDrivingSpeeds[0]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[1] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[1] = 0;
                        };
                    }, 1));
                    carMoveLeft.push(carMoveLeftInt);
                    carMovementArray.push("moveLeft");
                };
            };
        };
        if (key == "KeyD") {
            carLeftPos[0] = carLeftPosRefresh()
            if (carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")) {
                if (carMovementArray.includes("moveRight") == false ) {
                    let carMoveRightInt = (setInterval(function() {
                        if ((carLeftPos[0] > (screenWidth-30)) != true) {
                            if ((carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")) == false) {
                                car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[0]) + "px";
                                carLeftPos[0] = carLeftPosRefresh();
                                carMoveSpeed[3] = carDrivingSpeeds[0];
                                car.innerHTML = carSkin[2]
                            } else {
                                car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[1]) + "px";
                                carLeftPos[0] = carLeftPosRefresh();
                                carMoveSpeed[3] = carDrivingSpeeds[1];
                            };
                            car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[1]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[3] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[3] = 0;
                        };
                    }, 1));
                    carMoveRight.push(carMoveRightInt);
                    carMovementArray.push("moveRight");
                }  else {
                    let carMoveRightIndex = carMovementArray.indexOf("moveRight");
                    carMovementArray.splice(carMoveRightIndex, 1);
                    clearInterval(carMoveRight[0]);
                    carMoveRight.splice(0, 1);
                    let carMoveRightInt = (setInterval(function() {
                        if ((carLeftPos[0] > (screenWidth-30)) != true) {
                            car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[1]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[3] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[3] = 0;
                        };
                    }, 1));
                    carMoveRight.push(carMoveRightInt);
                    carMovementArray.push("moveRight");
                };
            } else if (carMovementArray.includes("moveRight") == false ) {
                let carMoveRightInt = (setInterval(function() {
                    if (carMovementArray.includes("moveForward") || carMovementArray.includes("moveBack")){
                        if ((carLeftPos[0] > (screenWidth-30)) != true) {
                            car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[1]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[3] = carDrivingSpeeds[1];
                        } else {
                            carMoveSpeed[3] = 0;
                        };
                    } else {
                        if ((carLeftPos[0] > (screenWidth-30)) != true) {
                            car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[0]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[3] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[3] = 0;
                        };
                    };
                }, 1));
                carMoveRight.push(carMoveRightInt);
                carMovementArray.push("moveRight");
            }  else if (carMovementArray.includes("moveRight") == true ) {
                if (carMoveSpeed[3] == carDrivingSpeeds[1]) {
                    let carMoveRightIndex = carMovementArray.indexOf("moveRight");
                    carMovementArray.splice(carMoveRightIndex, 1);
                    clearInterval(carMoveRight[0]);
                    carMoveRight.splice(0, 1);
                    let carMoveRightInt = (setInterval(function() {
                        if ((carLeftPos[0] > (screenWidth-30)) != true) {
                            car.style.left = (Number(carLeftPos[0]) + carDrivingSpeeds[0]) + "px";
                            carLeftPos[0] = carLeftPosRefresh();
                            carMoveSpeed[3] = carDrivingSpeeds[0];
                        } else {
                            carMoveSpeed[3] = 0;
                        };
                    }, 1));
                    carMoveRight.push(carMoveRightInt);
                    carMovementArray.push("moveRight");
                };
            };
        };
        
        changeCar(true)

    } else {

        var enemyCar = document.getElementById("enemyCar")
        var screenHeight = window.innerHeight;
        var screenWidth = window.innerWidth;
        function enemyTopPosRefresh() {
            let enemyTopPos = ""
            for (x=0; x<`${enemyCar.style.top}`.length; x++) {
                if (`${enemyCar.style.top}`[x] == "p") {
                    break
                } else {
                    enemyTopPos += `${enemyCar.style.top}`[x];
                };
            };
            return(enemyTopPos);
        };
        enemyTopPos[0] = enemyTopPosRefresh()
        function enemyLeftPosRefresh() {
            let enemyLeftPos = ""
            for (x=0; x<`${enemyCar.style.left}`.length; x++) {
                if (`${enemyCar.style.left}`[x] == "p") {
                    break
                } else {
                    enemyLeftPos += `${enemyCar.style.left}`[x];
                };
            };
            return(enemyLeftPos);
        };
        enemyLeftPos[0] = enemyLeftPosRefresh();
        if ((enemyTopPos[0] > 751) || (enemyLeftPos[0] > 1670) || (enemyLeftPos[0] < 210) || (enemyTopPos[0] < 205) || ((enemyLeftPos[0] > 373) && (enemyTopPos[0] > 360) && (enemyLeftPos[0] < 1510) && (enemyTopPos[0] < 622))) {
            enemyDrivingSpeeds = [0.25, 0.125];
        } else {
            enemyDrivingSpeeds = [1, 0.5];
        }
        if (key == "ArrowDown") {
            enemyTopPos[0] = enemyTopPosRefresh()
            if (enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")) {
                if (enemyMovementArray.includes("moveBack") == false ) {
                    let enemyMoveBackInt = (setInterval(function() {
                        if ((enemyTopPos[0] > (screenHeight - 50)) != true) {
                            if ((enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")) == false) {
                                enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[0]) + "px";
                                enemyTopPos[0] = enemyTopPosRefresh();
                                enemyMoveSpeed[2] = enemyDrivingSpeeds[0]; 
                                enemyCar.innerHTML = enemySkin[1]
                            } else {
                                enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[1]) + "px";
                                enemyTopPos[0] = enemyTopPosRefresh();
                                enemyMoveSpeed[2] = enemyDrivingSpeeds[1];
                            };
                        } else {
                            enemyMoveSpeed[2] = 0;
                        };
                    }, 1));
                    enemyMoveBack.push(enemyMoveBackInt);
                    enemyMovementArray.push("moveBack");
                } else {
                    let enemyMoveBackIndex = enemyMovementArray.indexOf("moveBack");
                    enemyMovementArray.splice(enemyMoveBackIndex, 1);
                    clearInterval(enemyMoveBack[0]);
                    enemyMoveBack.splice(0, 1);
                    let enemyMoveBackInt = (setInterval(function() {
                        if ((enemyTopPos[0] > (screenHeight - 50)) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[1]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[2] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[2] = 0;
                        }
                    }, 1));
                    enemyMoveBack.push(enemyMoveBackInt);
                    enemyMovementArray.push("moveBack");
                };
            } else if (enemyMovementArray.includes("moveBack") == false ) {
                let enemyMoveBackInt = (setInterval(function() {
                    if (enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")){
                        if ((enemyTopPos[0] > (screenHeight - 50)) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[1]) + "px";
                            enemyMoveSpeed[2] = enemyDrivingSpeeds[1];
                            enemyTopPos[0] = enemyTopPosRefresh();
                        };
                    } else {
                        if ((enemyTopPos[0] > (screenHeight - 50)) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[0]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[2] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[0] = 0;
                        }
                    };
                }, 1));
                enemyMoveBack.push(enemyMoveBackInt);
                enemyMovementArray.push("moveBack");
            } else if (enemyMovementArray.includes("moveBack") == true ) {
                if (enemyMoveSpeed[2] == enemyDrivingSpeeds[1]) {
                    let enemyMoveBackIndex = enemyMovementArray.indexOf("moveBack");
                    enemyMovementArray.splice(enemyMoveBackIndex, 1);
                    clearInterval(enemyMoveBack[0]);
                    enemyMoveBack.splice(0, 1);
                    let enemyMoveBackInt = (setInterval(function() {
                        if ((enemyTopPos[0] > (screenHeight - 50)) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) + enemyDrivingSpeeds[0]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[2] = enemyDrivingSpeeds[0];
                        } else {
                           enemyMoveSpeed[2] = 0;
                        };
                    }, 1));
                   enemyMoveBack.push(enemyMoveBackInt);
                   enemyMovementArray.push("moveBack");
                };
            };
        };
        if (key == "ArrowUp") {
            enemyTopPos[0] = enemyTopPosRefresh()
            if (enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")) {
                if (enemyMovementArray.includes("moveForward") == false ) {
                    let enemyMoveForwardInt = (setInterval(function() {
                        if ((enemyTopPos[0] < 2) != true) {
                            if ((enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")) == false) {
                                enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[0]) + "px";
                                enemyTopPos[0] = enemyTopPosRefresh();
                                enemyMoveSpeed[0] = enemyDrivingSpeeds[0];
                                enemyCar.innerHTML = enemySkin[0]
                            } else {
                                enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[1]) + "px";
                                enemyTopPos[0] = enemyTopPosRefresh();
                                enemyMoveSpeed[0] = enemyDrivingSpeeds[1];
                            };
                        } else {
                            enemyMoveSpeed[0] = 0;
                        };
                    }, 1));
                    enemyMoveForward.push(enemyMoveForwardInt);
                    enemyMovementArray.push("moveForward");
                }  else {
                    let enemyMoveForwardIndex = enemyMovementArray.indexOf("moveForward");
                    enemyMovementArray.splice(enemyMoveForwardIndex, 1);
                    clearInterval(enemyMoveForward[0]);
                    enemyMoveForward.splice(0, 1);
                    let enemyMoveForwardInt = (setInterval(function() {
                        if ((enemyTopPos[0] <(2)) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[1]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[0] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[0] = 0;
                        };
                    }, 1));
                    enemyMoveForward.push(enemyMoveForwardInt);
                    enemyMovementArray.push("moveForward");
                };
            } else if (enemyMovementArray.includes("moveForward") == false ) {
                let enemyMoveForwardInt = (setInterval(function() {
                    if (enemyMovementArray.includes("moveLeft") || enemyMovementArray.includes("moveRight")){
                        if ((enemyTopPos[0] < 2) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[1]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[0] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[0] = 0;
                        };
                    } else {
                        if ((enemyTopPos[0] < 2) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[0]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[0] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[0] = 0;
                        };
                    };
                }, 1));
                enemyMoveForward.push(enemyMoveForwardInt);
                enemyMovementArray.push("moveForward");
            }  else if (enemyMovementArray.includes("moveForward") == true ) {
                if (enemyMoveSpeed[0] == enemyDrivingSpeeds[1]) {
                    let enemyMoveForwardIndex = enemyMovementArray.indexOf("moveForward");
                    enemyMovementArray.splice(enemyMoveForwardIndex, 1);
                    clearInterval(enemyMoveForward[0]);
                    enemyMoveForward.splice(0, 1);
                    let enemyMoveForwardInt = (setInterval(function() {
                        if ((enemyTopPos[0] < 2) != true) {
                            enemyCar.style.top = (Number(enemyTopPos[0]) - enemyDrivingSpeeds[0]) + "px";
                            enemyTopPos[0] = enemyTopPosRefresh();
                            enemyMoveSpeed[0] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[0] = 0;
                        };
                    }, 1));
                    enemyMoveForward.push(enemyMoveForwardInt);
                    enemyMovementArray.push("moveForward");
                };
            };
        };
        if (key == "ArrowLeft") {
            enemyLeftPos[0] = enemyLeftPosRefresh()
            if (enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")) {
                if (enemyMovementArray.includes("moveLeft") == false ) {
                    let enemyMoveLeftInt = (setInterval(function() {
                        if ((enemyLeftPos[0] < 2) != true) {
                            if ((enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")) == false) {
                                enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[0]) + "px";
                                enemyLeftPos[0] = enemyLeftPosRefresh();
                                enemyMoveSpeed[1] = enemyDrivingSpeeds[0];
                                enemyCar.innerHTML = enemySkin[3]
                            } else {
                                enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[1]) + "px";
                                enemyLeftPos[0] = enemyLeftPosRefresh();
                                enemyMoveSpeed[1] = enemyDrivingSpeeds[1];
                            };
                        } else {
                            enemyMoveSpeed[1] = 0;
                        };
                    }, 1));
                    enemyMoveLeft.push(enemyMoveLeftInt);
                    enemyMovementArray.push("moveLeft");
                }  else {
                    let enemyMoveLeftIndex = enemyMovementArray.indexOf("moveLeft");
                    enemyMovementArray.splice(enemyMoveLeftIndex, 1);
                    clearInterval(enemyMoveLeft[0]);
                    enemyMoveLeft.splice(0, 1);
                    let enemyMoveLeftInt = (setInterval(function() {
                        if ((enemyLeftPos[0] < (2)) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[1]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[1] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[1] = 0;
                        };
                    }, 1));
                    enemyMoveLeft.push(enemyMoveLeftInt);
                    enemyMovementArray.push("moveLeft");
                };
            } else if (enemyMovementArray.includes("moveLeft") == false ) {
                let enemyMoveLeftInt = (setInterval(function() {
                    if (enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")){
                        if ((enemyLeftPos[0] < 2) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[1]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[1] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[1] = 0;
                        };
                    } else {
                        if ((enemyLeftPos[0] < 2) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[0]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[1] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[1] = 0;
                        };
                    };
                }, 1));
                enemyMoveLeft.push(enemyMoveLeftInt);
                enemyMovementArray.push("moveLeft");
            }  else if (enemyMovementArray.includes("moveLeft") == true ) {
                if (enemyMoveSpeed[1] == enemyDrivingSpeeds[1]) {
                    let enemyMoveLeftIndex = enemyMovementArray.indexOf("moveLeft");
                    enemyMovementArray.splice(enemyMoveLeftIndex, 1);
                    clearInterval(enemyMoveLeft[0]);
                    enemyMoveLeft.splice(0, 1);
                    let enemyMoveLeftInt = (setInterval(function() {
                        if ((enemyLeftPos[0] < 2) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) - enemyDrivingSpeeds[0]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[1] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[1] = 0;
                        };
                    }, 1));
                    enemyMoveLeft.push(enemyMoveLeftInt);
                    enemyMovementArray.push("moveLeft");
                };
            };
        };
        if (key == "ArrowRight") {
            enemyLeftPos[0] = enemyLeftPosRefresh()
            if (enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")) {
                if (enemyMovementArray.includes("moveRight") == false ) {
                    let enemyMoveRightInt = (setInterval(function() {
                        if ((enemyLeftPos[0] > (screenWidth-30)) != true) {
                            if ((enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")) == false) {
                                enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[0]) + "px";
                                enemyLeftPos[0] = enemyLeftPosRefresh();
                                enemyMoveSpeed[3] = enemyDrivingSpeeds[0];
                                enemyCar.innerHTML = enemySkin[2]
                            } else {
                                enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[1]) + "px";
                                enemyLeftPos[0] = enemyLeftPosRefresh();
                                enemyMoveSpeed[3] = enemyDrivingSpeeds[1];
                            };
                            enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[1]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[3] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[3] = 0;
                        };
                    }, 1));
                    enemyMoveRight.push(enemyMoveRightInt);
                    enemyMovementArray.push("moveRight");
                }  else {
                    let enemyMoveRightIndex = enemyMovementArray.indexOf("moveRight");
                    enemyMovementArray.splice(enemyMoveRightIndex, 1);
                    clearInterval(enemyMoveRight[0]);
                    enemyMoveRight.splice(0, 1);
                    let enemyMoveRightInt = (setInterval(function() {
                        if ((enemyLeftPos[0] > (screenWidth-30)) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[1]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[3] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[3] = 0;
                        };
                    }, 1));
                    enemyMoveRight.push(enemyMoveRightInt);
                    enemyMovementArray.push("moveRight");
                };
            } else if (enemyMovementArray.includes("moveRight") == false ) {
                let enemyMoveRightInt = (setInterval(function() {
                    if (enemyMovementArray.includes("moveForward") || enemyMovementArray.includes("moveBack")){
                        if ((enemyLeftPos[0] > (screenWidth-30)) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[1]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[3] = enemyDrivingSpeeds[1];
                        } else {
                            enemyMoveSpeed[3] = 0;
                        };
                    } else {
                        if ((enemyLeftPos[0] > (screenWidth-30)) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[0]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[3] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[3] = 0;
                        };
                    };
                }, 1));
                enemyMoveRight.push(enemyMoveRightInt);
                enemyMovementArray.push("moveRight");
            }  else if (enemyMovementArray.includes("moveRight") == true ) {
                if (enemyMoveSpeed[3] == enemyDrivingSpeeds[1]) {
                    let enemyMoveRightIndex = enemyMovementArray.indexOf("moveRight");
                    enemyMovementArray.splice(enemyMoveRightIndex, 1);
                    clearInterval(enemyMoveRight[0]);
                    enemyMoveRight.splice(0, 1);
                    let enemyMoveRightInt = (setInterval(function() {
                        if ((enemyLeftPos[0] > (screenWidth-30)) != true) {
                            enemyCar.style.left = (Number(enemyLeftPos[0]) + enemyDrivingSpeeds[0]) + "px";
                            enemyLeftPos[0] = enemyLeftPosRefresh();
                            enemyMoveSpeed[3] = enemyDrivingSpeeds[0];
                        } else {
                            enemyMoveSpeed[3] = 0;
                        };
                    }, 1));
                    enemyMoveRight.push(enemyMoveRightInt);
                    enemyMovementArray.push("moveRight");
                };
            };
        };
        
        changeCar(false)

    };
    
}

setInterval(function() {
    if ((carLeftPos[0] > 1492.5 && carTopPos[0] > 595.25) && carMovementArray.includes("moveRight")) {
        if (carCurrentLap.includes("part1") == false) {
            carCurrentLap.push("part1")
            console.log("Car: ", carCurrentLap)
        }
    } else if ((carLeftPos[0] < 1492.5 && carTopPos[0] > 595.25) && carMovementArray.includes("moveLeft")) {
        if (carCurrentLap.includes("part1")) {
            carCurrentLap.pop()
            console.log("Car: ", carCurrentLap)
        }
        console.log("youre going the wrong way!!")
    };
    if (carCurrentLap.includes('part1')) {
        if ((carLeftPos[0] > 1492.5 && carTopPos[0] < 382.75) && carMovementArray.includes("moveForward")) {
            if (carCurrentLap.includes("part2") == false) {
                carCurrentLap.push("part2")
                console.log("Car: ", carCurrentLap)
            }
        } else if ((carLeftPos[0] > 1492.5 && carTopPos[0] > 382.75) && carMovementArray.includes("moveBack")) {
            if (carCurrentLap.includes("part2")) {
                carCurrentLap.pop()
                console.log("Car: ", carCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (carCurrentLap.includes('part2')) {
        if ((carLeftPos[0] < 470 && carTopPos[0] < 382.75) && carMovementArray.includes("moveLeft")) {
            if (carCurrentLap.includes("part3") == false) {
                carCurrentLap.push("part3")
                console.log("Car: ", carCurrentLap)
            }
        } else if ((carLeftPos[0] > 470 && carTopPos[0] < 382.75) && carMovementArray.includes("moveRight")) {
            if (carCurrentLap.includes("part3")) {
                carCurrentLap.pop()
                console.log("Car: ", carCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (carCurrentLap.includes('part3')) {
        if ((carLeftPos[0] < 470 && carTopPos[0] > 595.25) && carMovementArray.includes("moveBack")) {
            if (carCurrentLap.includes("part4") == false) {
                carCurrentLap.push("part4")
                console.log("Car: ", carCurrentLap)
            }
        } else if ((carLeftPos[0] < 470 && carTopPos[0] < 595.25) && carMovementArray.includes("moveForward")) {
            if (carCurrentLap.includes("part4")) {
                carCurrentLap.pop()
                console.log("Car: ", carCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (carCurrentLap.includes('part4')) {
        if ((carLeftPos[0] > 936 && carTopPos[0] > 595.25) && carMovementArray.includes("moveRight")) {
            let carLapNum = document.getElementById('laps').innerHTML
            document.getElementById('laps').innerHTML = Number(carLapNum) + 1;
            carCurrentLap = [];
            console.log("Car: ", carCurrentLap);
        } else if ((carLeftPos[0] < 936 && carTopPos[0] > 595.25) && carMovementArray.includes("moveLeft")) {
            console.log("youre going the wrong way!!")
        };
    };
    if ((carLeftPos[0] > 373) && (carTopPos[0] > 360) && (carLeftPos[0] < 1510) && (carTopPos[0] < 622)) {
        console.log('GET OFF THE GRASS!!')
    }
}, 1)

setInterval(function() {
    if ((enemyLeftPos[0] > 1492.5 && enemyTopPos[0] > 595.25) && enemyMovementArray.includes("moveRight")) {
        if (enemyCurrentLap.includes("part1") == false) {
            enemyCurrentLap.push("part1")
            console.log("enemyCar: ", enemyCurrentLap)
        }
    } else if ((enemyLeftPos[0] < 1492.5 && enemyTopPos[0] > 595.25) && enemyMovementArray.includes("moveLeft")) {
        if (enemyCurrentLap.includes("part1")) {
            enemyCurrentLap.pop()
            console.log("enemyCar: ", enemyCurrentLap)
        }
        console.log("youre going the wrong way!!")
    };
    if (enemyCurrentLap.includes('part1')) {
        if ((enemyLeftPos[0] > 1492.5 && enemyTopPos[0] < 382.75) && enemyMovementArray.includes("moveForward")) {
            if (enemyCurrentLap.includes("part2") == false) {
                enemyCurrentLap.push("part2")
                console.log("enemyCar: ", enemyCurrentLap)
            }
        } else if ((enemyLeftPos[0] > 1492.5 && enemyTopPos[0] > 382.75) && enemyMovementArray.includes("moveBack")) {
            if (enemyCurrentLap.includes("part2")) {
                enemyCurrentLap.pop()
                console.log("enemyCar: ", enemyCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (enemyCurrentLap.includes('part2')) {
        if ((enemyLeftPos[0] < 470 && enemyTopPos[0] < 382.75) && enemyMovementArray.includes("moveLeft")) {
            if (enemyCurrentLap.includes("part3") == false) {
                enemyCurrentLap.push("part3")
                console.log("enemyCar: ", enemyCurrentLap)
            }
        } else if ((enemyLeftPos[0] > 470 && enemyTopPos[0] < 382.75) && enemyMovementArray.includes("moveRight")) {
            if (enemyCurrentLap.includes("part3")) {
                enemyCurrentLap.pop()
                console.log("enemyCar: ", enemyCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (enemyCurrentLap.includes('part3')) {
        if ((enemyLeftPos[0] < 470 && enemyTopPos[0] > 595.25) && enemyMovementArray.includes("moveBack")) {
            if (enemyCurrentLap.includes("part4") == false) {
                enemyCurrentLap.push("part4")
                console.log("enemyCar: ", enemyCurrentLap)
            }
        } else if ((enemyLeftPos[0] < 470 && enemyTopPos[0] < 595.25) && enemyMovementArray.includes("moveForward")) {
            if (enemyCurrentLap.includes("part4")) {
                enemyCurrentLap.pop()
                console.log("enemyCar: ", enemyCurrentLap)
            }
            console.log("youre going the wrong way!!")
        };
    };
    if (enemyCurrentLap.includes('part4')) {
        if ((enemyLeftPos[0] > 936 && enemyTopPos[0] > 595.25) && enemyMovementArray.includes("moveRight")) {
            let enemyLapNum = document.getElementById('enemyLaps').innerHTML
            document.getElementById('enemyLaps').innerHTML = Number(enemyLapNum) + 1;
            enemyCurrentLap = [];
            console.log("enemyCar: ", enemyCurrentLap);
        } else if ((enemyLeftPos[0] < 936 && enemyTopPos[0] > 595.25) && enemyMovementArray.includes("moveLeft")) {
            console.log("youre going the wrong way!!")
        };
    };
    if ((enemyLeftPos[0] > 373) && (enemyTopPos[0] > 360) && (enemyLeftPos[0] < 1510) && (enemyTopPos[0] < 622)) {
        console.log('GET OFF THE GRASS!!')
    }
}, 1)
   

//change the lap counter to a function that is executed when the positions change on the cars and has a parameter that specifies the car;

document.addEventListener('keydown', (e) => {
    if (e.code == 'KeyW' || e.code == 'KeyA' || e.code == 'KeyS' || e.code == 'KeyD') {
        operateCar(e.code, true)  
    };
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowUp' || e.code == 'ArrowLeft' || e.code == 'ArrowDown' || e.code == 'ArrowRight') {
        operateCar(e.code, false) 
    };
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Space') {
        console.log('Car: ', car.style.top, car.style.left)
        console.log('enemy: ', enemyCar.style.top, enemyCar.style.left)
    };
});

function changeCar(player) {
    if (player) {
        if (carMovementArray.includes("moveLeft")) {
            if (carMovementArray.includes("moveForward")) {
                document.getElementById('car').innerHTML = carSkin[4]
            } else if (carMovementArray.includes("moveBack")) {
                document.getElementById('car').innerHTML = carSkin[6]
            } else {
            document.getElementById('car').innerHTML = carSkin[3]
            };
        } else if (carMovementArray.includes("moveRight")) {
            if (carMovementArray.includes("moveForward")) {
                document.getElementById('car').innerHTML = carSkin[5]
            } else if (carMovementArray.includes("moveBack")) {
                document.getElementById('car').innerHTML = carSkin[7]
            } else {
            document.getElementById('car').innerHTML = carSkin[2]
            };
        } else if (carMovementArray.includes("moveForward")) {
            document.getElementById('car').innerHTML = carSkin[0]
        } else if (carMovementArray.includes("moveBack")) {
            document.getElementById('car').innerHTML = carSkin[1]
        } else {
            if (carTopPos[0] > 600) {
                document.getElementById('car').innerHTML = carSkin[0]
            } else {
                document.getElementById('car').innerHTML = carSkin[1]
            };
        };
    } else {
        if (enemyMovementArray.includes("moveLeft")) {
            if (enemyMovementArray.includes("moveForward")) {
                document.getElementById('enemyCar').innerHTML = enemySkin[4]
            } else if (enemyMovementArray.includes("moveBack")) {
                document.getElementById('enemyCar').innerHTML = enemySkin[6]
            } else {
            document.getElementById('enemyCar').innerHTML = enemySkin[3]
            };
        } else if (enemyMovementArray.includes("moveRight")) {
            if (enemyMovementArray.includes("moveForward")) {
                document.getElementById('enemyCar').innerHTML = enemySkin[5]
            } else if (enemyMovementArray.includes("moveBack")) {
                document.getElementById('enemyCar').innerHTML = enemySkin[7]
            } else {
            document.getElementById('enemyCar').innerHTML = enemySkin[2]
            };
        } else if (enemyMovementArray.includes("moveForward")) {
            document.getElementById('enemyCar').innerHTML = enemySkin[0]
        } else if (enemyMovementArray.includes("moveBack")) {
            document.getElementById('enemyCar').innerHTML = enemySkin[1]
        } else {
            if (enemyTopPos[0] > 600) {
                document.getElementById('enemyCar').innerHTML = enemySkin[0]
            } else {
                document.getElementById('enemyCar').innerHTML = enemySkin[1]
            };
        };
    }
    
};

function stopMoving(key, player) {
    if (player) {
       if (key == "KeyS") {
        if (carMovementArray.includes("moveBack")) {
            let carMoveBackIndex = carMovementArray.indexOf("moveBack");
            carMovementArray.splice(carMoveBackIndex, 1);
            clearInterval(carMoveBack[0]);
            carMoveBack.splice(0, 1);
            carMoveSpeed[2] = 0;
        };
        };
        if (key == "KeyW") {
            if (carMovementArray.includes("moveForward")) {
                let carMoveForwardIndex = carMovementArray.indexOf("moveForward");
                carMovementArray.splice(carMoveForwardIndex, 1);
                clearInterval(carMoveForward[0]);
                carMoveForward.splice(0, 1);
                carMoveSpeed[0] = 0;
            };
        };
        if (key == "KeyD") {
            if (carMovementArray.includes("moveRight")) {
                let carMoveRightIndex = carMovementArray.indexOf("moveRight");
                carMovementArray.splice(carMoveRightIndex, 1);
                clearInterval(carMoveRight[0]);
                carMoveRight.splice(0, 1);
                carMoveSpeed[3] = 0;
            };
        };
        if (key == "KeyA") {
            if (carMovementArray.includes("moveLeft")) {
                let carMoveLeftIndex = carMovementArray.indexOf("moveLeft");
                carMovementArray.splice(carMoveLeftIndex, 1);
                clearInterval(carMoveLeft[0]);
                carMoveLeft.splice(0, 1);
                carMoveSpeed[1] = 0;
            };
        }; 
    } else {
        if (key == "ArrowDown") {
            if (enemyMovementArray.includes("moveBack")) {
                let enemyMoveBackIndex = enemyMovementArray.indexOf("moveBack");
                enemyMovementArray.splice(enemyMoveBackIndex, 1);
                clearInterval(enemyMoveBack[0]);
                enemyMoveBack.splice(0, 1);
                enemyMoveSpeed[2] = 0;
            };
            };
            if (key == "ArrowUp") {
                if (enemyMovementArray.includes("moveForward")) {
                    let enemyMoveForwardIndex = enemyMovementArray.indexOf("moveForward");
                    enemyMovementArray.splice(enemyMoveForwardIndex, 1);
                    clearInterval(enemyMoveForward[0]);
                    enemyMoveForward.splice(0, 1);
                    enemyMoveSpeed[0] = 0;
                };
            };
            if (key == "ArrowRight") {
                if (enemyMovementArray.includes("moveRight")) {
                    let enemyMoveRightIndex = enemyMovementArray.indexOf("moveRight");
                    enemyMovementArray.splice(enemyMoveRightIndex, 1);
                    clearInterval(enemyMoveRight[0]);
                    enemyMoveRight.splice(0, 1);
                    enemyMoveSpeed[3] = 0;
                };
            };
            if (key == "ArrowLeft") {
                if (enemyMovementArray.includes("moveLeft")) {
                    let enemyMoveLeftIndex = enemyMovementArray.indexOf("moveLeft");
                    enemyMovementArray.splice(enemyMoveLeftIndex, 1);
                    clearInterval(enemyMoveLeft[0]);
                    enemyMoveLeft.splice(0, 1);
                    enemyMoveSpeed[1] = 0;
                };
            }; 
    }
    
}

document.addEventListener('keyup', (e) => {
    if (e.code == 'KeyW' || e.code == 'KeyA' || e.code == 'KeyS' || e.code == 'KeyD') {
        stopMoving(e.code, true)  
    };
});

document.addEventListener('keyup', (e) => {
    if (e.code == 'ArrowUp' || e.code == 'ArrowLeft' || e.code == 'ArrowDown' || e.code == 'ArrowRight') {
        stopMoving(e.code, false) 
    };
});

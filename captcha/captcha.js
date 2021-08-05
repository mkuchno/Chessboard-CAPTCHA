
function initCaptcha(){

    Array.from(document.getElementsByClassName("captcha-release")).forEach((btn) => {

        btn.addEventListener("click", openCaptcha);
    });

    var prevPosition = [];

    var hiddenItems = [];
    var displayInfo = [];

    var horSet = ["a", "b", "c", "d", "e", "f", "g", "h"];
    var verSet = [8, 7, 6, 5, 4, 3, 2, 1];

    var taskText = [];
    var refreshBtnClickCount = 0;

    var clickedBtn;

    function openCaptcha(){

        //save the user position and go to the top of the page
        prevPosition[0] = window.pageXOffset;
        prevPosition[1] = window.pageYOffset;
        window.scrollTo(0, 0);

        //hide everything on page before creating captcha
        Array.from(document.querySelectorAll("body > *")).forEach((el) => {

            hiddenItems.push(el);
            displayInfo.push(el.style.display);
                
            el.style.display = "none";
        });

        clickedBtn = this;
        this.classList.remove("captcha-false");
        this.classList.remove("captcha-true");
            
        var captcha = document.createElement("div");
        captcha.setAttribute("id", "captcha-window");

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(captcha);

        var logo = document.createElement("span");
        var logoText = document.createTextNode("Chessboard CAPTCHA");
        logo.appendChild(logoText);

        var desc = document.createElement("p");
        var descText = document.createTextNode("Kierując się oznaczeniami widocznej szachownicy, wybierz pole, którego współrzędne widoczne są na poniższej grafice.");
        desc.appendChild(descText);

        var closeBtn = document.createElement("button");
        closeBtn.setAttribute("id", "close-btn");
        var closeBtnText = document.createTextNode("Potwierdź");
        closeBtn.appendChild(closeBtnText);
        closeBtn.onclick = closeCaptcha;
        closeBtn.classList.add("inactive-btn");

        var refreshBtn = document.createElement("button");
        refreshBtn.setAttribute("id", "refresh-btn");
        var refreshBtnText = document.createTextNode("Nowe wyzwanie (2)");
        refreshBtn.appendChild(refreshBtnText);
        refreshBtn.onclick = newCaptcha;

        captcha.appendChild(logo);
        captcha.appendChild(desc);
        captcha.appendChild(closeBtn);
        captcha.appendChild(refreshBtn);
        captcha.appendChild(createChessboard());
        captcha.appendChild(createTask());
    }

    function createChessboard(){

        var chessboardWindow = document.createElement("div");
        chessboardWindow.setAttribute("id", "chessboard-window");

        var chessboard = document.createElement("table");
        chessboard.setAttribute("id", "chessboard");

        for(var i = 0; i < 8; i++){

            var row = chessboard.insertRow();

            for(var j = 0; j < 8; j++){

                var cell = row.insertCell();

                var icon = document.createElement("i");
                cell.appendChild(icon);
                
                cell.onclick = function(){

                    document.querySelector("#captcha-window #close-btn").classList.remove("inactive-btn");

                    Array.from(chessboard.getElementsByTagName("td")).forEach((el) => {

                        el.firstElementChild.classList.remove("fa");
                        el.firstElementChild.classList.remove("fa-map-marker");
                    });

                    this.firstElementChild.classList.add("fa");
                    this.firstElementChild.classList.add("fa-map-marker");
                }
            }
        }

        horSet = shuffle(horSet);
        verSet = shuffle(verSet);

        var horPos = document.createElement("table");
        horPos.setAttribute("id", "cor-hor");

        var verPos = document.createElement("table");
        verPos.setAttribute("id", "cor-ver");

        var horPosRow = horPos.insertRow();

        for(var i = 0; i < 8; i++){

            var horPosCell = horPosRow.insertCell();
            horPosCell.innerHTML = horSet[i];

            var verPosRow = verPos.insertRow();
            var verPosCell = verPosRow.insertCell();
            verPosCell.innerHTML = verSet[i];
        }

        chessboardWindow.appendChild(chessboard);
        chessboardWindow.appendChild(horPos);
        chessboardWindow.appendChild(verPos);

        return chessboardWindow;
    }

    function createTask(){

        taskText = horSet[randomNumber(0,8)] + "" +  verSet[randomNumber(0,8)];

        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", "captcha-task");

        var height = canvas.height;
        var width = canvas.width;

        var ctx = canvas.getContext("2d");
        
        ctx.fillStyle = "#ffffe6";
        ctx.fillRect(0, 0, width, height);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "italic bold 60px Georgia";
        ctx.fillStyle = "#267326";

        ctx.save();

        ctx.translate(width/2, height/2);
        ctx.rotate((Math.PI/180) * (randomNumber(0,30)));
        ctx.translate(-width/2, -height/2);

        ctx.fillText(taskText[0], width/2 - 20, height/2);

        ctx.restore();
        
        ctx.save();

        ctx.translate(width/2, height/2);
        ctx.rotate((Math.PI/180) * (-randomNumber(0, 30)));
        ctx.translate(-width/2, -height/2);

        ctx.fillText(taskText[1], width/2 + 20, height/2);

        ctx.restore();

        ctx.strokeStyle = "#267326";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(randomNumber(0, width/4), randomNumber(0, height/4));
        ctx.quadraticCurveTo(randomNumber(width - width/4, width), randomNumber(height - height/4, height), randomNumber(width/2, width), randomNumber(height/2, height));
        ctx.stroke();

        return canvas;
    }

    //generate a new captcha task and shuffle the coordinates
    function newCaptcha(){

        refreshBtnClickCount++;

        if(!this.classList.contains("inactive-btn")){

            var captcha = document.getElementById("captcha-window");

            captcha.removeChild(document.getElementById("captcha-task"));
            captcha.appendChild(createTask());

            horSet = shuffle(horSet);
            verSet = shuffle(verSet);

            var horPos = document.getElementById("cor-hor").getElementsByTagName("td");
            var verPos = document.getElementById("cor-ver").getElementsByTagName("td");

            for(var i = 0; i < 8; i++){

                horPos[i].innerHTML = horSet[i];
                verPos[i].innerHTML = verSet[i];
            }

            if(refreshBtnClickCount == 2){

                this.classList.add("inactive-btn");
            }

            this.innerHTML = "Nowe wyzwanie (" + (2 - refreshBtnClickCount) + ")";
        }
    }

    //validate the captcha and display the message
    function closeCaptcha(){

        if(!this.classList.contains("inactive-btn")){

            var clickedPos = 0;
            var flag = false;

            Array.from(document.getElementById("captcha-window").getElementsByTagName("td")).forEach((el) => {

                if(el.firstElementChild != null && el.firstElementChild.classList.contains("fa-map-marker")){
                    
                    flag = true;
                }

                if(flag != true){

                    clickedPos++;
                }
            });

            if(taskText[0] == horSet[clickedPos % 8] && taskText[1] == verSet[Math.floor(clickedPos/8)]){

                genAlert("Dobre rozwiązanie!");
                clickedBtn.classList.add("captcha-true");
            }
            else{

                genAlert("Złe rozwiązanie!");
                clickedBtn.classList.add("captcha-false");
            }
        }
    }

    function genAlert(text){

        var captcha = document.getElementById("captcha-window");

        //disable interactions in captcha

        document.querySelector("#captcha-window #refresh-btn").classList.add("inactive-btn");
        document.querySelector("#captcha-window #close-btn").classList.add("inactive-btn");

        Array.from(document.getElementById("captcha-window").getElementsByTagName("td")).forEach((el) => {

            el.onclick = null;
        });

        //create message

        var alert = captcha.appendChild(document.createElement("div"));
        alert.setAttribute("id", "captcha-alert");

        var logo = document.createElement("span");
        logo.innerHTML = "Chessboard CAPTCHA";

        var alertText = document.createElement("p");
        alertText.innerHTML = text;

        alert.appendChild(logo);
        alert.appendChild(alertText);

        var alertBtn = document.createElement("button");
        alertBtn.innerHTML = "Zamknij";

        //close the captcha, reset the variables and go back to the page view
        alertBtn.onclick = function(){

            document.getElementsByTagName("body")[0].removeChild(document.getElementById("captcha-window"));
            refreshBtnClickCount = 0;

            for(var i = 0; i < hiddenItems.length; i++){

                hiddenItems[i].style.display = displayInfo[i];
            }

            window.scrollTo(prevPosition[0], prevPosition[1]);

            hiddenItems = [];
            displayInfo = [];
        }

        alert.appendChild(alertBtn);
    }

    function shuffle(set) {

        var random;
        var tmp;

        for(var i = 0; i < set.length; i++){

            random = Math.floor(Math.random() * set.length);

            tmp = set[i];
            set[i] = set[random];
            set[random] = tmp;
        }

        return set;
    }

    function randomNumber(start, stop){

        var number = Math.floor(Math.random() * (stop - start) + start);

        return number;
    }
}

window.addEventListener("load", initCaptcha);
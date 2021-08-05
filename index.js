
function initPage(){

    Array.from(document.getElementsByClassName("captcha-release")).forEach((btn) => {

        btn.addEventListener("click", startTime);
        btn.addEventListener("click", changeTheme);
    });

    var times = [];
    var captchaDone = 0;

    function startTime(){

        times.push(new Date().getTime() / 1000);

        var closeBtn = document.querySelector("#captcha-window #close-btn");
        closeBtn.addEventListener("click", endTime);
    }

    function endTime(){

        times[times.length - 1] = (new Date().getTime() / 1000) - times[times.length - 1];
    }

    //disable the button after running captcha
    function changeTheme(){

        captchaDone++;

        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-check");

        this.appendChild(icon);
        this.classList.add("inactive-btn");
        this.disabled = true;

        //enable the poll button after completing the three captcha challenges
        if(captchaDone == 3){

            var formBtn = document.getElementById("form-btn");
            formBtn.classList.remove("inactive-btn");
            formBtn.onclick = genForm;
        }
    }

    //generate survey link with data transfer and disable survey button
    function genForm(){

        var sumTime = times[0] + times[1] + times[2];
        var correctly = document.querySelectorAll("#page .captcha-true").length;

        sumTime = Math.round(sumTime * 1000) / 1000;
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSeY9yEl9BEkFnmWX_AGb7Z-RpH1xvpbxUK5vxgfJqJt7AynSw/viewform?usp=pp_url&entry.195367770=" + sumTime + " s" + "&entry.634961710=" + correctly + "/3");

        var icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-check");

        this.appendChild(icon);
        this.classList.add("inactive-btn");
        this.disabled = true;
    }
}

window.addEventListener("load", initPage);
// shoutout kristian og håvard
// username
let username = localStorage.getItem("userName"); 


// sjekk hvis du har inputet et brukernavn, hvis du har så blir den lagret
// hvis du ikke har, kommer prompt hver gang du laster inn siden
if(username === "null") {
    username = prompt("What is your username?");
    localStorage.setItem("userName", username)
}
if(!username) {
    username = prompt("What is your username?");
    localStorage.setItem("userName", username)
}

//setter inn brukernavn i HTML
document.getElementById("userName").innerHTML = "Username: " + username;
localStorage.setItem("userName", username);

// klokke
function showDate(){
    const today = new Date();
    let d = today.getDate();
    let mo = today.getMonth() + 1; // +1 because zero-index
    let y = today.getFullYear();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    s = checkTime(s);
    m = checkTime(m);
    mo = checkTime(mo);
    d = checkTime(d);
    h = checkTime(h);

    // insert 0 if clock < 10
    function checkTime(i){
        if (i < 10) {
            i = "0" + i
        };
        return i; 
    }    

    document.getElementById("dateBtn").innerHTML = d + "/" + mo + "/" + y + ", " + h + ":" + m + ":" + s;
    setInterval(showDate, 1000)
}
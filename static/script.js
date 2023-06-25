window.onload = function() {
    $(".main").fadeIn(1000);
    // f(web)
    $.ajax("/venkant/data.json").done(function(data) {
        let startDate = new Date(data.startDate);
        setTimeout(() => {
            $("#date").fadeTo(500, 0.0001);
            setTimeout(() => {
                $("#date").html(data.startDate);
            }, 700)
            setTimeout(() => {
                $("#date").fadeTo(500, 1)
            }, 1000)
        }, 10000)
        let currentDate = new Date();
        let last = 0;
        let print = "";
        let n = 1;
        data.currentChallenges.forEach(cha => {
            let days = cha.days;
            let elapsed = ((currentDate - startDate)/86400000) - last;
            if (currentDate > (startDate.getTime() + last*86400000)) {
                let perc = elapsed/days * 100;
                print += `<div id="c${n}" class="challenge">
            ${days} Days, ${cha.name}.<br>
            <div class="progress"><div class="bar" style="width:${perc}%; background-color: ${(perc > 100) ? 'var(--red);' : (perc < 10) ? 'var(--yellow);' : 'var(--green);'}"></div></div>
            <small>${Math.round(perc * 100)/100}% completed. (${Math.floor(elapsed)}/${days})</small>
            </div>`;
            } else {
                print += `<div id="c${n}" class="challenge">
            ${days} Days, ${cha.name}.<br>
            <div class="progress"><div class="bar" style="width:0%; background-color: var(--red);"></div></div>
            <small>Yet to start.</small>
            </div>`;
            }
            last += days; n++;
        })
        $(".challengelist").html(print)
        $("#c1").fadeIn(700);
        $("#c2").fadeIn(1200);
        $("#c3").fadeIn(1700);
        $(".video").fadeIn(2200);
        setInterval(function() {
            update(data.startDate)
        }, 1000)
        setInterval(function() {
            $("#c1").fadeTo(500, 0.05);
            $("#c2").fadeTo(700, 0.05);
            $("#c3").fadeTo(1000, 0.05);
            setTimeout(() => {
                $("#c1").fadeTo(500, 1);
                $("#c2").fadeTo(700, 1);
                $("#c3").fadeTo(1000, 1);
            }, 1000)
        }, 10000)
    });;
    // f(x)
    function update(date) {
        const d = new Date(date);
        let timestamp = new Date(Date.now() - d);
        const glue = {
            days: Math.floor((Date.now() - d)/84000000),
            hours: timestamp.getUTCHours(),
            mins: timestamp.getUTCMinutes(),
            secs: timestamp.getUTCSeconds()
        }
        let final = (glue.days < 10 ? "0" + glue.days : glue.days) + ":" + 
        (glue.hours < 10 ? "0" + glue.hours : glue.hours) + ":" +
        (glue.mins < 10 ? "0" + glue.mins : glue.mins) + ":" + 
        (glue.secs < 10 ? "0" + glue.secs : glue.secs);
        $("#clock").html(final);
    }
}
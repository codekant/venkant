window.onload = function() {
    $("#main").fadeIn(2000)
    setInterval(update, 1000);
    const date = "April 30, 2023";
    setTimeout(() => {
        $("#date").html(date);
    }, 1500)
    function update() {
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
        $("#squirt").html(final);
    }
    $.ajax("/venkant/logs.json").done(function(data) {
        const text = `<p class="messagedata" style="color:var(--b);">F: ${data.count.f.length} ~ WD: ${data.count.wd.length}<button id="logs">♻️</button></p>` + data.data.map(d => `<div class="message"><p class="author" style="margin-bottom:0;">${d.author} <span class="date">(${d.date})</span></p><p class="messagedata">${d.message}</p></div>`).join("<br>") + `<br><p style="color:var(--b);font-size:x-small;" class="messagedata">and more to be written...</p>`;
        const logs = data.count.f.map(a => `<div class="messagedata"><p class="message"><span class="author">[F]</span> ${a.split("-")[0]} logged on <span class="author">${a.split("-")[1]}</span></p></div>`) + data.count.wd.map(a => `<div class="messagedata"><p class="message"><span class="author">[WD]</span> ${a.split("-")[0]} logged on <span class="author">${a.split("-")[1]}</span></p></div>`)  + `<p style="color:var(--b);font-size:x-small;" class="messagedata">really don't want more here.</p>`;
        $("#messagelist").html(text);
        $("#loglist").html(logs)
        $("#logs").on("click", () => {
            $("#loglist").fadeIn();
        })
    });
    $("#messages").on("click", () => {
        $("#messagelist").fadeIn();
    })
    $(".messagelist").on("click", () => {
        $("#messagelist").fadeOut();
    })
    $("#loglist").on("click", () => {
        $("#loglist").fadeOut();
        $("#messagelist").fadeIn();
    })
}

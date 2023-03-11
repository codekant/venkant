window.onload = function() {
    $("#main").fadeIn(500)
    setInterval(update, 1000);
    function update() {
        let timestamp = new Date(Date.now() - 1677954600000);
        const glue = {
            days: Math.floor((Date.now() - 1677954600000)/84000000),
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
        const text = `<p class="messagedata" style="color:#000;">F: ${data.count.f.length} ~ WD: ${data.count.wd.length}</p>` + data.data.map(d => `<div class="message"><p class="author" style="margin-bottom:0;">${d.author} <span class="date">(${d.date})</span></p><p class="messagedata">${d.message}</p></div>`).join("<br>") + `<br><p style="color:#000;" class="messagedata">and more to be written...</p>`
        $("#messagelist").html(text);
    });
    $("#messages").on("click", () => {
        $("#messagelist").fadeIn();
    })
    $(".messagelist").on("click", () => {
        $("#messagelist").fadeOut();
    })
}
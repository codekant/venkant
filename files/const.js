this.version = "168.192.1.1"
window.onload = function() {
    $("#main").fadeIn(2000)
    const loopa = setInterval(update, 1000); 
    const loopb = setInterval(message, 10000);
    const date = "June 24, 2023";
    const goal = "September 10, 2023";
    const loopc = setTimeout(() => {
        fadeupdate("Since " + date);
    }, 1500);
    let c = true;
    function message() {
        (c ? fadeupdate("Target " + goal) : fadeupdate("Since " + date))
        c = !c;
    }
    function fadeupdate(c) {
        $("#date").fadeTo(500, 0.0001);
        setTimeout(() => { 
            $("#date").html(c); 
        }, 550);
        setTimeout(() => {
            $("#date").fadeTo(500, 1)
        }, 800)
    }
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
    /* dep */
    let r = false;
    document.addEventListener("keydown", (re) => {
        if(r) return;
        if(re.code == "KeyW") epilepsy();
    });
    const colors = ["#F4D5D3", "#F5EDD5", "#A6B0EB", "#F8DAF9", "#F3F6F6", "#D2E7F2", "#FFFFFF"];
    function epilepsy() {
        r = true;
        $("#loglist").hide();
        $("#messagelist").hide();
        clearInterval(loopa);
        clearInterval(loopb);
        clearInterval(loopc);
        setInterval(() => {
            $(":root").css("--w", "black")
            $(":root").css("--b", colors[Math.floor(Math.random() * colors.length)])
            $(":root").css("--dw", "black")
        }, 100)
        setTimeout(() => {
            setInterval(() => {
                const rw = Math.floor(Math.random() * $(window).width()*2) - $(window).width();
                const rh = Math.floor(Math.random() * $(window).height()*2) - $(window).height();
                $('#main').prepend(`<div style='background-color:#000;height:2rem;width:2rem;margin-left:${rw};margin-top:${rh};position:fixed;z-index:105;'></div>`);
                const rw1 = Math.floor(Math.random() * $(window).width()*2) - $(window).width();
                const rh1 = Math.floor(Math.random() * $(window).height()*2) - $(window).height();
                $('#main').prepend(`<div style='background-color:#000;height:2rem;width:2rem;margin-left:${rw1};margin-top:${rh1};position:fixed;z-index:105;'></div>`);
                const rw2 = Math.floor(Math.random() * $(window).width()*2) - $(window).width();
                const rh2 = Math.floor(Math.random() * $(window).height()*2) - $(window).height();
                $('#main').prepend(`<div style='background-color:#000;height:2rem;width:2rem;margin-left:${rw2};margin-top:${rh2};position:fixed;z-index:105;'></div>`);
            }, 100)
        }, 2000)
        setTimeout(() => {
            $("#squirt").html("GOODNIGHT");
            $("#date").html("i told you not to.");
        }, 3000)
        setTimeout(() => {
            $("#main").hide();
            $("body").css("background-image", "url(files/tv-static.gif)") // codelink
        }, 10000)
        setTimeout(() => { location.reload() }, 12000);
    }
}

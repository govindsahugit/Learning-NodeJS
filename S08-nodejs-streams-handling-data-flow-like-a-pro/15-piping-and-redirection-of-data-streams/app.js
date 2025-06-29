// use wsl or linux

process.stdin.setEncoding("utf8")

process.stdin.on("data",(chunk)=>{
    console.log("app.js: ",chunk);
})
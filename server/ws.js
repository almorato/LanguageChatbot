const Frases = require("./models/Brain");
const Word = require("./brainapi");
const mainWord = require("./wordapi");

module.exports = io => {
  console.log("Socket io Ready");
  io.on("connection", function(socket) {
    console.log("a user connected");
    socket.on("chat-ready", m => {
      //console.log(m);
      console.log(m.mensaje);
      mainWord(m.mensaje.toLowerCase().trim())
      .then(res =>{
          if(res.length !=0){
            Word(res[0].text)
            .then(result => {
             console.log(result);
             socket.emit("chat", { status: "Mensaje recibido", mensaje: result.replace('***',res[0].text),isImage:false });
            })
            .catch(result => {
             console.log(result);
             socket.emit("chat", { status: "Mensaje recibido", mensaje: result,isImage:false });
            })
          }else{
            Word(m.mensaje.toLowerCase().trim())
            .then(result => {
             console.log(result);
             socket.emit("chat", { status: "Mensaje recibido", mensaje: result.replace('***',m.mensaje),isImage:false });
            })
            .catch(result => {
             console.log(result);
             socket.emit("chat", { status: "Mensaje recibido", mensaje: result,isImage:false });
            })
          }
      })
      //GAME
      .catch(e=>{
        if(m.mensaje.split(' ')[0]=='ris'){
          Word(m.mensaje.toLowerCase().trim())
              .then(result => {
              console.log(result);
              socket.emit("chat", { status: "Mensaje recibido", mensaje: result.replace('***',m.mensaje),isImage:false });
          })
        }
        if(m.mensaje=='play'){
            Word(m.mensaje.toLowerCase().trim())
              .then(result => {
              console.log(result);
              socket.emit("chat", { status: "Mensaje recibido", mensaje: result.replace('***',m.mensaje),isImage:true });
          })
        }
        else{
        Word(m.mensaje.toLowerCase().trim())
        .then(result => {
         console.log(result);
         socket.emit("chat", { status: "Mensaje recibido", mensaje: result.replace('***',m.mensaje),isImage:false });
        })
        .catch(result => {
         console.log(result);
         socket.emit("chat", { status: "Mensaje recibido", mensaje: result,isImage:false });
        })
        }
      })
    });
  });
};

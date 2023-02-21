import mongoose from "mongoose";
import myHttpServer from "./services/server.js";

//Servidor Escuchando//
const PORT = process.env.PORT || 8080;
myHttpServer.listen(PORT, () => console.log("server listening on port", PORT));

//conectamos a la base de datos//
mongoose.connect('mongodb+srv://ecommerce:coderhouse@cluster0.xc7i2xr.mongodb.net/ecommerce?retryWrites=true&w=majority', (error)=>{
    if(error){
        console.log("cannot connect to database"+error)
        process.exit()
    }
})

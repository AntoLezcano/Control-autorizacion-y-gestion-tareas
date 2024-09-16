import { app } from "./app.js";
import { ConexionMDB } from "./db/DataBase.js";

//configuracion
app.set("port", process.env.PORT || 4000);

//servidor
ConexionMDB();

//servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});

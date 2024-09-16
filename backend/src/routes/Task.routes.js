import { Router } from "express";

import {
  getTarea,
  getTareaid,
  CrearTarea,
  EliminarTarea,
  EditarTarea,
} from "../controllers/tarea.controllers.js";
import { authRequired } from "../middleware/validations.token.js";

import { validateSchema } from "../middleware/validations.user.js";

import { tareaSchema } from "../Schema/tarea.Schema.js";

const routerTarea = Router();

routerTarea.get("/tarea", authRequired, getTarea);

routerTarea.get("/tarea/:id", authRequired, getTareaid);

routerTarea.post(
  "/tarea",
  authRequired,
  validateSchema(tareaSchema),
  CrearTarea
);

routerTarea.delete("/tarea/:id", authRequired, EliminarTarea);

routerTarea.put("/tarea/:id", authRequired, EditarTarea);

export { routerTarea };

import Tarea from "../models/tarea.models.js";

export const getTarea = async (req, res) => {
  try {
    const tareas = await Tarea.find({ User: req.user.id }).populate("User");
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const getTareaid = async (req, res) => {
  try {
    const tarea = await Tarea.findById(req.params.id).populate("User");
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

export const CrearTarea = async (req, res) => {
  try {
    const { nombre, descripcion, fecha } = req.body;
    const newTarea = new Tarea({
      nombre,
      descripcion,
      fecha,
      User: req.user.id,
    });
    const tareaSaved = await newTarea.save();
    res.status(201).json(tareaSaved);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const EliminarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndDelete(req.params.id);
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

export const EditarTarea = async (req, res) => {
  try {
    const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

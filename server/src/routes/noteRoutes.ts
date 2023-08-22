import { Router } from "express";
import * as NoteController from "../controllers/noteController";
const router = Router();

router.route("/").get(NoteController.getAllNotes);
router.route("/insert").post(NoteController.insertNote);
router
  .route("/:id")
  .get(NoteController.getNote)
  .post(NoteController.setCompleted)
  .put(NoteController.updateNote)
  .delete(NoteController.deleteNote);

export default router;

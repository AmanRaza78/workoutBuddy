import { Router } from "express";
import {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workout.controllers.js";

const workoutRouter = Router();

workoutRouter.get("/", getWorkouts);

workoutRouter.post("/", createWorkout);

workoutRouter.get("/:id", getWorkoutById);

workoutRouter.patch("/:id", updateWorkout);

workoutRouter.delete("/:id", deleteWorkout);

export default workoutRouter;


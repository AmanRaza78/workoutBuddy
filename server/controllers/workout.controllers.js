import { Workout } from "../models/workout.models.js";
import mongoose from "mongoose";

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id is not valid" });
  }

  const workoutById = await Workout.findById(id);

  if (!workoutById) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).json(workoutById);
};

export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id is not valid" });
  }

  const updatedWorkout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updatedWorkout) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).json(updatedWorkout);
};

export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Id is not valid" });
  }

  const deletedWorkout = await Workout.findOneAndDelete({ _id: id });

  if (!deletedWorkout) {
    return res.status(400).json({ error: "Not Found" });
  }

  res.status(200).json(deletedWorkout);
};

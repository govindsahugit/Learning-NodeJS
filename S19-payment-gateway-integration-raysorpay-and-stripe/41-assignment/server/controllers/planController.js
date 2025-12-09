import Plan from "../models/planModel.js";
import { planSchema } from "../validator/planSchema.js";

export const createPlan = async (req, res, next) => {
  const { success, data, error } = planSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { name, amount, storage, planId } = data;

  try {
    await Plan.insertOne({
      name,
      amount,
      storage,
      planId,
    });

    return res.status(201).json({
      message: "Plan created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getaAllPlanData = async (req, res, next) => {
  try {
    const plans = await Plan.find().lean().sort({ amount: 1 });
    return res.status(200).json({
      plans,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePlan = async (req, res, next) => {
  const { id } = req.params;

  const { success, data, error } = planSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { name, amount, storage, planId } = data;

  try {
    const result = await Plan.findByIdAndUpdate(id, {
      name,
      amount,
      storage,
      planId,
    });

    if (!result)
      return res.json(404).json({
        error: "Plan not found!",
      });

    return res.status(204).json({
      message: "Plan updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Plan.findByIdAndDelete(id);

    if (!result)
      return res.json(404).json({
        error: "Plan not found!",
      });

    console.log(result);

    return res.status(204).json({
      message: "Plan deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

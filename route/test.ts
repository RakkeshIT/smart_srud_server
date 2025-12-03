import { Router, Request, Response } from "express";
const router = Router();
import Test from "../models/test";
router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "Test route is working!" });
});

router.post("/test/create", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ message: "`name` is required" });
    }

    const newTest = new Test({ name });
    const saved = await newTest.save();

    return res
      .status(201)
      .json({ message: "Test created successfully", data: saved });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

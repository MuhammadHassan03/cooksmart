import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const scanFridge = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageBuffer = fs.readFileSync(req.file.path);
  const base64Image = imageBuffer.toString("base64");

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: 'application/json',
    }
  
  });

  const prompt = `
  Instruction: You are a professional kitchen inventory assistant. 
  Task: Analyze the image and identify all food items along with their estimated quantities or states.

  Guidelines:
  1. Validation: If the image is not related to food, a fridge, or a pantry, return an empty array [].
  2. Data Structure: Return ONLY a JSON array of objects with the following keys:
     - "item": The name of the ingredient (e.g., "Milk").
     - "quantity": The estimated amount or status (e.g., "Half carton", "3", "Full bottle", "Small piece").
  3. Logic: If quantity is not clearly visible, use "Some" or "1 unit" as a placeholder.
  4. Formatting: No markdown, no extra text. ONLY the JSON array.

  Example Output: 
  [
    {"item": "Milk", "quantity": "Half bottle"},
    {"item": "Eggs", "quantity": "6"},
    {"item": "Spinach", "quantity": "1 bunch"}
  ]
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Image,
        mimeType: req.file.mimetype,
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();

  const cleanJson = text.replace(/```json|```/g, "").trim();

  const items = JSON.parse(cleanJson);
  fs.unlinkSync(req.file.path);
  return res.status(200).json({
    success: true,
    items: items,
  });
};

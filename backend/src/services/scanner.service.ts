import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const scanFridge = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
  Instruction: You are a professional kitchen inventory assistant. 
  Task: Analyze the image and identify all food items. Provide metadata for each item to help with food waste reduction. [cite: 3, 4, 21]

  Guidelines:
  1. Data Structure: Return ONLY a JSON array of objects with these keys:
     - "name": Standardized ingredient name (e.g., "Full Cream Milk"). [cite: 23]
     - "quantity": Estimated numeric amount (e.g., "500" or "3"). [cite: 29]
     - "unit": (e.g., "ml", "g", "units", "liters", "packs"). [cite: 27]
     - "category": One of: "Vegetables", "Dairy", "Grains", "Meat", "Fruit", "Bakery", "Beverages", "Spices". 
     - "confidence_score": (0.1 to 1.0) How sure are you about this item?
     - "estimated_shelf_life": Based on food safety, how many days from today will this item typically last? (Return an integer, e.g., 7). [cite: 33]

  2. Logic: If an item is not 100% clear, use your best judgment based on typical fridge contents. [cite: 21]
  3. Formatting: No markdown, no extra text. ONLY the JSON array. [cite: 23]

  Example Output: 
  [
    {
      "name": "Greek Yogurt",
      "quantity": "1",
      "unit": "tub",
      "category": "Dairy",
      "confidence_score": 0.95,
      "estimated_shelf_life": 10
    }
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
  } catch (error) {
    console.log("Error in Scanning Fridge", error);
  }
};

import { Request, Response } from "express";
import path from "path";
import { exec } from "child_process";
import fs from "fs";

export const scanFridge = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imagePath = path.resolve(req.file.path);
  const scriptPath = path.resolve("src/utils/helpers/ai/scan.py");

  // Save detection output to temp file
  const outputJsonPath = path.resolve(`temp-${Date.now()}.json`);

  exec(`python "${scriptPath}" "${imagePath}" "${outputJsonPath}"`, (err, _stdout, stderr) => {
    if (err) {
      console.error("Python error:", stderr);
      return res.status(500).json({ error: "Detection failed" });
    }

    // Read clean JSON from file
    fs.readFile(outputJsonPath, "utf8", (readErr, data) => {
      if (readErr) {
        console.error("Failed to read output file:", readErr);
        return res.status(500).json({ error: "Could not read detection result" });
      }

      try {
        const result = JSON.parse(data);
        console.log('result', result)
        res.status(200).json({
          message: "Detection complete",
          items: result,
          imagePath,
        });

        // Optional: clean up temp file
        fs.unlink(outputJsonPath, () => {});
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        res.status(500).json({ error: "Failed to parse detection result" });
      }
    });
  });
};

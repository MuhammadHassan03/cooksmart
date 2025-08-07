import sys
import json
from ultralytics import YOLO

# Get CLI arguments
image_path = sys.argv[1]
output_path = sys.argv[2]

# Classes to ignore (not relevant inside a fridge)
IGNORE_CLASSES = {"refrigerator", "person", "microwave", "oven", "sink", "toaster", "chair", "couch", "bed", "tv", "remote"}

# Load YOLOv8 model
model = YOLO("yolov8n.pt")
results = model(image_path)

# Process results
items = {}
for r in results:
    for box in r.boxes:
        cls_name = r.names[int(box.cls[0])]
        if cls_name not in IGNORE_CLASSES:
            items[cls_name] = items.get(cls_name, 0) + 1

# Write results to JSON file
with open(output_path, "w") as f:
    json.dump(items, f, indent=2)

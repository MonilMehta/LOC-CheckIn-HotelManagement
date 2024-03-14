import cv2
import numpy as np
from keras.applications.xception import Xception
from keras.applications.xception import Xception
from keras.models import load_model
from ultralytics import YOLO
import pandas as pd
from collections import Counter

model = YOLO("yolov8s.pt")
base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
room_model = load_model('room.h5')
# Load class names
with open("coco.txt", "r") as f:
    class_list = f.read().split("\n")


def preprocess_image(image):
    # calculate from the training set
    channel_mean = np.array([110.73151039, 122.90935242, 136.82249855])
    channel_std = np.array([69.39734207, 67.48444001, 66.66808662])

    # normalize image
    image = image.astype('float32')
    for j in range(3):
        image[:, :, j] = (image[:, :, j] - channel_mean[j]) / channel_std[j]
    return image

def predict_single_image(image_path):
    # Load and preprocess the image
    image = cv2.imread(image_path)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    processed_image = preprocess_image(image.copy())
    processed_image = np.expand_dims(processed_image, axis=0)

    # Extract features using the base model
    features = base_model.predict(processed_image)

    # Make predictions using the room model
    prediction = room_model.predict(features)
    print(prediction)

    return image_rgb, prediction

def detect_objects_and_count(image_file):
    image = cv2.imdecode(np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    img = cv2.resize(image, (1020, 500))
    results = model.predict(img)
    a = results[0].boxes.data
    px = pd.DataFrame(a).astype("float")
    object_classes = []

    for index, row in px.iterrows():
        x1 = int(row[0])
        y1 = int(row[1])
        x2 = int(row[2])
        y2 = int(row[3])
        d = int(row[5])
        if d < len(class_list):  # Check if d is within the valid range
            obj_class = class_list[d]
            object_classes.append(obj_class)
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 2)
            cv2.putText(img, f'{obj_class}', (x2, y2), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 255), 2, cv2.LINE_AA)

    counter = Counter(object_classes)
    print("Object Count in Image:")
    for obj, count in counter.items():
        print(f"{obj}: {count}")

    return counter
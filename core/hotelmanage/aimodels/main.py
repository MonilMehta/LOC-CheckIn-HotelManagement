
import numpy as np
import matplotlib.pyplot as plt
import cv2 as cv
from keras.applications.xception import Xception
from keras.models import load_model

def preprocess_image(image):
    # calculate from the training set
    channel_mean = np.array([110.73151039, 122.90935242, 136.82249855])
    channel_std = np.array([69.39734207, 67.48444001, 66.66808662])

    # normalize image
    image = image.astype('float32')
    for j in range(3):
        image[:, :, j] = (image[:, :, j] - channel_mean[j]) / channel_std[j]

    return image

def predict_single_image(image_path, base_model, room_model):
    # Load and preprocess the image
    image = cv.imread(image_path)
    image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    processed_image = preprocess_image(image.copy())
    processed_image = np.expand_dims(processed_image, axis=0)

    # Extract features using the base model
    features = base_model.predict(processed_image)

    # Make predictions using the room model
    prediction = room_model.predict(features)

    return image_rgb, prediction

if __name__ == "__main__":
    # Load pre-trained models
    base_model = Xception(include_top=False, weights='imagenet', pooling='avg')
    print('ok1')
    room_model = load_model('core/hotelmanage/roomclassifier.h5')

    # Input image path
    image_path = "core\hotelmanage/aimodels/messy.jpeg"
    print('ok2')
    # Perform prediction
    image, prediction = predict_single_image(image_path, base_model, room_model)
    print('ok3')
    print(prediction[0][0])
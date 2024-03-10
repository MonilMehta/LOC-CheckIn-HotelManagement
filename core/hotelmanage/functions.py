from PIL import Image
import numpy as np
from pathlib import Path
import torch
from diffusers import StableDiffusionPipeline
from transformers import VisionEncoderDecoderModel, ViTImageProcessor, AutoTokenizer
from keras.preprocessing import image as keras_image
from keras.applications.vgg16 import VGG16
from sklearn.metrics.pairwise import cosine_similarity


# Define your configuration class
class CFG:
    device = "cuda"
    seed = 42
    generator = torch.Generator(device).manual_seed(seed)
    image_gen_steps = 35
    image_gen_model_id = "stabilityai/stable-diffusion-2"
    image_gen_size = (400, 400)
    image_gen_guidance_scale = 9
    prompt_gen_model_id = "gpt2"
    prompt_dataset_size = 6
    prompt_max_length = 12


# Initialize the Stable Diffusion model
image_gen_model = StableDiffusionPipeline.from_pretrained(
    CFG.image_gen_model_id, torch_dtype=torch.float16,
    revision="fp16", use_auth_token='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', guidance_scale=9
)
image_gen_model = image_gen_model.to(CFG.device)

# Initialize the VGG16 model
vgg16 = VGG16(weights='imagenet', include_top=False,
              pooling='max', input_shape=(224, 224, 3))
for model_layer in vgg16.layers:
    model_layer.trainable = False

# Initialize the ViT-GPT2 Image Captioning model
model = VisionEncoderDecoderModel.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
feature_extractor = ViTImageProcessor.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
tokenizer = AutoTokenizer.from_pretrained("nlpconnect/vit-gpt2-image-captioning")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

max_length = 16
num_beams = 4
gen_kwargs = {"max_length": max_length, "num_beams": num_beams}


# Define the function to generate image
def generate_image(prompt, model, save_path):
    image = model(
        prompt,
        num_inference_steps=CFG.image_gen_steps,
        generator=CFG.generator,
        guidance_scale=CFG.image_gen_guidance_scale
    ).images[0]
    image = image.resize(CFG.image_gen_size)
    image.save(save_path)


# Define the function to load image
def load_image(image_path):
    input_image = Image.open(image_path)
    resized_image = input_image.resize((224, 224))
    return resized_image


# Define the function to get image embeddings
def get_image_embeddings(object_image):
    image_array = np.expand_dims(keras_image.img_to_array(object_image), axis=0)
    image_embedding = vgg16.predict(image_array)
    return image_embedding


# Define the function to calculate similarity score
def get_similarity_score(first_image, second_image):
    first_image = load_image(first_image)
    second_image = load_image(second_image)
    first_image_vector = get_image_embeddings(first_image)
    second_image_vector = get_image_embeddings(second_image)
    similarity_score = cosine_similarity(first_image_vector, second_image_vector).reshape(1,)
    return similarity_score


# Define the function to perform image captioning
def predict_step(image_paths):
    images = []
    for image_path in image_paths:
        i_image = Image.open(image_path)
        if i_image.mode != "RGB":
            i_image = i_image.convert(mode="RGB")
        images.append(i_image)
    pixel_values = feature_extractor(images=images, return_tensors="pt").pixel_values
    pixel_values = pixel_values.to(device)
    output_ids = model.generate(pixel_values, **gen_kwargs)
    preds = tokenizer.batch_decode(output_ids, skip_special_tokens=True)
    preds = [pred.strip() for pred in preds]
    return preds

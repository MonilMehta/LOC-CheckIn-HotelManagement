##  Check In - A Hotel Management System
This repository contains the code for a comprehensive Hotel Management System designed to streamline hotel operations, specifically focusing on room cleanliness assessment, inventory management, and staff inspection scheduling. The system includes features for both administrators and staff members to effectively manage hotel resources and ensure high standards of service.

To create an interface for hotel management with the mentioned features, we can design a web application with both staff and admin interfaces. 
## Features

- Room Cleanliness Assessment:

Utilizes machine learning model called Xception which we trained on the given datset to assess the cleanliness of rooms, checking for factors such as bedsheet wrinkles, floor cleanliness, etc.

- Inventory Management:

Monitors inventory levels of amenities in each room, including towels, toiletries, and minibar items.
Alerts administrators when inventory levels fall below a specified threshold.

Generative AI for Ideal Room Images:

- Generates ideal room images using Generative AI.
Compares generated images with uploaded room photos to identify discrepancies.
Progress Reporting:

Generates detailed reports on inspections performed by staff.
Provides insights into cleanliness trends, inventory management, and identified issues.



## Technologies used

- Used machine learning models for image analysis, Generative AI for generating ideal room images, and  object detection algorithms for inventory check.
- Implement backend using Python with frameworks like Django.
- Utilize libraries such as OpenCV, TensorFlow, and PyTorch for image processing and AI functionalities.
- Store data in a SQLite for efficient data management.
- Ensure data security and user authentication mechanisms are in place.
- Frontend:React (UI not emphasized in this repository)

By implementing these features, the hotel management can streamline operations, improve cleanliness standards, and enhance guest satisfaction.
## Installation

1.Clone the repository:

```bash
  git clone https://github.com/MonilMehta/LOC-CheckIn-HotelManagement

```

2.Install dependencies:

```bash
cd core
Pip install -r requirements.txt
```
    
## Usage
1.run the server

```bash
cd core
python manage.py runserver
```

2.navigate to frontend directory and install dependencies


```bash
cd frontend
npm install
```

3.start the development server

```bash
npm run dev
```

## Screenshots

home page:

![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled1.png)
![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled.png)

sign up:

![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled2.png)

sign in:

![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled3.png)

staff dashboard:

![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled5.png)

uploading the image :
![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled6.png)
![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/Untitled7.png)


updates on staff dashboard:
![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/qd.png)

admin dashboard:
![App Screenshot](https://github.com/MonilMehta/LOC-CheckIn-HotelManagement/blob/main/photo/34.png)


## Contributing

Contributions are always welcome!😊
. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgements

- This project was inspired by the need for efficient hotel management systems in the hospitality industry.
- Special acknowledgment to the developers of the libraries and frameworks used in this project.


















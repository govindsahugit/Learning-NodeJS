# Introduction to MVC Architecture

MVC (Model-View-Controller) is a design pattern that helps in organizing code by separating concerns in a Node.js application. It divides the application into three main components:

## 🔹 Model

- Responsible for interacting with the database
- Retrieves, updates, or deletes data
- Represents the business logic

## 🔹 View

- Handles the UI (User Interface)
- Displays data to the user using server-side rendering
- **Note:** In modern backend development, especially with REST APIs, the View is often handled on the frontend (e.g., React, Angular), so this layer is usually not used in backend code

## 🔹 Controller

- Manages the application logic
- Handles incoming HTTP requests, interacts with Models, and returns the response (usually in JSON)

## Request-Response Flow in MVC

1. View (UI) sends a request (e.g., via a form or button click)
2. The Router receives the request and forwards it to the appropriate Controller
3. The Controller processes the request, interacts with the Model to fetch or modify data
4. The Controller then sends back the appropriate response

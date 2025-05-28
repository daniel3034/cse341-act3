# cse341 Project 2

## Overview
This project is a Node.js application built using Express. It serves as a template for developing RESTful APIs and includes a structured approach to organizing controllers, models, and routes.

## Project Structure
```
cse341-project2
├── src
│   ├── controllers        # Contains business logic for handling requests
│   ├── models             # Defines data models and database interactions
│   ├── routes             # Sets up application routes
│   └── app.js             # Entry point of the application
├── .gitignore             # Specifies files to be ignored by Git
├── package.json           # Configuration file for npm
└── README.md              # Documentation for the project
```

## Getting Started

### Prerequisites
- Node.js (version X.X.X)
- npm (version X.X.X)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd cse341-project2
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the application, run:
```
npm start
```
The application will be available at `http://localhost:3000`.

## Usage
- The API endpoints can be accessed using tools like Postman or curl.
- Refer to the routes defined in `src/routes/index.js` for available endpoints.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
# Next.js with Express.js Combined Code

This project combines Next.js, a React framework for frontend development, with Express.js for building a backend server. The project structure includes the `server` folder for the backend with an MVC (Model-View-Controller) architecture, and the `pages` folder for the frontend.

## Project Structure

- `server/`: This folder contains the backend code. It follows the MVC architecture, which is a common pattern for organizing server-side code.

  - `controllers/`: Controllers handle the application's logic and interact with models and views.

  - `models/`: Models define the structure of data and handle database interactions. This project uses MongoDB with Mongoose for data storage.

    - `userModel.js`: Example user model schema for MongoDB.

    ```javascript
    const mongoose = require("mongoose");

    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

    const User = mongoose.model("User", userSchema);

    module.exports = User;
    ```

  - `routes/`: Routes define the API endpoints and their corresponding controllers.

- `pages/`: This folder contains the frontend code. Next.js uses this folder to automatically create routes and render React components on the client side.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/shylesh128/Next.js-Express-MongoDB-Starter-Template.git
   cd <project-folder>

   pnpm install
   pnpm dev
   ```

2. .env file

```bash
PASSWORD=<your_generated_password>
DATABASE=mongodb+srv://username:<PASSWORD>@clustername.mo0ihyi.mongodb.net/?retryWrites=true&w=majority

```

0A14C853288078F89CCBD40C6EFC4EE431D6
shyleshprof@gmail.com
smtp.elasticemail.com
2525

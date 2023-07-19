# langchain

# Simple Node.js Scripts

This repository contains a collection of simple Node.js scripts that perform various tasks. These scripts are designed to be easy to run and understand, making them suitable for beginners or anyone looking to get started with Node.js scripting.

## Prerequisites

To run the scripts in this repository, you need to have the following software installed on your machine:

- Node.js (download and installation instructions can be found at https://nodejs.org/)

## How to Use

**1. Clone the Repository**

    https://github.com/ankuratudemy/langchain.git
    cd langchain

**2. Install Dependencies**

Navigate to the project's root directory and install the required dependencies using npm:


    npm install

**3. Run the Scripts**

Each script is located in its own file and can be executed using Node.js. To run a specific script, use the following command:

node cosmosNLQ.js

**4. Explore and Modify**

Feel free to explore the scripts in this repository. They are intended to be simple and easy to understand, making them suitable for learning purposes. You can modify and experiment with the scripts to see how different changes affect their behavior.

## List of Scripts

1. **cosmosNLQ.js**: A basic script which connects to Azure Cosmosdb colelction, fetches all data and save it to JSONL file locally. Then local JSONL file is read, cleansed, and embedded. 
    Embedddings are indexed in Pinecone vector store, which can be searched with search query. 

## Contribution

If you have any improvements or additional scripts that you would like to contribute, feel free to submit a pull request. We welcome contributions from the community!

## License

This project is licensed under the [MIT License](LICENSE), which means you can use, modify, and distribute the code as long as you retain the original license text.

---

We hope you find these simple Node.js scripts helpful and enjoyable! If you have any questions or encounter any issues, feel free to open an issue in the repository. Happy coding!

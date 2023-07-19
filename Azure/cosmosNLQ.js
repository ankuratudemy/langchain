require("dotenv").config();
const fs = require("fs");
const { CosmosClient } = require("@azure/cosmos");
const { JSONLinesLoader, JSONLoader } = require("langchain/document_loaders/fs/json");

const { PineconeClient } = require("@pinecone-database/pinecone");
const { Document } = require("langchain/document");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { VectorDBQAChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");

const key = process.env.AZURE_COSMOS_DB_KEY;
const endpoint = process.env.AZURE_COSMOS_DB_URL;
const containerId = process.env.AZURE_COSMOS_CONTAINER_ID;
const databaseId = process.env.AZURE_COSMOS_DB_ID;

// Establish a new instance of the CosmosClient to be used throughout this demo

// Get all items in collection:
async function getDataCollection() {
  const client = new CosmosClient({ endpoint, key });
  const container = await client.database(databaseId).container(containerId);
  const items = await container.items.readAll().fetchAll();
  return items;
}

async function convertJsonArrayToJsonl(jsonArray, outputFilePath) {
    const fileStream = fs.createWriteStream(outputFilePath);
  
    for (const element of jsonArray){
      const jsonLine = JSON.stringify({"element": JSON.stringify(element)});
      fileStream.write(jsonLine + '\n');
    };
  
    fileStream.end();
  }

//Write file to local folder
async function writeJsonToFile(data){
await convertJsonArrayToJsonl(data, "data/data.jsonl");
//await fs.writeFileSync("data/property.json", JSON.stringify(data));
}


async function start(){

    const data = await getDataCollection();

    await writeJsonToFile(data.resources)

    const loader = new JSONLinesLoader(
        "data/data.jsonl",
        "/element"
      );
      
    const docs = await loader.load();

    const client = new PineconeClient();
    await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENV,
    });
    const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME);

    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings({modelName: "text-embedding-ada-002"}), {
        pineconeIndex,
      });

    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings({modelName: "text-embedding-ada-002"}),
    { pineconeIndex }
    );

    /* Search the vector DB independently with meta filters */
    const results = await vectorStore.similaritySearch("<Your Search String>", 10);
    console.log(results);

}

start();



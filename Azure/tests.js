const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { LLMChain } = require("langchain/chains")

const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { SerpAPI } = require("langchain/tools");
const { Calculator } = require("langchain/tools/calculator");

const { OPENAI_API_KEY } = process.env;
//Test Connection
const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0.5 });
async function testOpenAIConnection(){
    const res = await model.call(
        "What would be a good company name a company that makes colorful socks?"
      );
      console.log(res);
}

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

async function testOpenAIPrompt(argv){
    const res = await prompt.format({ product: argv });
    console.log(res);
}

const chain = new LLMChain({ llm: model, prompt: prompt });
async function testLLMChain(argv){
    const res = await chain.call({ product: argv });
    console.log(res);
}

// Agents and Tools
const tools = [
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
    new Calculator(),
  ];

testOpenAIConnection();
testOpenAIPrompt("buns");
testLLMChain("buns");
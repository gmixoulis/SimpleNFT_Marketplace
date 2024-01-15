const fs = require("fs");
const { Configuration, OpenAIApi } = require("openai");

const { parseString } = require("xml2js");
// Step 4: Read the Draw.io XML file and convert it to JSON
const xmlData = fs.readFileSync("./abis/MetaU.xml", "utf-8");

parseString(xmlData, (err, result) => {
  if (err) {
    console.error("Error parsing XML:", err);
    return;
  }

  // The 'result' now contains the JSON representation of the Draw.io diagram
  const diagramJSON = result;

  // Step 5: Generate React code using ChatGPT
  const diagramTitle = "MyDiagram"; // Replace this with your diagram title
  const codeGenerationPrompt = `
    Convert the Draw.io diagram "${diagramTitle}" to a React component.
    The JSON representation of the diagram is as follows:
    ${JSON.stringify(diagramJSON, null, 2)}

    Please generate the corresponding React code.
  `;
  fs.writeFileSync("./abis/MetaU.txt", codeGenerationPrompt);

  const gptApiKey = "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"; // Replace this with your ChatGPT API key
  const configuration = new Configuration({
    apiKey: gptApiKey,
  });
  const openai = new OpenAIApi(configuration);

  // Function to fetch response from ChatGPT
  async function getChatGptResponse(prompt) {
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0,
    });
    return response.data;
  }

  // Call ChatGPT to generate React code based on the diagram JSON
  async function generateReactCode() {
    try {
      const generatedCode = await getChatGptResponse(codeGenerationPrompt);
      console.log(generatedCode);
      // Save the generated code to a file or use it as needed in your application
    } catch (error) {
      console.error("Error generating React code:", error);
    }
  }

  generateReactCode();
});

import openai from "./config/open-ai.js";
import readLineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the ChatBot"));
  console.log(colors.bold.green("You can start chatting"));

  let chatHistory = []; // Store conversations

  while (true) {
    const userInput = readLineSync.question(colors.yellow("You: "));

    try {
      // Construct message by iterating over the chat history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: "user", content: userInput });

      // Call the API with user input
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      // Get completion text
      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("My AI: ") + completionText);
        return;
      }
      console.log(colors.green("My AI: ") + completionText);

      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();

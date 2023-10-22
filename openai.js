
import { config } from "dotenv";
config();
import OpenAI from 'openai';
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey, // defaults to process.env["OPENAI_API_KEY"]
});

export default async (content) => {
  
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: content }],
    model: 'gpt-3.5-turbo',
  });
  return chatCompletion.choices[0].message.content
}

/*
async function main() {
  
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'hello' }],
    model: 'gpt-3.5-turbo',
  });
  
  console.log(completion.choices);
}
main();
*/

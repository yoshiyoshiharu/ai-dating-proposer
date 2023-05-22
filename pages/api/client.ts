export default async function handler(req, res) {
  const messages: Message[] = [
    {
      role: "user",
      content: "JSで`0.1+0.1+0.1`の実行結果を教えて",
    },
  ];

  const content = await chatCompletion(messages)
  console.log("Aaaa")
  console.log(content)
  res.status(200).json({ data: `${content?.content}` });
}

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export const chatCompletion = async (messages: Message[]): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
  });

  const apiKey = process.env.CHATGPT_API_KEY

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body,
  });
  const data = await res.json();
  const choice = 0;
  return data.choices[choice].message;
};

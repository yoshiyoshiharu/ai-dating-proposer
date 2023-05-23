export default async function handler(req, res) {
  const area = req.body.area

  const messages: Message[] = [
    {
      role: "user",
      content: messageFormat(area),
    },
  ];

  try {
    const content = await chatCompletion(messages)
    const parse_content = parseGPTResponse(content.content)
    res.status(200).json({ plans: parse_content });
  } catch (e) {
    alert(e)
  }
}

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

export const chatCompletion = async (messages: Message[]): Promise<Message> => {
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
  return data.choices[0].message;
};

export const parseGPTResponse = (gptResponse: string) => {
  const regex = /```json([\s\S]*?)```/gm
  const match = regex.exec(gptResponse)

  if (match === null || match?.[1] === null) {
    throw new Error("JSON content not found in the string")
  }
  const jsonData: object = JSON.parse(match[1])

  return jsonData
}

export const messageFormat = (area) => {
  return `
You are an excellent dating plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:

\`\`\`json
[
  {
   place: string, // title of the dating plan.
   description: string // description of the dating plan.
  },
  {
   place: string, // title of the dating plan.
   description: string // description of the dating plan.
  },
]
\`\`\`

NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Please do not include anything other than JSON in your answer.
* Response must be Japanese

${area} What ３ dating plan do you propose?
`
}

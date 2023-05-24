package openai

import (
	"context"
	"fmt"
	"os"
	"io"
	"errors"

	openai "github.com/sashabaranov/go-openai"
)

func messageFormat () string {
	return `
You are an excellent dating plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
"```json" +
`
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
` +
"```" +
`
NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Please do not include anything other than JSON in your answer.
* Response must be Japanese

Tokyo What ３ dating plan do you propose?
`
}

func FetchPlans() {
	c := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	ctx := context.Background()

	req := openai.ChatCompletionRequest{
		Model:     openai.GPT3Dot5Turbo,
		MaxTokens: 20,
		Messages: []openai.ChatCompletionMessage{
			{
				Role:    openai.ChatMessageRoleUser,
				Content: "Lorem ipsum",
			},
		},
		Stream: true,
	}
	stream, err := c.CreateChatCompletionStream(ctx, req)
	if err != nil {
		fmt.Printf("ChatCompletionStream error: %v\n", err)
		return
	}
	defer stream.Close()

	fmt.Printf("Stream response: ")
	for {
		response, err := stream.Recv()
		if errors.Is(err, io.EOF) {
			fmt.Println("\nStream finished")
			return
		}

		if err != nil {
			fmt.Printf("\nStream error: %v\n", err)
			return
		}

		fmt.Printf(response.Choices[0].Delta.Content)
	}
}

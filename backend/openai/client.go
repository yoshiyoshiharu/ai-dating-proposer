package client

import (
	"context"
	"fmt"
	"os"
	"regexp"
	"strings"
	"encoding/json"
	"errors"

	openai "github.com/sashabaranov/go-openai"
)

type Plan = struct {
	Place       string `json:"place"`
	Description string `json:"description"`
}

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

Tokyo What 3 dating plan do you propose?
`
}

func FetchPlans () ([]Plan, error) {
	message := messageFormat()

	res, err := executeApi(message)

	if err != nil {
		return nil, err
	}

	plans := parseResponse(res)

	if len(plans) == 0 {
		return nil, errors.New("No plans")
	}

	return plans, nil
}

func executeApi(message string) (string, error) {
	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: message,
				},
			},
		},
	)

	if err != nil {
		fmt.Printf("ChatCompletion error: %v\n", err)
		return "", err
	}

	return resp.Choices[0].Message.Content, nil
}

func parseResponse(res string) []Plan {
	reg, _ := regexp.Compile("```json" + `([\s\S]*?)` + "```")
	matched := reg.FindString(res)

	matched = strings.Replace(matched, "```json", "", 1)
	matched = strings.Replace(matched, "```", "", 1)

	var plans []Plan
	json.Unmarshal([]byte(matched), &plans)
	fmt.Printf("Plans : %+v", plans)
	return plans
}

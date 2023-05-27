package client

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"regexp"
	"strings"

	openai "github.com/sashabaranov/go-openai"
	plan "github.com/yoshiyoshiharu/ai-dating-proposer/plan"
)

func messageFormat() string {
	return `
You are an excellent dating plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
   place: string, // place name of the dating plan in Japanese.
  },
  {
   place: string, // place name of the dating plan in Japanese.
  },
]
` +
		"```" +
		`
NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Output only JSON, No description

Tokyo What 5 dating plan do you propose?
`
}

func FetchPlans() ([]*plan.Plan, error) {
	message := messageFormat()

	res, err := executeApi(message)

	if err != nil {
		return nil, err
	}

	plans := parseResponse(res)

	if len(plans) == 0 {
		return nil, errors.New("no plans")
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

func parseResponse(res string) []*plan.Plan {
	reg, _ := regexp.Compile("```json" + `([\s\S]*?)` + "```")
	matched := reg.FindString(res)

	matched = strings.Replace(matched, "```json", "", 1)
	matched = strings.Replace(matched, "```", "", 1)

	var plans []*plan.Plan
	json.Unmarshal([]byte(matched), &plans)

	return plans
}

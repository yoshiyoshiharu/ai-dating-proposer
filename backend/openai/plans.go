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

func messageFormat(area string) string {
	return `
You are an excellent date spot proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
   place: string, // place name of the data spot in Japanese.
  },
  {
   place: string, // place name of the data spot in Japanese.
  },
]
` +
		"```" +
		`
NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Output only JSON, No description
` +
		area +
		`
What 5 data spot do you propose?
`
}

func FetchPlans(area string) ([]*plan.Plan, error) {
	message := messageFormat(area)

	res, err := executeApi(message)

	if err != nil {
		return nil, err
	}

	plans := parseResponse(res)

	if len(plans) == 0 {
		return nil, errors.New("no plans")
	}

	for _, plan := range plans {
		plan.Area = area
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

	if err != nil || len(resp.Choices) == 0 {
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

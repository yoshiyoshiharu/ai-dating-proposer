package openai

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"regexp"

	openai "github.com/sashabaranov/go-openai"
	entity "github.com/yoshiyoshiharu/ai-dating-proposer/entity"
)

func planMessageFormat(spot string, area string) string {
	return `
You are an excellent couple dating plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
    "time": 9時,
    "plan": string
  },
  {
    "time": 12時,
    "plan": string
  },
  {
    "time": 15時,
    "plan": string
  },
  {
    "time": 18時,
    "plan": string
  },
  {
    "time": 21時,
    "plan": string
  }
]
` +
		"```" +
		`
NOTES:
* Output only JSON, no descriptions
* "plan" should be within 50 characters
` +
		`Please propose the one day date plan around` + spot + " in " + area
}

func FetchPlans(spot string, area string) ([]*entity.Plan, error) {
	message := planMessageFormat(spot, area)

	res, err := executePlanApi(message)

	if err != nil {
		return nil, err
	}

	plans := parsePlanResponse(res)

	if len(plans) == 0 {
		return nil, errors.New("no plans")
	}

	return plans, nil
}

func executePlanApi(message string) (string, error) {
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
		return "", err
	}

	fmt.Println(resp.Choices[0].Message.Content)
	return resp.Choices[0].Message.Content, nil
}

func parsePlanResponse(res string) []*entity.Plan {
	reg, _ := regexp.Compile(`\[([\s\S]*?)\]`)

	matched := reg.FindString(res)

	var plans []*entity.Plan
	json.Unmarshal([]byte(matched), &plans)

	return plans
}

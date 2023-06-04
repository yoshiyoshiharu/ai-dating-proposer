package openai

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"regexp"

	openai "github.com/sashabaranov/go-openai"
	entity "github.com/yoshiyoshiharu/ai-dating-proposer/entity"
)

func planMessageFormat(spot string) string {
	return `
You are an excellent couple dating plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
    time: 9時
    plan: string, // date plan title
    description: string // date plan detail in one sentence.
  },
  {
    time: 12時
    plan: string, // date plan title
    description: string // date plan detail in one sentence.
  },
  {
    time: 15時
    plan: string, // date plan title
    description: string // date plan detail in one sentence.
  },
  {
    time: 18時
    plan: string, // date plan title
    description: string // date plan detail in one sentence.
  },
  {
    time: 21時
    plan: string, // date plan title
    description: string // date plan detail in one sentence.
  },
]
` +
		"```" +
		`
NOTES:
* Output only JSON` +
		"* Output start with ```json" +
		"* Output end with ````" +
		`Please propose the one day date plan around` + spot
}

func FetchPlans(area string) ([]*entity.Plan, error) {
	message := planMessageFormat(area)

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

	return resp.Choices[0].Message.Content, nil
}

func parsePlanResponse(res string) []*entity.Plan {
	reg, _ := regexp.Compile(`\[([\s\S]*?)\]`)

	matched := reg.FindString(res)

	var plans []*entity.Plan
	json.Unmarshal([]byte(matched), &plans)

	return plans
}

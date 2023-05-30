package openai

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"regexp"
	"strings"

	openai "github.com/sashabaranov/go-openai"
	entity "github.com/yoshiyoshiharu/ai-dating-proposer/entity"
)

func planMessageFormat(area string) string {
	return `
You are an excellent date plan proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
   place: string, // place name of the data plan in Japanese.
  },
  {
   place: string, // place name of the data plan in Japanese.
  },
]
` +
		"```" +
		`
NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Output only JSON, No description` +
		"What 5 data plan in" + area + "do you propose?"
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

	for _, plan := range plans {
		plan.Area = area
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
	reg, _ := regexp.Compile("```json" + `([\s\S]*?)` + "```")
	matched := reg.FindString(res)

	matched = strings.Replace(matched, "```json", "", 1)
	matched = strings.Replace(matched, "```", "", 1)

	var plans []*entity.Plan
	json.Unmarshal([]byte(matched), &plans)

	return plans
}
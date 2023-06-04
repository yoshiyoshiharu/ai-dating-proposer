package openai

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"regexp"
	"strings"

	openai "github.com/sashabaranov/go-openai"
	entity "github.com/yoshiyoshiharu/ai-dating-proposer/entity"
)

func spotMessageFormat(area string) string {
	return `
You are an excellent date spot proposer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
   place: string, // place name of the date spot in Japanese.
  },
  {
   place: string, // place name of the date spot in Japanese.
  },
]
` +
		"```" +
		`
NOTES:
* Do not include areas that do not exist.
* Please list only areas in Japan.
* Output only JSON, No description` +
		"What 5 date spot in" + area + "do you propose?"
}

func FetchSpots(area string) ([]*entity.Spot, error) {
	message := spotMessageFormat(area)

	res, err := executeSpotApi(message)

	if err != nil {
		return nil, err
	}

	spots := parseSpotResponse(res)

	if len(spots) == 0 {
		return nil, errors.New("no spots")
	}

	for _, spot := range spots {
		spot.Area = area
	}

	return spots, nil
}

func executeSpotApi(message string) (string, error) {
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

func parseSpotResponse(res string) []*entity.Spot {
	reg, _ := regexp.Compile("```json" + `([\s\S]*?)` + "```")
	matched := reg.FindString(res)

	matched = strings.Replace(matched, "```json", "", 1)
	matched = strings.Replace(matched, "```", "", 1)

	var spots []*entity.Spot
	json.Unmarshal([]byte(matched), &spots)

	return spots
}

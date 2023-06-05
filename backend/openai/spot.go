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

func spotMessageFormat(area string) string {
	return `
You are an excellent tourist spot introducer.

The output should be a markdown code snippet formatted in the following schema in Japanese:
` +
		"```json" +
		`
[
  {
   place: string // famous tourist spot name in Japanese.
  },
  {
   place: string // famous tourist spot name in Japanese.
  },
]
` +
		"```" +
		`
NOTES:
* Never include tourist spots that do not exist.
* Output only JSON` +
		"What 5 tourist spot in" + area + " do you introduce?"
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
	reg, _ := regexp.Compile(`\[([\s\S]*?)\]`)

	matched := reg.FindString(res)

	var spots []*entity.Spot
	json.Unmarshal([]byte(matched), &spots)

	return spots
}

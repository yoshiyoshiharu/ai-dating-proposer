package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	google_map "github.com/yoshiyoshiharu/ai-dating-proposer/google_map"
	openai "github.com/yoshiyoshiharu/ai-dating-proposer/openai"
)

func GetPlans(c *gin.Context) {
	resp, err := openai.FetchPlans()

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	// resp := []openai.Plan{
	// 	{
	// 		Place:       "渋谷",
	// 		Description: "渋谷で飲み会",
	// 	},
	// 	{
	// 		Place:       "新宿",
	// 		Description: "新宿で飲み会",
	// 	},
	// }

	c.IndentedJSON(http.StatusOK, resp)
}

func GetPlace(c *gin.Context) {
	google_map.FetchPlace()
}

func GetPlaceDetail(c *gin.Context) {
	google_map.FetchPlaceDetail()
}

func GetPlacePhoto(c *gin.Context) {
	bytes := google_map.FetchPhoto()

	c.Data(http.StatusOK, "image/jpeg", bytes)
}

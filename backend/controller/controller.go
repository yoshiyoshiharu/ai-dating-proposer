package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	google_map "github.com/yoshiyoshiharu/ai-dating-proposer/google_map"
	openai "github.com/yoshiyoshiharu/ai-dating-proposer/openai"
)

func GetPlans(c *gin.Context) {
	var err error

	plans, err := openai.FetchPlans()
	// plans := []*plan.Plan{
	// 	{
	// 		Place:       "東京タワー",
	// 	},
	// 	{
	// 		Place:       "東京スカイツリー",
	// 	},
	// }

	for _, plan := range plans {
		err = plan.FetchPhotoReferencesFromPlace()
	}

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	c.IndentedJSON(http.StatusOK, plans)
}

func GetPhoto(c *gin.Context) {
	photoReference := c.Query("photo_reference")

	bytes, err := google_map.FetchPhoto(photoReference)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	c.Data(http.StatusOK, "image/jpeg", bytes)
}

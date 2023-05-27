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

	c.IndentedJSON(http.StatusOK, resp)
}

func GetPlace(c *gin.Context) {
	id := google_map.FetchPlaceID()

	c.IndentedJSON(http.StatusOK, id)
}

func GetPlacePhoto(c *gin.Context) {
	id := google_map.FetchPlaceID()
	photoReferences := google_map.FetchPlacePhotoReferences(id)
	bytes := google_map.FetchPhoto(photoReferences[1])

	c.Data(http.StatusOK, "image/jpeg", bytes)
}

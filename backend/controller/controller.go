package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/yoshiyoshiharu/ai-dating-proposer/bing"
	"github.com/yoshiyoshiharu/ai-dating-proposer/openai"
)

func GetPlans(c *gin.Context) {
	var err error

	area := c.Query("area")

	if area == "" {
		c.IndentedJSON(http.StatusBadRequest, "area is required")
		return
	}

	plans, err := openai.FetchPlans(area)

	if err != nil {
		fmt.Println(err)
		c.IndentedJSON(http.StatusInternalServerError, err)
		return
	}

	for _, plan := range plans {
		imageUrls, err := bing.SearchImages(plan.Place)
		if err != nil {
			fmt.Println(err)
			c.IndentedJSON(http.StatusInternalServerError, err)
			return
		}

		plan.ImageUrls = imageUrls
	}

	c.IndentedJSON(http.StatusOK, plans)
}

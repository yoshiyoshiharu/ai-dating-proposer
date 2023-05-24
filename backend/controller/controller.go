package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
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

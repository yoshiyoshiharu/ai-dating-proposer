package controller

import (
	"github.com/gin-gonic/gin"
)

func NewRouter() *gin.Engine {
	router := gin.Default()

	router.GET("/", GetPlans)
	router.GET("/place", GetPlace)
	router.GET("/place_photo", GetPlacePhoto)

	return router
}

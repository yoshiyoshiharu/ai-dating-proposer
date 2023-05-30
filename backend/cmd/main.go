package main

import (
	"github.com/yoshiyoshiharu/ai-dating-proposer/controller"
)

func main() {
	router := controller.NewRouter()
	router.Run()
}

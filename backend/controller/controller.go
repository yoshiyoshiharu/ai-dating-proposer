package controller

import (
	"fmt"
	"net/http"
	"os"

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
		var imageUrls []string

		if os.Getenv("ENV") == "development" {
			imageUrls = stubImageUrls()
		} else {
			imageUrls, err = bing.SearchImages(plan.Place)
		}

		if err != nil {
			fmt.Println(err)
			c.IndentedJSON(http.StatusInternalServerError, err)
			return
		}

		plan.ImageUrls = imageUrls
	}

	c.IndentedJSON(http.StatusOK, plans)
}

func stubImageUrls() []string {
	stubImageUrls := []string{
		"http://cdn.4travel.jp/img/tcs/t/tips/pict/src/154/396/src_15439606.jpg",
		"https://www.photolibrary.jp/mhd3/img699/450-20190520181004206910.jpg",
		"https://livedoor.blogimg.jp/sy912/imgs/d/8/d820a1e6.jpg",
		"https://anniversarys-mag.jp/img/p/pixta_31641056_M.jpg?w=730",
		"https://www.photolibrary.jp/mhd5/img693/450-20190504074714206910.jpg",
		"https://www.nomu.com/machikara/wp-content/uploads/2016/06/195820_06-01omotesandou_r.jpg",
		"https://livedoor.blogimg.jp/ouensitemasu/imgs/4/2/424d5621.jpg",
		"https://townphoto.net/tokyo/tco/tco411.jpg",
		"https://townphoto.net/tokyo/tco/tco401.jpg",
		"https://stat.ameba.jp/user_images/20200704/17/tokuyuhk/54/94/j/o1080108114784056670.jpg",
	}

	return stubImageUrls
}

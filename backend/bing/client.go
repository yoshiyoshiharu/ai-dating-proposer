package bing

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
)

type BingAnswer struct {
	Value []struct {
		ContentURL string `json:"contentUrl"`
	} `json:"value"`
}

func SearchImages(query string) ([]string, error) {
	maxImageSize := "10"

	endpoint := "https://api.bing.microsoft.com/v7.0/images/search?mkt=ja-JP&count=" + maxImageSize + "&q=" + url.QueryEscape(query)
	token := os.Getenv("BING_API_TOKEN")
	client := &http.Client{}

	req, err := http.NewRequest("GET", endpoint, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")
	req.Header.Set("Ocp-Apim-Subscription-Key", token)

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	resbody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	ans := new(BingAnswer)
	err = json.Unmarshal(resbody, &ans)
	if err != nil {
		return nil, err
	}

	var imageUrls []string
	for _, v := range ans.Value {
		imageUrls = append(imageUrls, v.ContentURL)
	}

	return imageUrls, nil
}

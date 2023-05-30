package entity

type Plan struct {
	Area        string   `json:"area"`
	Place       string   `json:"place"`
	Description string   `json:"description"`
	ImageUrls   []string `json:"image_urls"`
}

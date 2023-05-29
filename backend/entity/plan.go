package entity

import (
	"errors"

	google_map "github.com/yoshiyoshiharu/ai-dating-proposer/google_map"
)

type Plan struct {
	Area            string   `json:"area"`
	Place           string   `json:"place"`
	Description     string   `json:"description"`
	PhotoReferences []string `json:"photo_references"`
}

func (p *Plan) FetchPhotoReferencesFromPlace() error {
	if p.Place == "" {
		return errors.New("place is empty")
	}

	place_id, err := google_map.FetchPlaceID(p.Place + " " + p.Area)
	if err != nil {
		return err
	}

	if place_id != "" {
		photoReferences, err := google_map.FetchPlacePhotoReferences(place_id)
		if err != nil {
			return err
		}

		p.PhotoReferences = append(p.PhotoReferences, photoReferences...)
	}

	return nil
}

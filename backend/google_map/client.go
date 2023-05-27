package google_map

import (
	"bytes"
	"context"
	"image"
	"image/jpeg"
	"log"
	"os"

	"googlemaps.github.io/maps"
)

func FetchPlaceID(query string) (string, error) {
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		return "", err
	}
	r := &maps.TextSearchRequest{
		Query: query,
	}

	res, err := c.TextSearch(context.Background(), r)
	if err != nil {
		return "", err
	}

	return res.Results[0].PlaceID, nil
}

func FetchPlacePhotoReferences(placeID string) ([]string, error) {
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		return nil, err
	}

	r := &maps.PlaceDetailsRequest{
		PlaceID: placeID,
	}

	resp, err := client.PlaceDetails(context.Background(), r)
	if err != nil {
		return nil, err
	}

	var photoReferences []string

	for _, photo := range resp.Photos {
		photoReferences = append(photoReferences, photo.PhotoReference)
	}

	return photoReferences, nil
}

func FetchPhoto(photoReference string) []byte {
	client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	check(err)

	r := &maps.PlacePhotoRequest{
		PhotoReference: photoReference,
		MaxHeight:      1000,
		MaxWidth:       1000,
	}

	resp, err := client.PlacePhoto(context.Background(), r)
	check(err)

	image, err := resp.Image()
	check(err)

	bytes := imageToBytes(image)

	return bytes
}

func imageToBytes(image image.Image) []byte {
	buf := new(bytes.Buffer)
	err := jpeg.Encode(buf, image, nil)
	check(err)

	return buf.Bytes()
}

func check(err error) {
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}
}

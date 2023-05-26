package google_map

import (
	"context"
	"fmt"
	"image/jpeg"
	"image"
	"bytes"
	"log"
	"os"

	"googlemaps.github.io/maps"
)

func FetchPlace() {
    c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
    if err != nil {
        log.Fatalf("fatal error: %s", err)
    }
    r := &maps.TextSearchRequest{
        Query: "東京タワー",
    }

    res, err := c.TextSearch(context.Background(), r)
    if err != nil {
        log.Fatalf("fatal error: %s", err)
    }

		fmt.Println("aaa")
		fmt.Println(res)
}

func FetchPlaceDetail() {
  client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	r := &maps.PlaceDetailsRequest{
		PlaceID: "ChIJebf-6hmMGGARH8tTXnEen_Y",
	}

	resp, err := client.PlaceDetails(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	fmt.Println(resp)
}

func FetchPhoto() []byte {
  client, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	check(err)

	r := &maps.PlacePhotoRequest{
		PhotoReference: "AZose0m0Wawrjo-vbQqjgEcdRAC41M1izkkOBYkOO3BtzNH_KavGGIHnXcQnYLJaZ_Eh4ahTKa4kffXnnU5_RO43bQ4LMAY9JrS3SbZqhBt5q6-TlaCXscXQaMVjPoq8DwQZzJcyvhjjRbIzrEoEVC4sPaXq9j_V7Zz7OIwk9hTx2OVdkxxw",
		MaxHeight:      300,
		MaxWidth:       300,
	}

	resp, err := client.PlacePhoto(context.Background(), r)
	check(err)

	fmt.Println(resp)

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

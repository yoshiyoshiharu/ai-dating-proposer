package main

import (
	"fmt"
	"net/http"

	"github.com/yoshiyoshiharu/ai-dating-proposer/openai"
)

func main() {
	handler := http.HandlerFunc(func(rw http.ResponseWriter, req *http.Request) {
		var resp []byte
		if req.URL.Path == "/" {
			resp = []byte(`{"status": "ok"}`)
		} else {
			rw.WriteHeader(http.StatusNotFound)
			return
		}

		rw.Header().Set("Content-Type", "application/json")
		rw.Header().Set("Content-Length", fmt.Sprint(len(resp)))
		rw.Write(resp)
	})

	http.ListenAndServe(":8080", handler)
}

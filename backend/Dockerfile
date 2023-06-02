FROM golang:latest AS build-env

ENV CGO_ENABLED=0
ENV GOOS=linux
ENV GOARCH=amd64

WORKDIR /go/src/github.com/yoshiyoshiharu/ai-dating-proposer

COPY ./ .

RUN go build -o main .

# runtime image
FROM alpine:3.18.0
COPY --from=build-env /go/src/github.com/yoshiyoshiharu/ai-dating-proposer/main /main
RUN chmod +x /main

EXPOSE 8080

CMD ["/main"]

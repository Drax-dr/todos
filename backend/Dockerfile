# Build the Go app in a Golang image
FROM golang:1.20-alpine as builder

WORKDIR /app

# Copy go.mod and go.sum to handle dependencies
COPY go.mod go.sum ./
RUN go mod tidy

# Copy the Go source code
COPY . .

# Build the Go app statically
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -o backend .

# Use a minimal base image for the Go binary
FROM scratch

# Copy the statically linked binary from the builder
COPY --from=builder /app/backend /backend

# Expose port 8080
EXPOSE 8080

# Command to run the Go app
CMD ["/backend"]

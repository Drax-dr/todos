package main

import (
	"encoding/json"
	"net/http"
)

type Todo struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

// Middleware to enable CORS
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Allow requests from any origin
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Allow specific headers and methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		// Handle preflight request
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	// Define the /todos endpoint
	http.Handle("/todos", enableCORS(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		todos := []Todo{
			{ID: 1, Title: "Learn Go", Completed: true},
			{ID: 2, Title: "Build an API", Completed: false},
			{ID: 3, Title: "Integrate with SolidJS", Completed: false},
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(todos)
	})))

	// Start the server
	http.ListenAndServe(":8080", nil)
}

package main

func main() {
	// Run scraper once at start
	StoredData = ScrapeQuotes()

	StartCron()

	r := SetupRouter()

	println("Server running on http://localhost:8080")
	r.Run(":8080")
}
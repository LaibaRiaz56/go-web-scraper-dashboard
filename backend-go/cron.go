package main

import (
	"github.com/robfig/cron/v3"
)

var StoredData []Quote

func StartCron() {
	c := cron.New()

	// Runs every 10 seconds
	c.AddFunc("*/10 * * * * *", func() {
		println("Scraping data...")
		StoredData = ScrapeQuotes()
	})

	c.Start()
}
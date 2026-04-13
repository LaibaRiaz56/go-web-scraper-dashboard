package main

import (
	"github.com/gocolly/colly"
)

type Quote struct {
	Text   string `json:"text"`
	Author string `json:"author"`
}

func ScrapeQuotes() []Quote {
	var quotes []Quote

	c := colly.NewCollector()

	c.OnHTML(".quote", func(e *colly.HTMLElement) {
		quote := Quote{
			Text:   e.ChildText(".text"),
			Author: e.ChildText(".author"),
		}
		quotes = append(quotes, quote)
	})

	c.Visit("http://quotes.toscrape.com/")

	if len(quotes) > 10 {
		return quotes[:10]
	}

	return quotes
}
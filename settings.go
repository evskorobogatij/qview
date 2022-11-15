package main

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

type Settings struct {
	Url string `json:"url" yaml:"url"`
	Ssh string `json:"ssh" yaml:"ssh"`
	Vnc string `json:"vnc" yaml:"vnc"`
}

type SettingsLoader struct {
}

func loadConfig() *Settings {
	yfile, err := os.Open("config.yaml")
	if err != nil {
		log.Fatalln(err)
	}
	defer yfile.Close()

	settings := &Settings{}

	decoder := yaml.NewDecoder(yfile)

	if err := decoder.Decode(&settings); err != nil {
		log.Fatalln(err)
	}

	return settings

}

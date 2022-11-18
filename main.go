package main

import (
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	settings := loadConfig()
	fmt.Printf("DATA URL IS %s \n", settings.Url)
	app.settings = settings

	computer := NewCmp()
	computer.settings = settings

	connections := &Connections{}
	connections.settings = settings

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Утилита удаленного подключения",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			&Settings{},
			computer,
			&ComputerItem{},
			connections,
			&Ports{},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

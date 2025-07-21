package main

import (
	"embed"
	"fmt"
	"os"

	"qviewapp/core/app"
	"qviewapp/core/computers"
	"qviewapp/core/connections"
	"qviewapp/core/consts"
	"qviewapp/core/settings"
	"qviewapp/core/traceroute"

	"github.com/spf13/viper"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure

	err := settings.LoadConfig()
	if err != nil {
		fmt.Printf("Error: %v", err)
		os.Exit(-1)
	}
	// settings := settings.LoadConfig()
	url := viper.GetString(consts.SETTING_URL)
	fmt.Printf("DATA URL IS %s \n", url)

	computer := computers.NewCmp()

	connections := &connections.Connections{}

	traceroute := &traceroute.Traceroute{}

	app := app.NewApp(computer, traceroute)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "Утилита удаленного подключения",
		Width:  1280,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
			computer,
			&computers.ComputerItem{},
			connections,
			traceroute,

			// &Ports{},
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}

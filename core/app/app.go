package app

import (
	"context"
	"qviewapp/core/computers"
	"qviewapp/core/consts"
	"qviewapp/core/traceroute"

	"github.com/spf13/viper"
)

// App struct
type App struct {
	ctx       context.Context
	computers *computers.Computer
	tracert   *traceroute.Traceroute
}

// NewApp creates a new App application struct
func NewApp(computers *computers.Computer, tracert *traceroute.Traceroute) *App {
	return &App{computers: computers, tracert: tracert}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.computers.SetContext(ctx)
	a.tracert.SetContext(ctx)
}

func (a *App) LoadDataUrl() string {
	return viper.GetString(consts.SETTING_URL)
}

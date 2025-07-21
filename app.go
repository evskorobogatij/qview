package main

import (
	"context"
)

// App struct
type App struct {
	ctx       context.Context
	settings  *Settings
	computers *Computer
	tracert   *Traceroute
}

// NewApp creates a new App application struct
func NewApp(computers *Computer) *App {
	return &App{computers: computers}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.computers.ctx = ctx
	a.tracert.ctx = ctx
}

func (a *App) LoadDataUrl() string {
	return a.settings.Url
}

package main

import (
	"fmt"
	"log"
	"os/exec"
)

type Connections struct {
	settings *Settings
}

func (conn *Connections) ConnectByVNC(host string) {
	fmt.Printf("CONNECT VNC TO: %s \n", host)
	cmd := exec.Command(conn.settings.Vnc, host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

func (conn *Connections) ConnectBySSH(host string) {
	fmt.Printf("CONNECT SSH TO: %s \n", host)
	cmd := exec.Command(conn.settings.Ssh, host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

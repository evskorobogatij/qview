package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
)

type Connections struct {
	settings *Settings
}

func (conn *Connections) ConnectByVNC(host string) {
	fmt.Printf("CONNECT VNC TO: %s \n", host)
	pwd, _ := os.Getwd()
	fmt.Printf("CONF %v \n %s \n", conn.settings, pwd)

	cmd := exec.Command(fmt.Sprintf("%s%s%s", pwd, string(os.PathSeparator), conn.settings.Vnc), host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

func (conn *Connections) ConnectBySSH(host string) {
	fmt.Printf("CONNECT SSH TO: %s \n", host)
	pwd, _ := os.Getwd()
	fmt.Printf("CONF %v \n %s \n", conn.settings, pwd)
	cmd := exec.Command(fmt.Sprintf("%s%s%s", pwd, string(os.PathSeparator), conn.settings.Ssh), host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

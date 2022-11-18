package main

import (
	"fmt"
	"log"
	"net"
	"time"
)

type Ports struct {
}

func (p *Ports) CheckVNC(ip string) bool {
	// timeout = time.Second
	conn, err := net.DialTimeout("tcp", net.JoinHostPort(ip, "5900"), time.Second*3)

	if err != nil {
		log.Println(err.Error())
		return false
	}

	if conn != nil {
		defer conn.Close()
		fmt.Println("OPEN", net.JoinHostPort(ip, "5900"))
		return true
	}

	return false

}

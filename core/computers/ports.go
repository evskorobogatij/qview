package computers

import (
	"net"
	"strconv"
	"strings"
	"time"
)

func IsIPv4(s string) bool {
	ip := net.ParseIP(s)
	return ip != nil && strings.Contains(s, ".")
}

func findIPv4(s string) []string {
	tmp := strings.Split(s, ", ")
	var t []string
	for _, v := range tmp {
		if IsIPv4(v) {
			t = append(t, v)
		}
	}
	return t
}

func checkPort(host string, port int) bool {
	var f bool
	conn, err := net.DialTimeout("tcp", net.JoinHostPort(host, strconv.Itoa(port)), time.Second*2)
	if err != nil {
		f = false
	}

	if conn != nil {
		defer conn.Close()
		f = true
	}
	return f
}

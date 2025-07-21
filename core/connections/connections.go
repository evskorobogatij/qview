package connections

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"qviewapp/core/consts"

	"github.com/spf13/viper"
)

type Connections struct {
}

func (conn *Connections) ConnectByVNC(host string) {
	fmt.Printf("CONNECT VNC TO: %s \n", host)
	pwd, _ := os.Getwd()
	// fmt.Printf("CONF %v \n %s \n", conn.settings, pwd)

	vnc := viper.GetString(consts.SETTING_VNC)
	cmd := exec.Command(fmt.Sprintf("%s%s%s", pwd, string(os.PathSeparator), vnc), host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

func (conn *Connections) ConnectBySSH(host string) {
	fmt.Printf("CONNECT SSH TO: %s \n", host)
	pwd, _ := os.Getwd()
	// fmt.Printf("CONF %v \n %s \n", conn.settings, pwd)

	ssh := viper.GetString(consts.SETTING_SSH)
	cmd := exec.Command(fmt.Sprintf("%s%s%s", pwd, string(os.PathSeparator), ssh), host)
	if err := cmd.Run(); err != nil {
		log.Println(err.Error())
	}
}

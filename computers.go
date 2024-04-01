package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type ComputerItem struct {
	Id           string `json:"id"`
	NodeName     string `json:"node_name"`
	Serialnamber string `json:"serialnumber"`
	Room         string `json:"room"`
	Manufacturer string `json:"manufacturer"`
	CpuModel     string `json:"cpu_model"`
	FioUser      string `json:"fio_user"`
	UserPhone    string `json:"user_phone"`
	Ip           string `json:"ip"`
	Mac          string `json:"mac"`
	Department   string `json:"department"`
	Type         string `json:"type"`
	Os           string `json:"os"`
	OsRelease    string `json:"osrelease"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
}

type Computer struct {
	settings  *Settings
	computers []ComputerItem
	ctx       context.Context
}

func NewCmp() *Computer {
	return &Computer{computers: []ComputerItem{}}
}

func (cmp *Computer) LoadComputers() {
	resp, err := http.Get(cmp.settings.Url)
	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
	}

	json.Unmarshal(body, &cmp.computers)
}

func (cmp *Computer) GetComputersList() []ComputerItem {
	return cmp.computers
}

type NodeStatus struct {
	ID        string `json:"id"`
	Available bool   `json:"available"`
}

func (cmp *Computer) CheckAllVNC() {
	fmt.Printf("CHECK ALL VNC\n")

	ch := make(chan struct{}, 200)

	for _, v := range cmp.computers {

		ch <- struct{}{}
		go func(info ComputerItem) {

			ips := findIPv4(info.Ip)
			available := false
			for _, ip := range ips {
				f := checkPort(ip, 5900)
				if f {
					available = true
					break
				}
			}
			if cmp.ctx != nil {
				runtime.EventsEmit(cmp.ctx, "sendVNCStatus", &NodeStatus{ID: info.Id, Available: available})
			}

			<-ch
		}(v)
	}
}

func (cmp *Computer) CheckAllSSH() {
	fmt.Printf("CHECK ALL SSH\n")

	ch := make(chan struct{}, 200)

	for _, v := range cmp.computers {

		ch <- struct{}{}
		go func(info ComputerItem) {

			ips := findIPv4(info.Ip)
			available := false
			for _, ip := range ips {
				f := checkPort(ip, 22)
				if f {
					available = true
					break
				}
			}
			if cmp.ctx != nil {
				runtime.EventsEmit(cmp.ctx, "sendSSHStatus", &NodeStatus{ID: info.Id, Available: available})
			}

			<-ch
		}(v)
	}
}

func (cmp *Computer) CheckVNC(id string) NodeStatus {
	var item ComputerItem
	for _, v := range cmp.computers {
		if v.Id == id {
			item = v
			break
		}
	}

	ips := findIPv4(item.Ip)
	available := false
	for _, ip := range ips {
		f := checkPort(ip, 5900)
		if f {
			available = true
			break
		}
	}

	return NodeStatus{ID: id, Available: available}
}

func (cmp *Computer) CheckSSH(id string) NodeStatus {
	var item ComputerItem
	for _, v := range cmp.computers {
		if v.Id == id {
			item = v
			break
		}
	}

	ips := findIPv4(item.Ip)
	available := false
	for _, ip := range ips {
		f := checkPort(ip, 22)
		if f {
			available = true
			break
		}
	}

	return NodeStatus{ID: id, Available: available}
}

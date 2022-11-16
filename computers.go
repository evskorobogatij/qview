package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
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
	settings *Settings
}

func NewCmp() *Computer {
	return &Computer{}
}

func (cmp *Computer) LoadComputers() []ComputerItem {
	resp, err := http.Get(cmp.settings.Url)
	if err != nil {
		log.Println(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err)
	}

	fmt.Println(string(body))

	computers := []ComputerItem{}
	json.Unmarshal(body, &computers)

	return computers

}

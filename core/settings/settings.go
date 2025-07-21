package settings

import (
	"log"

	"github.com/spf13/viper"
)

func LoadConfig() error {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			viper.SetDefault("url", "")
			viper.SetDefault("ssh", "")
			viper.SetDefault("vnc", "")

			err := viper.SafeWriteConfig()
			if err != nil {
				//panic(fmt.Errorf("fatal write config file: %w", err))
				return nil
			}
			// Config file not found; ignore error if desired
			log.Print("config opened")
			return nil
		} else {
			return err
		}
	}

	return nil
}

package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Welcome!\n")
}

func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	fmt.Fprintf(w, "Hello, %s!\n", ps.ByName("name"))
}

func ServerStatus(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	resp, err := http.Get("https://api.nwn.beamdog.net/v1/servers/206.189.112.64/5121")

	if err != nil {
		log.Fatal(err)
	}

	if resp.StatusCode == 404 {
		http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	} else {
		body, err := ioutil.ReadAll(resp.Body)

		if err != nil {
			log.Fatal(err)
		}

		bodyString := string(body)

		fmt.Fprintf(w, bodyString)
	}
}

func main() {
	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/hello/:name", Hello)
	router.GET("/server-status", ServerStatus)

	err := http.ListenAndServe(":9191", router)

	if err != nil {
		log.Fatal(err)
	}
}

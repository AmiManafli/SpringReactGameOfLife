package com.gameoflife.game;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UniverseController {
    private Test test;
    private UniverseModel universe;
    private int BOARD_HEIGHT = 30;
    private int BOARD_WIDTH = 40;

    @Autowired
    public UniverseController() {
        super();
        this.test = new Test(1);
        this.universe  = new UniverseModel(40, 30);
    }

    @GetMapping("/hello")
    String testString() {
        return "Hello!";
    }

    @GetMapping("/hellojson")
    JSONObject testJson() {
        JSONObject obj = new JSONObject();
        obj.put("name", "foo");
        return obj;
    }

    @GetMapping("/onedimarray")
    String testModel() {
        int[][] data = {{1, 2, 3}, {3, 4, 5}, {4, 5, 6}};
        Gson gson = new Gson();
        String json = gson.toJson(test.getTwoDimArr());
        return json;
    }

    @GetMapping(value = "/new-map"/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
    String testMap() {
        universe = new UniverseModel(BOARD_WIDTH, BOARD_HEIGHT);
        int[][] data = universe.getMap();
        Gson gson = new Gson();
        String json = gson.toJson(data);
        return json;
    }

    @GetMapping(value = "/next-gen"/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
    String nextGen() {
        universe.nextGeneration();
        int[][] data = universe.getMap();
        Gson gson = new Gson();
        String json = gson.toJson(data);
        return json;
    }


}
package com.gameoflife.game;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.google.gson.Gson;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UniverseController {
    private UniverseModel universe;
    private int boardHeight = 30;
    private int boardWidth = 40;

    @Autowired
    public UniverseController() {
        super();
        this.universe  = new UniverseModel(boardWidth, boardHeight);
    }


    @GetMapping(value = "/new-map"/*, produces = MediaType.APPLICATION_JSON_VALUE*/)
    String newMap() {
        universe = new UniverseModel(boardWidth, boardHeight);
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

    @PostMapping(path = "/set-board-size")
    void setBoardSize(@RequestBody String json) {
        JsonElement jsonTree = JsonParser.parseString(json);
        JsonObject jsonObject = jsonTree.getAsJsonObject();
        JsonElement height = jsonObject.get("height");
        JsonElement width = jsonObject.get("width");
        this.setBoardHeight(height.getAsInt());
        this.setBoardWidth(width.getAsInt());
    }

    @PostMapping(path ="/clear-map")
    void clearMap() {
        universe.clearMap();
        int[][] map = universe.getMap();
        for (int i = 0; i < boardHeight; i++) {
            for (int j = 0; j < boardWidth; j++) {
                System.out.println(map[i][j]);
            }
            System.out.println();
        }
    }

    void setBoardHeight(int newHeight) {
        this.boardHeight = newHeight;
    }

    void setBoardWidth(int newWidth) {
        this.boardWidth = newWidth;
    }

}
package com.gameoflife.game;
import java.util.Random;

public class UniverseModel {
    private int ALIVE = 1;
    private int DEAD = 0;
    private Random random = new Random();
    private int[][] map;
    private int width;
    private int height;

    public UniverseModel(int width, int height) {
        this.width = width;
        this.height = height;
        this.map = new int[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                if (random.nextBoolean()) {
                    map[i][j] = ALIVE;
                } else {
                    map[i][j] = DEAD;
                }
            }
        }
    }

    public int[][] getMap() {
        return map;
    }
}

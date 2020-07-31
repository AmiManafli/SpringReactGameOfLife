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


    public void nextGeneration() {
        var newGen = new int[height][width];
        int aliveNeighbours = 0;
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                aliveNeighbours = countAliveNeighbours(i, j);
                if (map[i][j] == ALIVE) {
                    newGen[i][j] = (aliveNeighbours < 2 || aliveNeighbours > 3) ? DEAD : ALIVE;
                } else if (map[i][j] == DEAD) {
                    newGen[i][j] = aliveNeighbours == 3 ? ALIVE : DEAD;
                }

//                if (newGen[i][j] == ALIVE) {
//                    countAlive++;
//                }
            }
        }
        map = newGen;
    }

    public int countAliveNeighbours(int i, int j) {
        int countAliveNeighbours = 0;
        for (int k = i - 1; k <= i + 1; k++) {
            for (int l = j - 1; l <= j + 1; l++) {
                if (k == i && l == j) continue;
                if (map[Math.floorMod(k, height)][Math.floorMod(l, width)] == ALIVE) {
                    countAliveNeighbours++;
                }
            }
        }
        return countAliveNeighbours;
    }
}

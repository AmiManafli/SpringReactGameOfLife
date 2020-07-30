package com.gameoflife.game;

import org.springframework.data.annotation.Id;

public class Test {
    @Id
    private int id;
    private int[] oneDimArr = {0, 1, 0, 0, 1};

    private int[][] twoDimArr = {{2, 2, 3}, {3, 4, 5}, {4, 5, 6}};

    public Test(int id) {
        this.id = id;
    }

    public int[] getOneDimArr() {
        return oneDimArr;
    }
    public int[][] getTwoDimArr() {
        return twoDimArr;
    }
}

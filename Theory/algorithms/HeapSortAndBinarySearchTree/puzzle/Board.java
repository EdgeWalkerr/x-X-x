import java.util.ArrayList;
import java.util.Arrays;

public class Board {
    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    private final int[][] tiles;
    private final int n;
    private final int hammingDistance;
    private final int manhattanDistance;

    // create a board from an n-by-n array of tiles,
    // where tiles[row][col] = tile at (row, col)
    public Board(int[][] tiles) {
        n = tiles.length;
        this.tiles = new int[n][n];
        int hammingDistance = 0;
        int manhattanDistance = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                this.tiles[i][j] = tiles[i][j];
                if (tiles[i][j] != 0 && tiles[i][j] != i * n + j + 1) {
                    hammingDistance += 1;
                    manhattanDistance += Math.abs((tiles[i][j] - 1) % n + 1 - (j + 1)) + Math.abs((tiles[i][j] - 1) / n - i);
                }
            }
        }
        this.hammingDistance = hammingDistance;
        this.manhattanDistance = manhattanDistance;
    }

    // string representation of this board
    public String toString() {
        StringBuilder str = new StringBuilder(n + "\n");
        for (int[] tile : tiles) {
            for (int certainTile : tile) {
                str.append(certainTile).append(" ");
            }
            str.append("\n");
        }
        return str.toString();
    }

    // board dimension n
    public int dimension() {
        return n;
    }

    // number of tiles out of place
    public int hamming() {
        return hammingDistance;
    }

    // sum of Manhattan distances between tiles and goal
    public int manhattan() {
        return manhattanDistance;
    }

    // is this board the goal board?
    public boolean isGoal() {
        return hammingDistance == 0;
    }

    // does this board equal y?
    public boolean equals(Object y) {
        if (y == null) {
            return false;
        }
        if (this == y) {
            return true;
        }
        if (this.getClass() != y.getClass()) {
            return false;
        }
        Board board = (Board) y;
        // 这里二维数组的相等做 deepEquals
        return Arrays.deepEquals(tiles, board.tiles);
    }

    private int[][] swap(int x1, int y1, int x2, int y2) {
        int[][] swapTiles = new int[n][n];
        for (int i = 0; i < tiles.length; i++) {
            System.arraycopy(tiles[i], 0, swapTiles[i], 0, n);
        }
        int temp = swapTiles[x1][y1];
        swapTiles[x1][y1] = swapTiles[x2][y2];
        swapTiles[x2][y2] = temp;
        return swapTiles;
    }

    // all neighboring boards
    public Iterable<Board> neighbors() {
        ArrayList<Board> neighborList = new ArrayList<>();
        int zeroX = -1;
        int zeroY = -1;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (tiles[i][j] == 0) {
                    zeroX = i;
                    zeroY = j;
                    break;
                }
            }
            if (zeroX != -1) {
                break;
            }
        }
        int[][] directions = {{-1, 0}, {0, -1}, {0, 1}, {1, 0}};
        for (int[] direction : directions) {
            int xx = direction[0] + zeroX;
            int yy = direction[1] + zeroY;
            if (xx >= 0 && xx < n && yy >= 0 && yy < n) {
                neighborList.add(new Board(swap(zeroX, zeroY, xx, yy)));
            }
        }
        return neighborList;
    }

    // a board that is obtained by exchanging any pair of tiles
    public Board twin() {
        Board b = null;
        // 随便找两个相邻的位置就可以了，只要不越界，只要不是 0，就可以交换
        for (int i = 0; i < n * n - 1; i++) {
            int x = i / n;
            int y = i % n;
            int xx = (i + 1) / n;
            int yy = (i + 1) % n;
            if (tiles[x][y] != 0 && tiles[xx][yy] != 0) {
                b = new Board(swap(x, y, xx, yy));
                break;
            }
        }
        return b;
    }

    // unit testing (not graded)
    public static void main(String[] args) {

    }
}

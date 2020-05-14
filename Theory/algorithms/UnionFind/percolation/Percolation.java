// import edu.princeton.cs.algs4.StdRandom;
// import edu.princeton.cs.algs4.StdStats;

import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    // creates n-by-n grid
    private final WeightedQuickUnionUF grid;
    // 打开的点
    private final boolean[] openSiteGrid;
    // 方块的边长
    private final int n;
    // 打开的点的数量
    private int numOfOpenSite = 0;

    // creates n-by-n grid, with all sites initially blocked
    public Percolation(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("n " + n + " need to bigger than 0 ");
        }
        this.n = n;
        grid = new WeightedQuickUnionUF(n * n + 2);
        openSiteGrid = new boolean[n * n + 2];
        openSiteGrid[0] = true;
        openSiteGrid[n * n + 1] = true;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                openSiteGrid[i * n + j + 1] = false;
            }
        }
    }

    // opens the site (row, col) if it is not open already
    public void open(int row, int col) {
        if (row < 1 || row > n || col < 1 || col > n) {
            throw new IllegalArgumentException(
                    "row " + row + " need in the range of 1 - " + n +
                            "\ncol " + col + " need in the range of 1 - " + n
            );
        }
        if (openSiteGrid[(row - 1) * n + col]) {
            return;
        }
        openSiteGrid[(row - 1) * n + col] = true;
        numOfOpenSite += 1;
        // 上方的点
        if (row - 1 > 0 && isOpen(row - 1, col)) {
            grid.union((row - 2) * n + col, (row - 1) * n + col);
        }
        if (row == 1) {
            grid.union(0, (row - 1) * n + col);
        }
        // 左边的点
        if (col - 1 > 0 && isOpen(row, col - 1)) {
            grid.union((row - 1) * n + col - 1, (row - 1) * n + col);
        }
        // 下方的点
        if (row < n && isOpen(row + 1, col)) {
            grid.union(row * n + col, (row - 1) * n + col);
        }
        if (row == n) {
            grid.union(n * n + 1, (row - 1) * n + col);
        }
        // 右边的点
        if (col < n && isOpen(row, col + 1)) {
            grid.union((row - 1) * n + col + 1, (row - 1) * n + col);
        }
    }

    // is the site (row, col) open?
    public boolean isOpen(int row, int col) {
        if (row < 1 || row > n || col < 1 || col > n) {
            throw new IllegalArgumentException(
                    "row " + row + " need in the range of 1 - " + n +
                            "\ncol " + col + " need in the range of 1 - " + n
            );
        }
        return openSiteGrid[(row - 1) * n + col];
    }

    // is the site (row, col) full?
    public boolean isFull(int row, int col) {
        if (row < 1 || row > n || col < 1 || col > n) {
            throw new IllegalArgumentException(
                    "row " + row + " need in the range of 1 - " + n +
                            "\ncol " + col + " need in the range of 1 - " + n
            );
        }
        return grid.find((row - 1) * n + col) == grid.find(0);
    }

    // returns the number of open sites
    public int numberOfOpenSites() {
        return numOfOpenSite;
    }

    // does the system percolate?
    public boolean percolates() {
        return grid.find(n * n + 1) == grid.find(0);
    }

    // test client (optional)
    public static void main(String[] args) {
        System.out.print("hello world");
    }
}

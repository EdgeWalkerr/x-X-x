// import edu.princeton.cs.algs4.StdRandom;
// import edu.princeton.cs.algs4.StdStats;

import edu.princeton.cs.algs4.WeightedQuickUnionUF;

public class Percolation {
    // creates n-by-n grid
    private WeightedQuickUnionUF grid;
    // 打开的点
    private boolean[] openSiteGrid;
    // 方块的边长
    private int n;

    // creates n-by-n grid, with all sites initially blocked
    public Percolation(int n) {
        if (n <= 0) {
            throw new IllegalArgumentException("n " + n + " is bigger than 0 ");
        }
        this.n = n;
        grid = new WeightedQuickUnionUF(n * n + 2);
        for (int i = 1; i < n + 1; i++) {
            grid.union(0, i);
            grid.union(n * n + 1, n * (n - 1) + i);
        }
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
        openSiteGrid[(row - 1) * n + col] = true;
        if (row - 1 > 0 && isOpen(row - 1, col)) {
            grid.union((row - 2) * n + col, (row - 1) * n + col);
        }
        if (col - 1 > 0 && isOpen(row, col - 1)) {
            grid.union((row - 1) * n + col - 1, (row - 1) * n + col);
        }
        if (row < n && isOpen(row + 1, col)) {
            grid.union(row * n + col, (row - 1) * n + col);
        }
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
        return grid.connected((row - 1) * n + col, 0);
    }

    // returns the number of open sites
    public int numberOfOpenSites() {
        int num = 0;
        for (int i = 1; i < n + 1; i++) {
            for (int j = 1; j < n + 1; j++) {
                if (isOpen(i, j)) {
                    num += 1;
                }
            }
        }
        return num;
    }

    // does the system percolate?
    public boolean percolates() {
        return isFull(0, n * n + 1);
    }

    // test client (optional)
    public static void main(String[] args) {
        System.out.print("hello world");
    }
}

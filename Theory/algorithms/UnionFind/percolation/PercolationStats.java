import edu.princeton.cs.algs4.StdRandom;
import edu.princeton.cs.algs4.StdStats;

public class PercolationStats {
    // 最终percolate的数字结果
    private final double[] resultList;
    // trail
    private final int t;

    // perform independent trials on an n-by-n grid
    public PercolationStats(int n, int trials) {
        if (n <= 0) {
            throw new IllegalArgumentException("n " + n + " is bigger than 0 ");
        }
        if (trials <= 0) {
            throw new IllegalArgumentException(
                    "trials " + trials + " is bigger than 0 "
            );
        }
        resultList = new double[trials];
        t = trials;
        for (int i = 0; i < trials; i++) {
            Percolation percolation = new Percolation(n);
            double resultNum = 0.0;
            while (!percolation.percolates()) {
                int row = StdRandom.uniform(1, n + 1);
                int col = StdRandom.uniform(1, n + 1);
                if (!percolation.isOpen(row, col)) {
                    percolation.open(row, col);
                    resultNum += 1;
                }
            }
            resultList[i] = resultNum / (n * n);
        }
    }

    // sample mean of percolation threshold
    public double mean() {
        return StdStats.mean(resultList);
    }

    // sample standard deviation of percolation threshold
    public double stddev() {
        return StdStats.stddev(resultList);
    }

    // low endpoint of 95% confidence interval
    public double confidenceLo() {
        return mean() - (stddev() * 1.96) / Math.sqrt(t);
    }

    // high endpoint of 95% confidence interval
    public double confidenceHi() {
        return mean() + (stddev() * 1.96) / Math.sqrt(t);
    }

    // test client (see below)
    public static void main(String[] args) {
        PercolationStats p = new PercolationStats(
                Integer.parseInt(args[0]),
                Integer.parseInt(args[1])
        );
        double meanValue = p.mean();
        double stddevValue = p.stddev();
        double confidenceLoValue = p.confidenceLo();
        double confidenceHiValue = p.confidenceHi();
        System.out.println("mean                    = " + meanValue);
        System.out.println("stddev                  = " + stddevValue);
        System.out.println(
                "95% confidence interval = " +
                        "[" + confidenceLoValue + ", " + confidenceHiValue + "]"
        );
    }
}

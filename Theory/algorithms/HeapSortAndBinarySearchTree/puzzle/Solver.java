import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.MinPQ;
import edu.princeton.cs.algs4.StdOut;

import java.util.ArrayList;
import java.util.Collections;

public class Solver {
    // find a solution to the initial board (using the A* algorithm)

    private static class GameTree implements Comparable<GameTree> {
        private final boolean twin;
        private final GameTree parent;
        private final int distance;
        private final int priority;
        private final Board board;
        private final int moves;

        public GameTree(Board board, boolean isTwin) {
            this.twin = isTwin;
            parent = null;
            this.board = board;
            moves = 0;
            distance = board.manhattan();
            priority = distance;
        }

        public GameTree(Board board, GameTree parent) {
            this.twin = parent.isTwin();
            this.parent = parent;
            this.board = board;
            moves = parent.moves + 1;
            distance = board.manhattan();
            priority = distance + moves;
        }

        public boolean isTwin() {
            return twin;
        }

        public Board getBoard() {
            return board;
        }

        public GameTree getParent() {
            return parent;
        }

        @Override
        public int compareTo(GameTree o) {
            if (priority == o.priority) {
                return Integer.compare(distance, o.distance);
            } else {
                return Integer.compare(priority, o.priority);
            }
        }

    }

    private final int moveNum;
    private final boolean solvable;
    private final Iterable<Board> solutionList;

    public Solver(Board initial) {
        if (initial == null) {
            throw new IllegalArgumentException("initial cannot be null");
        }
        MinPQ<GameTree> pq = new MinPQ<>();
        pq.insert(new GameTree(initial, false));
        pq.insert(new GameTree(initial.twin(), true));
        GameTree node = pq.delMin();
        while (!node.getBoard().isGoal()) {
            Board board = node.getBoard();
            for (Board neighborBoard : board.neighbors()) {
                if (node.parent == null || !neighborBoard.equals(node.getParent().getBoard())) {
                    pq.insert(new GameTree(neighborBoard, node));
                }
            }
            node = pq.delMin();
        }
        if (node.isTwin()) {
            moveNum = -1;
            solvable = false;
            solutionList = null;
        } else {
            solvable = true;
            ArrayList<Board> solutionList = new ArrayList<>();
            while (node != null) {
                solutionList.add(node.getBoard());
                node = node.getParent();
            }
            moveNum = solutionList.size() - 1;
            Collections.reverse(solutionList);
            this.solutionList = solutionList;
        }
    }

    // is the initial board solvable? (see below)
    public boolean isSolvable() {
        return solvable;
    }

    // min number of moves to solve initial board
    public int moves() {
        return moveNum;
    }

    // sequence of boards in a shortest solution
    public Iterable<Board> solution() {
        return solutionList;
    }

    // test client (see below)
    public static void main(String[] args) {
        // create initial board from file
        In in = new In(args[0]);
        int n = in.readInt();
        int[][] tiles = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                tiles[i][j] = in.readInt();
        Board initial = new Board(tiles);

        // solve the puzzle
        Solver solver = new Solver(initial);

        // print solution to standard output
        if (!solver.isSolvable())
            StdOut.println("No solution possible");
        else {
            StdOut.println("Minimum number of moves = " + solver.moves());
            for (Board board : solver.solution())
                StdOut.println(board);
        }
    }
}

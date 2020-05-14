import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.StdDraw;
import edu.princeton.cs.algs4.StdOut;

import java.util.Arrays;

public class FastCollinearPoints {
    private final LineSegment[] segmentList;   // one endpoint of this line segment
    private int sz = 0;

    // finds all line segments containing 4 or more points
    public FastCollinearPoints(Point[] points) {
        if (points == null) {
            throw new IllegalArgumentException("points cannot be null");
        }
        for (Point point : points) {
            if (point == null) {
                throw new IllegalArgumentException("point cannot be null");
            }
        }
        Point[] sortedPoints = new Point[points.length];
        System.arraycopy(points, 0, sortedPoints, 0, points.length);
        Arrays.sort(sortedPoints);
        for (int i = 0; i < sortedPoints.length - 1; i++) {
            if (sortedPoints[i].equals(sortedPoints[i + 1])) {
                throw new IllegalArgumentException("point cannot be repeat");
            }
        }
        segmentList = new LineSegment[points.length];
        int size = points.length;
        // 首先将所有的点进行merge sort 排序, 然后后面的
        Point[] sortPoints = new Point[points.length];
        System.arraycopy(points, 0, sortPoints, 0, size);
        for (Point point : points) {
            Arrays.sort(sortPoints, point.slopeOrder());
            int sameValueTime = 0;
            for (int j = 0; j < size - 1; j++) {
                if (sortPoints[j] == sortPoints[j + 1]) {
                    sameValueTime += 1;
                    if (sameValueTime == 3) {
                        Point[] adjacentPoints = new Point[4];
                        System.arraycopy(sortPoints, j - 2, adjacentPoints, 0, 3);
                        adjacentPoints[3] = point;
                        Arrays.sort(adjacentPoints);
                        LineSegment lineSegment = new LineSegment(adjacentPoints[0], adjacentPoints[1]);
                        segmentList[sz++] = lineSegment;
                    }
                }
            }
        }
    }

    // the number of line segments
    public int numberOfSegments() {
        return sz;
    }

    // the line segments
    public LineSegment[] segments() {
        LineSegment[] lineSegments = new LineSegment[sz];
        System.arraycopy(segmentList, 0, lineSegments, 0, sz);
        return lineSegments;
    }

    public static void main(String[] args) {
        // read the n points from a file
        In in = new In(args[0]);
        int n = in.readInt();
        Point[] points = new Point[n];
        for (int i = 0; i < n; i++) {
            int x = in.readInt();
            int y = in.readInt();
            points[i] = new Point(x, y);
        }
        // draw the points
        StdDraw.enableDoubleBuffering();
        StdDraw.setXscale(0, 32768);
        StdDraw.setYscale(0, 32768);
        for (Point p : points) {
            p.draw();
        }
        StdDraw.show();
        // print and draw the line segments
        FastCollinearPoints collinear = new FastCollinearPoints(points);
        for (LineSegment segment : collinear.segments()) {
            StdOut.println(segment);
            segment.draw();
        }
        StdDraw.show();
    }
}

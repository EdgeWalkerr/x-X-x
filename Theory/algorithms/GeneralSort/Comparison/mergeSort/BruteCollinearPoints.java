import java.util.Arrays;

public class BruteCollinearPoints {
    private final LineSegment[] segmentList;   // one endpoint of this line segment
    private int sz = 0;

    // finds all line segments containing 4 points
    public BruteCollinearPoints(Point[] points) {
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
        for (int i = 0; i < size - 3; i++) {
            for (int j = i + 1; j < size - 2; j++) {
                for (int k = j + 1; k < size - 1; k++) {
                    for (int l = k + 1; l < size; l++) {
                        // 找出四个点的顺序
                        double slopeTo1 = sortedPoints[i].slopeTo(sortedPoints[j]);
                        double slopeTo2 = sortedPoints[k].slopeTo(sortedPoints[l]);
                        double slopeTo3 = sortedPoints[j].slopeTo(sortedPoints[k]);
                        if (slopeTo1 == slopeTo2 && slopeTo1 == slopeTo3) {
                            LineSegment lineSegment = new LineSegment(sortedPoints[i], sortedPoints[l]);
                            segmentList[sz++] = lineSegment;
                            break;
                        }
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
}

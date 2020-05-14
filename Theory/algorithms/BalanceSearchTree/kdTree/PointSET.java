import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.RectHV;

import java.util.ArrayList;
import java.util.TreeSet;

public class PointSET {
    // set of points
    private final TreeSet<Point2D> pointList = new TreeSet<>();

    // construct an empty set of points
    public PointSET() {
    }

    // is the set empty?
    public boolean isEmpty() {
        return pointList.size() == 0;
    }

    // number of points in the set
    public int size() {
        return pointList.size();
    }

    // add the point to the set (if it is not already in the set)
    public void insert(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        pointList.add(p);
    }

    // does the set contain point p?
    public boolean contains(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        return pointList.contains(p);
    }

    // draw all points to standard draw
    public void draw() {
        for (Point2D p : pointList) {
            p.draw();
        }
    }

    // all points that are inside the rectangle (or on the boundary)
    public Iterable<Point2D> range(RectHV rect) {
        if (rect == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        ArrayList<Point2D> point2DS = new ArrayList<>();
        for (Point2D p : pointList) {
            if (rect.contains(p)) {
                point2DS.add(p);
            }
        }
        return point2DS;
    }

    // a nearest neighbor in the set to point p; null if the set is empty
    public Point2D nearest(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        if (pointList.size() == 0) {
            return null;
        }
        Point2D point = pointList.first();
        double minDistance = p.distanceTo(point);
        for (Point2D pp : pointList) {
            double ppDistance = pp.distanceTo(p);
            if (ppDistance < minDistance) {
                point = pp;
                minDistance = ppDistance;
            }
        }
        return point;
    }

    // unit testing of the methods (optional)
    public static void main(String[] args) {

    }
}

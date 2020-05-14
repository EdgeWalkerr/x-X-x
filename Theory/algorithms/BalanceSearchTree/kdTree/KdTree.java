import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.RectHV;
import edu.princeton.cs.algs4.StdDraw;

import java.util.ArrayList;
import java.util.Stack;

public class KdTree {
    private static class Node {
        Point2D val;
        Node left, right;
        boolean isVertical;
    }

    private int size = 0;
    private Node head = null;

    // construct an empty set of points
    public KdTree() {
    }

    // is the set empty?
    public boolean isEmpty() {
        return size == 0;
    }

    // number of points in the set
    public int size() {
        return size;
    }

    // add the point to the set (if it is not already in the set)
    public void insert(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        Node current = head;
        Node parent = null;
        boolean isVertical = true;
        // 判断为哪一个部分， 如果为某一个部分，而且为null, 则结束
        while (current != null) {
            parent = current;
            if (current.isVertical) {
                current = p.x() < current.val.x() ? current.left : current.right;
            } else {
                current = p.y() < current.val.y() ? current.left : current.right;
            }
        }
        Node node = new Node();
        node.val = p;
        node.left = null;
        node.right = null;
        if (head == null) {
            node.isVertical = true;
            head = node;
            System.out.println("head is null");
        } else {
            if (parent.isVertical) {
                node.isVertical = false;
                if (p.x() < parent.val.x()) {
                    parent.left = node;
                } else {
                    parent.right = node;
                }
            } else {
                node.isVertical = true;
                if (p.y() < parent.val.y()) {
                    parent.left = node;
                } else {
                    parent.right = node;
                }
            }
        }
        size += 1;
    }

    // does the set contain point p?
    public boolean contains(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        Node current = head;
        while (current != null) {
            if (current.val.equals(p)) {
                return true;
            }
            if (current.isVertical) {
                current = p.x() < current.val.x() ? current.left : current.right;
            } else {
                current = p.y() < current.val.y() ? current.left : current.right;
            }
        }
        return false;
    }

    // draw all points to standard draw
    // 使用广度优先遍历来将所有的点打印出来
    public void draw() {
        Stack<Node> stack = new Stack<>();
        if (head != null) {
            stack.push(head);
        }
        Node node;
        while (stack.size() > 0) {
            node = stack.pop();
            StdDraw.point(node.val.x(), node.val.y());
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
    }

    // all points that are inside the rectangle (or on the boundary)
    public Iterable<Point2D> range(RectHV rect) {
        if (rect == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        ArrayList<Point2D> list = new ArrayList<>();
        Stack<Node> stack = new Stack<>();
        if (head != null) {
            stack.push(head);
        }
        Node node;
        while (stack.size() > 0) {
            node = stack.pop();
            if (rect.contains(node.val)) {
                list.add(node.val);
            }
            // 如果相交， 则要考察两面
            if (node.isVertical) {
                if (rect.xmin() < node.val.x() && rect.xmax() >= node.val.x()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
                if (rect.xmax() < node.val.x()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                }
                if (rect.xmin() >= node.val.x()) {
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
            } else {
                if (rect.ymin() < node.val.y() && rect.ymax() >= node.val.y()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
                if (rect.ymax() < node.val.y()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                }
                if (rect.ymin() >= node.val.y()) {
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
            }
        }
        return list;
    }

    // a nearest neighbor in the set to point p; null if the set is empty
    public Point2D nearest(Point2D p) {
        if (p == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        Node nearestNode = head;
        double distance = head.val.distanceTo(p);
        Stack<Node> stack = new Stack<>();
        if (head != null) {
            stack.push(head);
        } else {
            return null;
        }
        Node node;
        while (stack.size() > 0) {
            node = stack.pop();
            double certainDistance = node.val.distanceTo(p);
            if (certainDistance < distance) {
                distance = certainDistance;
                nearestNode = node;
            }
            // 如果distance比垂直距离还短则直接不用push
            if (node.isVertical) {
                if (distance > Math.abs(p.x() - node.val.x())) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
                if (p.x() < node.val.x()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                }
                if (p.x() >= node.val.x()) {
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
            } else {
                if (distance > Math.abs(p.y() - node.val.y())) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
                if (p.y() < node.val.y()) {
                    if (node.left != null) {
                        stack.push(node.left);
                    }
                }
                if (p.y() >= node.val.y()) {
                    if (node.right != null) {
                        stack.push(node.right);
                    }
                }
            }
        }
        return nearestNode.val;
    }

    // unit testing of the methods (optional)
    public static void main(String[] args) {

    }
}

import edu.princeton.cs.algs4.StdRandom;

import java.util.Iterator;

public class RandomizedQueue<Item> implements Iterable<Item> {
    // construct an empty randomized queue
    private int sz;
    private Node head;

    private class Node {
        Item item;
        Node next;
    }

    public RandomizedQueue() {
        sz = 0;
        head = null;
    }

    // is the randomized queue empty?
    public boolean isEmpty() {
        return sz == 0;
    }

    // return the number of items on the randomized queue
    public int size() {
        return sz;
    }

    // add the item
    public void enqueue(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("cannot add null item");
        }
        if (isEmpty()) {
            head = new Node();
            head.item = item;
            head.next = null;
        } else {
            Node oldHead = head;
            head = new Node();
            head.item = item;
            head.next = oldHead;
        }
        sz += 1;
    }

    // remove and return a random item
    public Item dequeue() {
        if (isEmpty()) {
            throw new java.util.NoSuchElementException("cannot remove empty RandomizedQueue");
        }
        int num = StdRandom.uniform(0, sz);
        Node current = head;
        sz -= 1;
        if (num == 0) {
            Item item = head.item;
            head = head.next;
            return item;
        } else {
            while (num > 1) {
                current = current.next;
                num -= 1;
            }
            Item item = current.next.item;
            current.next = current.next.next;
            return item;
        }
    }

    // return a random item (but do not remove it)
    public Item sample() {
        if (isEmpty()) {
            throw new java.util.NoSuchElementException("cannot sample empty RandomizedQueue");
        }
        int num = StdRandom.uniform(0, sz);
        Node current = head;
        while (num > 0) {
            current = current.next;
            num -= 1;
        }
        return current.item;
    }

    private class ListIterator implements Iterator<Item> {
        private Node current = head;

        public boolean hasNext() {
            return current != null;
        }

        public void remove() {
            throw new UnsupportedOperationException("remove is not support");
        }

        public Item next() {
            if (!hasNext()) {
                throw new java.util.NoSuchElementException("cannot call next at the end");
            }
            Item item = current.item;
            current = current.next;
            return item;
        }
    }

    // return an independent iterator over items in random order
    public Iterator<Item> iterator() {
        return new ListIterator();
    }

    // unit testing (required)
    public static void main(String[] args) {

    }
}

import java.util.Iterator;

public class Deque<Item> implements Iterable<Item> {

    private Node head;
    private Node tail;
    private int sz;

    private class Node {
        Item item;
        Node next;
        Node last;
    }

    // construct an empty deque
    public Deque() {
        head = null;
        tail = null;
        sz = 0;
    }

    // is the deque empty?
    public boolean isEmpty() {
        return sz == 0;
    }

    // return the number of items on the deque
    public int size() {
        return sz;
    }

    // add the item to the front
    public void addFirst(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("cannot add null item");
        }
        if (isEmpty()) {
            head = new Node();
            head.item = item;
            head.next = null;
            head.last = null;
            tail = head;
        } else {
            Node oldHead = head;
            head = new Node();
            head.item = item;
            head.next = oldHead;
            head.last = null;
            oldHead.last = head;
        }
        sz += 1;
    }

    // add the item to the back
    public void addLast(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("cannot add null item");
        }
        if (isEmpty()) {
            tail = new Node();
            tail.item = item;
            tail.next = null;
            tail.last = null;
            head = tail;
        } else {
            Node oldTail = tail;
            tail = new Node();
            tail.item = item;
            tail.next = null;
            tail.last = oldTail;
            oldTail.next = tail;
        }
        sz += 1;
    }

    // remove and return the item from the front
    public Item removeFirst() {
        if (isEmpty()) {
            throw new java.util.NoSuchElementException("cannot remove empty deque");
        }
        Item item = head.item;
        if (sz == 1) {
            head = tail = null;
        } else {
            head = head.next;
            head.last = null;
        }
        sz -= 1;
        return item;
    }

    // remove and return the item from the back
    public Item removeLast() {
        if (isEmpty()) {
            throw new java.util.NoSuchElementException("cannot remove empty deque");
        }
        Item item = tail.item;
        if (sz == 1) {
            head = tail = null;
        } else {
            tail = tail.last;
            tail.next = null;
        }
        sz -= 1;
        return item;
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

    // return an iterator over items in order from front to back
    public Iterator<Item> iterator() {
        return new ListIterator();
    }

    // unit testing (required)
    public static void main(String[] args) {
        Deque<String> deque = new Deque<String>();
        deque.addLast("firstString");
        deque.removeFirst();
        Iterator<String> iterators = deque.iterator();
        System.out.println(iterators.next());
        System.out.println(iterators.next());
        deque.removeFirst();
        System.out.println(deque.size());
    }
}

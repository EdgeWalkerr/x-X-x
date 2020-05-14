import edu.princeton.cs.algs4.Digraph;
import edu.princeton.cs.algs4.In;

import java.util.ArrayList;
import java.util.TreeMap;

public class WordNet {
    private final TreeMap<String, Integer> treeMap = new TreeMap<>();
    private final Digraph digraph;
    private final ArrayList<String> nounsList = new ArrayList<>();
    private SAP sap;

    // constructor takes the name of the two input files
    public WordNet(String synsets, String hypernyms) {
        if (synsets == null || hypernyms == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        int lineNum = 0;
        In in = new In(synsets);
        while (!in.isEmpty()) {
            String line = in.readLine();
            String[] lineList = line.split(",");
            String[] nounList = lineList[1].split(" ");
            for (String noun : nounList) {
                nounsList.add(noun);
                treeMap.put(noun, Integer.parseInt(lineList[0]));
            }
            lineNum += 1;
        }
        // 建立两个数据结构，一个是treeMap,一个是diGraph
        // 用synsets建立treeMap
        digraph = new Digraph(lineNum);
        In hypernymsIn = new In(hypernyms);
        while (!hypernymsIn.isEmpty()) {
            String line = in.readLine();
            String[] lineList = line.split(",");
            String[] verticesList = new String[lineList.length - 1];
            System.arraycopy(lineList, 1, verticesList, 0, lineList.length - 1);
            for (String vertices : verticesList) {
                digraph.addEdge(Integer.parseInt(lineList[0]), Integer.parseInt(vertices));
            }
        }
        // 用diGraph建立图
    }

    // returns all WordNet nouns
    public Iterable<String> nouns() {
        return nounsList;
    }

    // is the word a WordNet noun?
    public boolean isNoun(String word) {
        if (word == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        return treeMap.get(word) != null;
    }

    // distance between nounA and nounB (defined below)
    public int distance(String nounA, String nounB) {
        if (nounA == null || nounB == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        if (!isNoun(nounA) || !isNoun(nounB)) {
            throw new IllegalArgumentException("argument needed to be WordNet noun");
        }

    }

    // a synset (second field of synsets.txt) that is the common ancestor of nounA and nounB
    // in a shortest ancestral path (defined below)
    public String sap(String nounA, String nounB) {
        if (nounA == null || nounB == null) {
            throw new IllegalArgumentException("argument cannot be null");
        }
        if (!isNoun(nounA) || !isNoun(nounB)) {
            throw new IllegalArgumentException("argument needed to be WordNet noun");
        }
    }

    // do unit testing of this class
    public static void main(String[] args) {

    }
}

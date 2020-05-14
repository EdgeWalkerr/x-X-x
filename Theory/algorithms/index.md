# 算法

## 目录

```mermaid
graph LR
algorithm(算法) --> unionFind[并查集]
algorithm --> sequantialSort[序列排序]
sequantialSort --> comparison[比较排序]
sequantialSort --> nonComparison[非比较算法]
comparison --> selection[选择排序]
comparison --> insertion[插入排序]
comparison --> shell[希尔排序]
comparison --> merge[归并排序]
comparison --> quick[快速排序]
nonComparison --> bucket[桶排序]
nonComparison --> counting[计数排序]
counting --> overweitten[重写]
counting --> move[移动]
nonComparison --> radix[基数排序]
algorithm --> priorityQueue[优先队列]
priorityQueue --> heapSort[堆排序]
algorithm --> binarySearchTree[二分搜索树]
algorithm --> balanceSearchTree[平衡搜索树]
algorithm --> hashTable[哈希列表]
algorithm --> sortChoice[排序选择]
algorithm --> symbolChoice[符号表选择]
click unionFind "./UnionFind/union-find.md"
click comparison "./GeneralSort/Comparison/index.md"
click nonComparison "./GeneralSort/NonComparison/index.md"
```
## 术语

|       术语       |                 描述                  |
| :------------------------: | :---------------------------------------------: |
|          shuffing          |                 在每一个排序的对象生成一个对应的随机值作为key， 然后将整个数组按照key排序![image-20200501003100291](/Users/vincent/Library/Application Support/typora-user-images/image-20200501003100291.png)                 |
|         comparable         | 拥有compareTo方法， 返回负值表示小于， 正值表示大于， 0为等于 |
|          iterable          | ![image-20200501000641878](/Users/vincent/Library/Application Support/typora-user-images/image-20200501000641878.png) |
|           stable           | 排序后相同值的位置和排序前一致 |
|          in-place          | uses <= clogN extra memory |
| 理论可实现基于比较的排序的性能 | ![image-20200501004146277](/Users/vincent/Library/Application Support/typora-user-images/image-20200501004146277.png) |



## [比较算法排序性能](./GeneralSort/Comparison/index.md)

![image-20200430235511489](/Users/vincent/Library/Application Support/typora-user-images/image-20200430235511489.png)



## [非比较算法排序性能](./GeneralSort/NonComparison/index.md)



## 符号表实现

![image-20200430235219664](/Users/vincent/Library/Application Support/typora-user-images/image-20200430235219664.png)

## BST应用

![image-20200430234946611](/Users/vincent/Library/Application Support/typora-user-images/image-20200430234946611.png)

  
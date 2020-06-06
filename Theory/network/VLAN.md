# VLAN

## 产生VLAN的原因

1. segmentation 划分

    - 性能问题：同一个switch上的设备会同时被广播到

    - 安全性问题

2. 简化网络设计

物理连接点和实际的逻辑LAN不相干

![image-20200531141237216](/Users/vincent/Library/Application Support/typora-user-images/image-20200531141237216.png)

3. 容易排错和管理

    某个部分出错， 可以尽快排查， 因为影响的范围小。可以不影响其他部分的使用



Static vs Dynamic

static is port based

![image-20200531150009556](/Users/vincent/Library/Application Support/typora-user-images/image-20200531150009556.png)

dynamic is usually Mac address based

![image-20200531145954113](/Users/vincent/Library/Application Support/typora-user-images/image-20200531145954113.png)

IEEE802.1q

![image-20200531150601703](/Users/vincent/Library/Application Support/typora-user-images/image-20200531150601703.png)

commuticate with different VLAN


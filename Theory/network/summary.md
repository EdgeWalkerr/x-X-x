OSI模型

1. Application -> HTTP SMTP
2. Presentation -> coding and conversion  PNG
3. Session -> sessionID with Data
4. Transport -> split data TCP/UDP Data
5. Network -> IP TCP/UDP Data
6. Data Link -> Ethernate frame IP TCP/UDP/ FCS
7. Physical -> data -> binary data

TCP vs UDP

TCP is reliable, connectable

UDP is unreliable, connectless

TCP 3次握手 4次握手

3次握手

 client -SYN-> server

client会周期性超时重传， 直到收到server的确认

client <-SYN ACK- server

server会周期性超时重传， 直到收到client的确认

client -ACK-> server

// 三次握手的原因是为了为了*防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误*

4次挥手

client <-FIN- server

client -FIN ACK-> server

支持半连接

client -FIN -> server

client <-FIN ACK- server

// 四次挥手是为了支持半关闭

半连接：在3次握手过程中， client不进行第3次握手

半打开：在建立连接后，服务器端异常关闭

半关闭：在服务端关闭确认后的状态

https://blog.csdn.net/kanguolaikanguolaik/article/details/11765749

## ARP

IP address -> MAC address

首先发送destination address FF:FF:FF:FF:FF:FF 来实现广播

然后单播返回对应的MAC address

如何建立一个source address table(SAT)

1.首先将连接的设备的mac地址记录下来

![image-20200531010601309](/Users/vincent/Library/Application Support/typora-user-images/image-20200531010601309.png)

当新的计算机连接的时候

1.新计算机可以通过发送frame来将自己的mac地址加入

2.如果加入的新计算机没有发送frame， 如果有其他的client这台计算机请求连接， switch会进行broadcast

多个不同的switch由于在找目的mac地址时如果有环的话会导致数据信号回流和数据信号重复

![image-20200531011115625](/Users/vincent/Library/Application Support/typora-user-images/image-20200531011115625.png)

如何建立一个无环结构：STP（spanning tree protocol）

![image-20200531011737241](/Users/vincent/Library/Application Support/typora-user-images/image-20200531011737241.png)

1. stp elect a root bridge

    BPDU(Bridge Protocol Data Unit)

2. 生成到root bridge的最短路径，将非最短路径的端口设置为BP(block port)

3. 最终形成一个无环结构



## 传输介质

数字信号和模拟信号 传输的方式和场景

baseBand and broadBand

https://www.computernetworkingnotes.com/networking-tutorials/differences-between-baseband-and-broadband-explained.html

![image-20200530173629267](/Users/vincent/Library/Application Support/typora-user-images/image-20200530173629267.png)

WAN之间的有线通信大部分使用光纤通信， 通过光脉冲传输信息

LAN modem将光信号或者之前的电脉冲信号 转化成数字信号

使用同轴电缆来连接宽带 UTP STP

![image-20200531002846170](/Users/vincent/Library/Application Support/typora-user-images/image-20200531002846170.png)

![image-20200531002953816](/Users/vincent/Library/Application Support/typora-user-images/image-20200531002953816.png)

无线设备使用modem将电磁波信号转化为数字信号

以太网

### 拓扑结构

以太网使用 star-bus连接

![image-20200530235749539](/Users/vincent/Library/Application Support/typora-user-images/image-20200530235749539.png)

WAN topology bus、ring、star、mesh and tiered

?? CDMA/AD 和 CDMA/CD

### switch如何防止数据传输回环 -- 由mash拓扑结构导致的有环系统数据传输问题

![image-20200531010222194](/Users/vincent/Library/Application Support/typora-user-images/image-20200531010222194.png)

![image-20200531010242506](/Users/vincent/Library/Application Support/typora-user-images/image-20200531010242506.png)



![image-20200531010258128](/Users/vincent/Library/Application Support/typora-user-images/image-20200531010258128.png)![image-20200531010316661](/Users/vincent/Library/Application Support/typora-user-images/image-20200531010316661.png)

IPV4

![image-20200531013330129](/Users/vincent/Library/Application Support/typora-user-images/image-20200531013330129.png)

使用subnetting mask可以用于细分网络

用来回答：请求的IP地址是否在LAN中使用subnetting

subnetting将整个IP地址分为networkID 和 hostID

如果两个IP有相同的networkID, 则在相同的LAN上

![image-20200531014543688](/Users/vincent/Library/Application Support/typora-user-images/image-20200531014543688.png)

?? default GateWay

Special and private的IPV4 address

0.0.0.0 - the client is not connect to any internet

255.255.255.255 - broadcast Ip address

Loopback address

127.0.0.0/8 check if nic work properly

Link local address

169.254.0.0/16

![image-20200531015224067](/Users/vincent/Library/Application Support/typora-user-images/image-20200531015224067.png)

private ip address

![image-20200531015356232](/Users/vincent/Library/Application Support/typora-user-images/image-20200531015356232.png)

![image-20200531015430620](/Users/vincent/Library/Application Support/typora-user-images/image-20200531015430620.png)

使用private ip需要结合NAT使用

NAT public address <=> private addrss

![image-20200531015828052](/Users/vincent/Library/Application Support/typora-user-images/image-20200531015828052.png)

Static nat 静态 1-1 的映射 public ip address <=> private ip address

Dynamic nat 动态 1-1映射 public ip address <=> private ip address

Pat 加上端口来映射 端口号的范围 0- 2^16 - 1

![image-20200531020527841](/Users/vincent/Library/Application Support/typora-user-images/image-20200531020527841.png)

DHCP dynamic host configuration protocol

![image-20200531021103790](/Users/vincent/Library/Application Support/typora-user-images/image-20200531021103790.png)

![image-20200531021518853](/Users/vincent/Library/Application Support/typora-user-images/image-20200531021518853.png)

最后 server将client的mac地址和ip地址的映射记录下来








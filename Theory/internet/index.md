# Internet: A distributed packet-switched network

[Course](https://www.khanacademy.org/computing/ap-computer-science-principles/the-internet/wires-wifi-physical-network-connections/v/the-internet-wires-cables-and-wifi)

To create a global network of computers, we need:

- **Wires & wireless**: Physical connections between computers.

    latency: time takes for a bit from one place to another

    bandwidth: maximum bit rate of a system, 100Mbps: cannot transfer more than 100 Mb / s

    | Type                   | Sends       | Distance | Bandwidth | Issues            |
    | :--------------------- | :---------- | :------- | :-------- | :---------------- |
    | Wireless               | Radio       | 100 ft   | 1.3 Gbps  | Slower in reality |
    | Ethernet copper cables | Electricity | 330 ft   | 1 Gbps    | Can lose data     |
    | Fiber optical cable    | Light       | 50 miles | 26 Tbps   | Expensive         |

- **IP & DNS**:  Addressing protocols to uniquely identify all the computers on the Internet.

    **IP**: internet protocal

    IPV4: 32位

    IPV6: 128位

    In actuality, addresses are typically split in the middle of the octets.

    The first 16 bits might route to all of UMich,

    the next 2 bits route to a specific UMich school

    and the final 14 bits route to individual computers.

    **DNS**：Domain name system

    ​			connect domain name -> ip address

    三个部分：

    third-level-domain.second-level-domain.top-level-domain

    top-level-domain:  .com, .org, .edu etc

    second-level-domain: unique name like google khanacademy

    third-level-domain: subdomain, m.wikipedia.org: mobile-optimized wikipedia

    ### Domains <-> IP address
```mermaid
    	sequenceDiagram
    		participant Computer
        participant ISP
        participant Root name servers
        participant TLD name servers
        participant Host name servers
        Computer ->> Computer: wikipedia.org = ?
        Computer -->> Computer: dont't know
        Computer->>ISP: cache wikipedia.org = ?
        ISP-->>Computer: don't know, but I can check it out.
       	ISP ->> Root name servers: .org domains?
       	Root name servers -->> ISP: the TLD name server: 199.19.54.1
       	ISP ->> TLD name servers: wikipedia domains?
       	TLD name servers -->> ISP: 208.80.154.238
       	ISP ->> Host name servers: www.wikipedia.org?
       	Host -->> ISP: 91.198.174.192
       	ISP -->> Computer: 91.198.174.192
       	
```

	### DNS Spoofing: change the domain name to another address， communicate to eachother 

- **TCP/IP**: Protocols to reliably route packets of data from one computer to another.

    1. split the message to packets

    ![image-20200516204841028](/Users/vincent/Library/Application Support/typora-user-images/image-20200516204841028.png)

    2. send packet to router

        ![image-20200516205053358](/Users/vincent/Library/Application Support/typora-user-images/image-20200516205053358.png)

    3. router receives packet:  the desination IP address is 91.198.174.192

        ![image-20200516205120014](/Users/vincent/Library/Application Support/typora-user-images/image-20200516205120014.png)

    4. router forwards packet

        ![image-20200516205307365](/Users/vincent/Library/Application Support/typora-user-images/image-20200516205307365.png)

        ![image-20200516205315041](/Users/vincent/Library/Application Support/typora-user-images/image-20200516205315041.png)

        Router use forward table helps it pick the next path.

    5. #### Final router forwards message

        | IP address prefix | path   |
        | :---------------- | :----- |
        | `91.112`          | #1     |
        | `91.198.174.192`  | Direct |
        | `192.92`          | #2     |

        

        ### 互联网冗余增加 容错性 fault-tolerant

        ![image-20200516205940721](/Users/vincent/Library/Application Support/typora-user-images/image-20200516205940721.png)

        损失了线路2， 线路1或者线路3仍然可以通行

        [TCP:](https://www.khanacademy.org/computing/ap-computer-science-principles/the-internet/tcp-fault-tolerant-transmission-protocol/a/transmission-control-protocol-tcp) 

- **TLS**: A secure protocol for sending data without letting everyone else on the Internet read it.
    为什么可以用公钥加密， 私钥解密

    RSA

    P1, P2是质数
    
    N = P1 * P2
    
    欧拉公式：
    $$
    \Phi(P1 * P2) = (P1 - 1) * (P2 - 1)
    $$
    
    $$
    m^{\Phi(P1 * P2)} mod (P1 * P2) = 1
    $$
    
    $$
    m^{k * \Phi(P1 * P2) + 1} mod (P1 * P2) = m
    $$
    
    $$
    令 e*d = k * \Phi(P1 * P2) + 1
    $$
    
    $$
    d = \frac{k * \Phi(P1 * P2) + 1}{e}
    $$
    
    首先将N和e传递给client
    
    client用来加密
    $$
    c = m^e mod N
    $$
    client用d和N解密
    $$
    m = m^{e*d} mod N
    $$
    
    $$
    m = c ^ d mod N
    $$
    
    
    
- **HTTP & HTML**: Common protocols and formats for sharing documents and viewing them across any type of computer.




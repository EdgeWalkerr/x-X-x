# Union-find

1. quick find

    ![image-20200505125232213](/Users/vincent/Library/Application Support/typora-user-images/image-20200505125232213.png)

    ![image-20200505125319629](/Users/vincent/Library/Application Support/typora-user-images/image-20200505125319629.png)

2. quick union

    ![image-20200505125458272](/Users/vincent/Library/Application Support/typora-user-images/image-20200505125458272.png)

    ![image-20200505125554695](/Users/vincent/Library/Application Support/typora-user-images/image-20200505125554695.png)



改进措施： 平衡节点的深度

1. weighted

    追踪每个节点的size， 每次将低的插入到高的节点下

2. path compression

    进一步降低深度， 每次插入节点时， 将路过节点平铺到根结底上
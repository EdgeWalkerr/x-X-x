## 居中的方法

## 盒子模型

![image-20200519184226776](/Users/vincent/Library/Application Support/typora-user-images/image-20200519184226776.png)

box-sizing 属性可以被用来调整这些表现:

- `content-box` 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。

clientWidth 和 offsetWidth区别


- `offsetWidth`, `offsetHeight`: The size of the visual box incuding all borders. Can be calculated by adding `width`/`height` and paddings and borders, if the element has `display: block`
- `clientWidth`, `clientHeight`: The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.


## selector specity 选择器权重

## class中className顺序是不重要的

## 有几种关于显示的属性

visible: 

hidden等等有何区别


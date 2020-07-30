

# Styled-Component

来源：https://medium.com/styled-components/how-styled-components-works-618a69970421



构建流程图

## Tagged templates

可以使用``在function中

```js
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
  let str0 = strings[0]; // "That "
  let str1 = strings[1]; // " is a "

  // There is technically a string after
  // the final expression (in our example),
  // but it is empty (""), so disregard.
  // let str2 = strings[2];

  let ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // We can even return a string built using a template literal
  return `${str0}${personExp}${str1}${ageStr}`;
}

let output = myTag`That ${ person } is a ${ age }`;

console.log(output);
```

纯字符串的场景直接strings[0]就是整个字符串了

```js
function tag(strings) {
  console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2" ,
// including the two characters '\' and 'n'
```

## Demo

```js
const Button = styled.button`
  color: coral; 
  padding: 0.25rem 1rem; 
  border: solid 2px coral; 
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;
```

相当于：

```js
const Button = styled('button')([
  'color: coral;' +
  'padding: 0.25rem 1rem;' + 
  'border: solid 2px coral;' +
  'border-radius: 3px;' +
  'margin: 0.5rem;' +
  'font-size: 1rem;'
]);
```

## Reinvent styled-components

```js
const myStyled = (TargetComponent) => ([style]) => class extends React.Component {
  componentDidMount() {
    this.element.setAttribute('style', style);
  }

  render() {
    return (
      <TargetComponent {...this.props} ref={element => this.element = element } />
    );
  }
};

const Button = myStyled('button')`
  color: coral; 
  padding: 0.25rem 1rem; 
  border: solid 2px coral; 
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;
```

如果组件的style 基于props

```tsx
const primaryColor = 'coral';

const Button = styled('button')`
  background: ${({ primary }) => primary ? 'white ' : primaryColor};
  color: ${({ primary }) => primary ? primaryColor : 'white'}; 
  padding: 0.25rem 1rem; 
  border: solid 2px ${primaryColor}; 
  border-radius: 3px;
  margin: 0.5rem;
`;
```

实现：

```js
const myStyled = (TargetComponent) => (strs, ...exprs) => class extends React.Component {
  interpolateStyle() {
    const style = exprs.reduce((result, expr, index) => {
      const isFunc = typeof expr === 'function';
      const value = isFunc ? expr(this.props) : expr;
      
      return result + value + strs[index + 1];
    }, strs[0]);

    this.element.setAttribute('style', style);
  }

  componentDidMount() {
    this.interpolateStyle();
  }

  componentDidUpdate() {
    this.interpolateStyle();
  }

  render() {
    return <TargetComponent {...this.props} ref={element => this.element = element } />
  }
};

const primaryColor = 'coral';

const Button = myStyled('button')`
  background: ${({ primary }) => primary ? primaryColor : 'white'};
  color: ${({ primary }) => primary ? 'white' : primaryColor};
  padding: 0.25rem 1rem; 
  border: solid 2px ${primaryColor}; 
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;
```

## auto count

每次创建一个新的组件都会在内部创建count然后自增。


```tsx
counter++;
const componentId = 'sc-' + hash('sc' + counter);
```

```tsx
const Button = myStyled('button')`
  background: ${({ primary }) => primary ? primaryColor : 'white'};
  color: ${({ primary }) => primary ? 'white' : primaryColor};
  padding: 0.25rem 1rem; 
  border: solid 2px ${primaryColor}; 
  border-radius: 3px;
  margin: 0.5rem;
  font-size: 1rem;
`;
```

Button 定义完毕后就创建了一个新组件，styled-component会在HTML <head>标签中插入<style>标签，

```html
<style data-styled-components>
  /* sc-component-id: sc-bdVaJa */
</style>
```

当新的组件真正创建，会将componentId和TargetComponent放到static fields里面


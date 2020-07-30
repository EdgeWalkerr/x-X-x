# Rebass

ThemeProvider使用react context来将theme变成局部全局变量

```tsx
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
export default props =>
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
```

## Props

加载的顺序: 

1. variant
2. sx prop -> 和css一样的功能，可以使用theme中的变量
3. css prop
4. Styled System props

### sx

css works as 


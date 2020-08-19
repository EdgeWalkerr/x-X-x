import React, {
  useRef,
  useState,
} from 'react'
import {
  useCallbackHelper,
  useEffectWithPrev,
} from '@/hooks'
import ReactDOM from 'react-dom'
import {
  memo,
} from '@/utils/memo'
import {
  isClient,
  isServer,
} from '@/constants'

const style2String = (style) => Object.entries(style)
  .map(([k, v]) => `${k}:${v}`)
  .join(';')

let root
if (isClient) {
  const [html] = document.getElementsByTagName('html');
  [root] = document.getElementsByTagName('body')
  const app = document.getElementById('__APP')
  app.style = style2String({
    'overflow-y': 'scroll',
    height: '100%',
  })
  root.style = style2String({
    height: '100%',
    overflow: 'hidden',
  })
  html.style.height = '100%'
}

function Toast({
  visibility: passVisibility,
  onClose,
  time = 2000,
  children,
}) {
  const elementRef = useRef(document.createElement('div'))
  const [visibility, setVisibility] = useState(false)
  const onAnimationStart = useCallbackHelper(() => {
    root.style.position = 'relative'
    elementRef.current.style = style2String({
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.5,
      transition: 'opacity 1s',
    })
    root.appendChild(elementRef.current)
    setVisibility(true)
    setTimeout(() => {
      elementRef.current.style.opacity = 1
    })
    setTimeout(() => {
      setVisibility(false)
    }, time)
  }, {})
  const onAnimationEnd = useCallbackHelper((_, callback) => {
    elementRef.current.style.opacity = 0
    setTimeout(() => {
      root.removeChild(elementRef.current)
      setVisibility(false)
      callback()
    })
  }, {})
  useEffectWithPrev(
    ([prevVisibility]) => {
      console.log('toast worked outside!')
      if (passVisibility && !visibility) {
        console.log('toast worked inside!')
        let prevRootPosition
        if (prevVisibility) {
          onAnimationEnd(() => {
            onClose()
            root.style.position = prevRootPosition
          })
        } else {
          prevRootPosition = root.style.position
          onAnimationStart()
        }
      }
    },
    [visibility, passVisibility],
  )
  return visibility ? ReactDOM.createPortal(children, elementRef.current) : null
}

export default memo(Toast, ['visibility'])

import cn from 'classnames'
import React from 'react'
import './Button.scss'

export default function Button({ className, ...props }) {
  return <input type='button' {...props} className={cn(className, 'button')} />
}

import NextLink from 'next/link'
import React from 'react'

type LinkProps = {
    href: string
    children: React.ReactNode
    className?: string
}

export default function Link({href, children, className}: LinkProps) {
  return (
    <NextLink passHref className={className} href={href}>
      {children}
    </NextLink>
  )
}

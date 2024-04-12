import React from 'react'

export default function HorizontalScroll({ children, className }) {
    return (
        <div className={"flex items-center gap-x-4 py-2 overflow-x-scroll overflow-hidden no-scrollbar " + className}>
            {children}
        </div>
    )
}

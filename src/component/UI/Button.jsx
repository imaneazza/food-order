export default function Button({typeText, className='', children, ...props}) {
    const classes = typeText ? `${className} text-button` : `${className} button`

    return (<button className={classes} {...props}>{children}</button>)
}
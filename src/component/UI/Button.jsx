export default function Button({type, className, children, ...props}) {
    const classes = (type === 'text') ? `${className} text-button` : `${className} button`

    return (<button className={classes} {...props}>{children}</button>)
}
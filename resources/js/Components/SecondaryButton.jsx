import { Link } from '@inertiajs/react';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <Link
            as='button'
            type={type}
            {...props}
            className={
                `disabled:opacity-25 items-center px-4 py-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-md dark:hover:bg-neutral-800 hover:bg-neutral-200 font-medium text-sm transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

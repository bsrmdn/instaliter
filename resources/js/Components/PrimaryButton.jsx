import { Link } from '@inertiajs/react';

export default function PrimaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <Link
            as='button'
            type={type}
            {...props}
            className={
                `items-center px-4 py-1.5 rounded-md font-medium text-sm bg-sky-600 text-white hover:bg-sky-700 transition ease-in-out duration-150 ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

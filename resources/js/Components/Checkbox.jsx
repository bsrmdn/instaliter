export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-neutral-800 ' +
                className
            }
        />
    );
}

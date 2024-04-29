import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ show, children, maxWidth = '2xl', closeable = true, onClose = () => { }, modalRef }) {
    const close = () => {
        if (closeable) {
            onClose()
        }
    }

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(show)
    }, [show])


    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Transition show={open} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform"
                onClose={close}
                initialFocus={modalRef}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" >
                        <button
                            type="button"
                            className="absolute top-7 right-7 text-white"
                            ref={modalRef}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-slate-50 dark:bg-neutral-900 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-[calc(100vw-8rem)] max-h-[calc(100vh-4rem)] mx-auto ${maxWidth}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}

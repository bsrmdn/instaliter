import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import PrimaryButton from './PrimaryButton'
import Avatar from './Avatar'

export default function ModalCreate({ open, setOpen, cancelButtonRef }) {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative flex flex-col transform overflow-hidden rounded-lg w-5/6 h-[70vh] bg-neutral-900 text-left shadow-xl transition-all sm:my-8">
                                <div className="flex justify-between p-3 border-b border-gray-50 border-opacity-15">
                                    <button
                                        type="button"
                                        className="inline-flex self-center justify-center text-white"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        X
                                    </button>
                                    <Dialog.Title as="h3" className="text-base leading-6 text-white">
                                        Create new post
                                    </Dialog.Title>

                                    <button className='text-blue-500 hover:text-white text-sm font-bold'>Share</button>
                                </div>
                                <div className="flex grow text-white">
                                    <div className="flex grow items-center justify-center border-e border-gray-50 border-opacity-15">
                                        <PrimaryButton>
                                            Add image from computer
                                        </PrimaryButton>
                                    </div>
                                    <div className="w-5/12 px-4">

                                        <div className="my-4 flex items-center">
                                            <Avatar className={`w-9 me-3`} avatarOnly>
                                            </Avatar>
                                            <div className="text-sm">
                                                wewewewewewe
                                            </div>
                                        </div>
                                        <textarea name="caption" id="" className='border-0 bg-transparent w-full h-1/5 focus:ring-0 resize-none' placeholder='Write a caption...'></textarea>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

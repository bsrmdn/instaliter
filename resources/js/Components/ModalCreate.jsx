import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import PrimaryButton from './PrimaryButton'
import Avatar from './Avatar'
import { useForm } from '@inertiajs/react'

export default function ModalCreate({ open, setOpen, cancelButtonRef, user }) {
    const { data, setData, post, errors, reset, progress } = useForm({
        image: null,
        caption: null,
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route('post.store'), data)
        setOpen(false)
    }

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
                            <Dialog.Panel className="relative  transform overflow-hidden rounded-lg w-9/12 bg-slate-50 dark:bg-neutral-900 text-left shadow-xl transition-all sm:my-8">
                                <form className='flex flex-col h-[75vh]' onSubmit={handleSubmit} >
                                    {progress && <progress value={progress.percentage} max={100} className='w-full h-1' />}
                                    <div className="flex justify-between p-3 border-b dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15">
                                        <button
                                            type="button"
                                            className="inline-flex self-center justify-center dark:text-white"
                                            onClick={() => {
                                                setOpen(false)
                                                reset()
                                            }}
                                            ref={cancelButtonRef}
                                        >
                                            X
                                        </button>
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 dark:text-white">
                                            Create new post
                                        </Dialog.Title>

                                        <button type='submit' className='text-blue-500 hover:dark:text-white hover:text-black text-sm font-bold'>Share</button>
                                    </div>
                                    <div className="flex grow dark:text-white">
                                        <div className="flex flex-col grow items-center justify-center border-e dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15">
                                            <input id="hidden-input" type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                                            {data.image ?
                                                <div>{data.image[0]}</div>
                                                :
                                                <PrimaryButton type='button' onClick={() => document.getElementById("hidden-input").click()}>
                                                    {"Add image from computer"}
                                                </PrimaryButton>
                                            }
                                            {errors.image && <div className="bg-red-600 text-white text-center px-5"> image must be added</div>}
                                        </div>
                                        <div className="w-5/12 px-4">

                                            <div className="my-4 flex items-center">
                                                <Avatar className={`w-9 me-3`} avatarOnly>
                                                </Avatar>
                                                <div className="text-sm">
                                                    {user.name}
                                                </div>
                                            </div>
                                            <textarea className='border-0 bg-transparent w-full h-1/5 focus:ring-0 resize-none' placeholder='Write a caption...' onChange={e => setData('caption', e.target.value)} />
                                            {errors.caption && <div className="bg-red-600 text-white text-center"> caption must be added</div>}
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

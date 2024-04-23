import Avatar from '@/Components/Avatar'
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton'
import useFileReader from '@/Hooks/useFileReader';
import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react'

export default function UpdateAvatar({ className = '' }) {
    const user = usePage().props.auth.user

    const { data, setData, delete: destroy, reset } = useForm({ avatar: null })
    const fileDataURL = useFileReader(data.avatar)

    const handleSubmit = e => {
        e.preventDefault()
        router.post(route('profile.avatar.update'), {
            _method: 'patch',
            avatar: data.avatar,
        }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: reset()
        })
    }

    const deleteAvatar = e => {
        e.preventDefault();

        destroy(route('profile.avatar.destroy'), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <section className={className}>
            <form className="flex items-center w-full" onSubmit={handleSubmit}>

                <Avatar avatarURL={fileDataURL} avatar={!fileDataURL && user.avatar} username={user.username} avatarOnly className={'size-14'} />
                <div className="flex flex-col grow text-sm ms-3">
                    <span className='font-semibold text-left truncate w-36'>{user.username}</span>
                    <span className='text-gray-400 text-xs font-extralight text-left'>{user.name}</span>
                </div>
                <Dropdown>
                    <input id="hidden-input" type="file" className="hidden" onChange={e => setData('avatar', e.target.files[0])} />
                    {fileDataURL ?
                        <>
                            <PrimaryButton type='submit' button>Confirm</PrimaryButton>
                            <PrimaryButton className='bg-red-500 hover:bg-red-600 ms-4' button role='button' onClick={e => {
                                reset()
                                e.preventDefault()
                            }}>Cancel</PrimaryButton>

                        </>
                        :
                        <>
                            <Dropdown.Trigger>
                                <PrimaryButton button role='button' onClick={e => e.preventDefault()}>Change Avatar</PrimaryButton>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses='py-1 flex flex-col bg-white dark:bg-neutral-900 border dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15'>
                                <button type='button' onClick={e => document.getElementById("hidden-input").click(e.preventDefault())} className={`text-blue-500 hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15`}>
                                    Upload Photo
                                </button>
                                <button type='button' onClick={deleteAvatar} className={`text-red-500 hover:bg-gray-300 hover:bg-opacity-30 dark:hover:bg-gray-50 dark:hover:bg-opacity-15`}>
                                    Remove Avatar
                                </button>
                            </Dropdown.Content>
                        </>
                    }
                </Dropdown>
            </form>
        </section>
    )
}

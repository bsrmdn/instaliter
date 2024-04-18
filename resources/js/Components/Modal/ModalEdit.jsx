import { Dialog } from '@headlessui/react'
import PrimaryButton from '../PrimaryButton'
import Avatar from '../Avatar'
import { router, useForm } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'
import Modal from './Modal'


function ModalEdit({ post, open, setOpen }) {

    const { data, setData, patch, errors, reset, progress, processing } = useForm({
        image: null,
        caption: null,
    })
    const [fileDataURL, setFileDataURL] = useState(null);
    const modalRef = useRef(null)


    useEffect(() => {
        let fileReader, isCancel = false;
        if (data.image) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(data.image);
        } else {
            setFileDataURL(null)
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [data.image]);


    function handleSubmit(e) {
        e.preventDefault()
        router.post(route('posts.update', post.id), {
            _method: 'patch',
            image: data.image,
            caption: data.caption,
        }, {
            preserveScroll: true,
            preserveState: true,
        })
        setOpen(false)
        reset()
    }

    function onDropHandler(e) {
        e.preventDefault()
        setData('image', e.dataTransfer.files[0])
    }
    return (
        <Modal show={open} onClose={setOpen} modalRef={modalRef}>
            <form className='flex flex-col h-[75vh]' onSubmit={handleSubmit} onDrop={onDropHandler} onDragOver={e => e.preventDefault()}>
                {progress && <progress value={progress.percentage} max={100} className='w-full h-1' />}
                <div className="flex justify-between p-3 border-b dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15">
                    <button
                        type="button"
                        className="inline-flex self-center justify-center dark:text-white"
                        onClick={() => {
                            setOpen(false)
                            reset()
                        }}
                        ref={modalRef}
                    >
                        X
                    </button>
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 dark:text-white">
                        Edit post
                    </Dialog.Title>

                    <button type='submit' disabled={processing} className='text-blue-500 hover:dark:text-white hover:text-black text-sm font-bold'>Edit</button>
                </div>
                <div className="flex grow dark:text-white">
                    <div className="flex flex-col max-h-[70vh] w-7/12 p-4 grow items-center justify-center border-e dark:border-gray-50 border-gray-950 border-opacity-15 dark:border-opacity-15">
                        <input id="hidden-input" type="file" className="hidden" onChange={e => setData('image', e.target.files[0])} />
                        {fileDataURL ?
                            <>
                                <button type='button' className='flex self-end' onClick={() => reset("image")}>x</button>
                                <img src={fileDataURL} className='max-h-[80%]' />
                            </>
                            :
                            <>
                                <img src={`storage/${post && post.image}`} className='max-h-[80%]' />
                                <div className="text-center">
                                    <p>Change Image by drop file image here or</p>
                                    <PrimaryButton type='button' onClick={(e) => document.getElementById("hidden-input").click(e.preventDefault())}>
                                        Add from computer
                                    </PrimaryButton>
                                </div>
                            </>
                        }
                        {errors.image && <InputError message={"Image must be added"} />}
                    </div>
                    <div className="w-5/12 px-4">

                        <div className="my-4 flex items-center">
                            <Avatar className={`w-9 me-3`} avatarOnly>
                            </Avatar>
                            <div className="text-sm">
                                {post && post.user.name}
                            </div>
                        </div>
                        <textarea className='border-0 bg-transparent w-full h-1/5 focus:ring-0 resize-none' defaultValue={post && post.caption} placeholder='Write a caption...' onChange={e => setData('caption', e.target.value)} />
                        {errors.caption && <InputError message={"Caption must be added"} />}
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default ModalEdit
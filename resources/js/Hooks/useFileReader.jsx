import { useEffect, useState } from 'react'

export default function useFileReader(file) {
    const [fileDataURL, setFileDataURL] = useState(null)


    useEffect(() => {
        let fileReader, isCancel = false
        if (file) {
            fileReader = new FileReader()
            fileReader.onload = (e) => {
                const { result } = e.target
                if (result && !isCancel) {
                    setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file)
        } else {
            setFileDataURL(null)
        }
        return () => {
            isCancel = true
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort()
            }
        }

    }, [file])

    return fileDataURL
}
import Image from 'next/image';
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';

interface DropZoneProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}
const ImageUpload: React.FC<DropZoneProps> = ({
onChange,
label,
value,
disabled}) => {

    const [base64, setBase64] = useState(value)

    const handleChange = useCallback((base64: string)=>{
        onChange(base64)
    },[onChange])

    const handleDrop = useCallback((files: any) =>{
        const file =  files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            const base64 = event.target.result;
            setBase64(base64);
            handleChange(base64);
        }
        reader.readAsDataURL(file);
    }, [handleChange])

    const { getRootProps, getInputProps} = useDropzone({
        onDrop: handleDrop,
        maxFiles: 1,
        disabled,
        accept: {
            'image/jpg': [],
            'image/jpeg': [],
            'image/png': [],
        }
    });
    return (
        <div {...getRootProps({className: 'w-full p-4 text-black text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer hover:opacity-70'})}>
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
            {base64 && <div className='flex flex-col items-center justify-center'>
                 
                <Image
            src={base64}
            height="100"
            width="100"
            alt="Uploaded image"
          />
          <div className="flex items-center justify-center">Uploaded Image</div>
            </div> }
          
        </div>
      ) : (
        <p className="text-black">{label}</p>
      )}
    </div>
    )
}

export default ImageUpload

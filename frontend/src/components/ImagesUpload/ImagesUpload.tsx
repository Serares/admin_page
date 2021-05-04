import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import classes from './index.module.css';
import { BASE_IMAGE_URL } from '../../utils/environment';

export default function ImagesUpload(props: any) {
    const [isSaving, setIsSaving] = useState(false);
    const [isInitial, setIsInitial] = useState(true);
    const [errors, setErrors] = useState<Array<string>>([]);
    const { setUploadedImages, uploadedImages } = props;
    // in mb
    const maxFileSize = 5;
    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon"
    ];

    function validFileType(file: File) {
        return fileTypes.includes(file.type);
    };

    function returnFileSize(number: number) {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    };

    function validFileSize(file: File): boolean {
        return (file.size / 1024 / 1024) < maxFileSize;
    };

    function upload(formData: FormData) {
        const photos = formData.getAll('images');
        const promises = photos.map((file: any) => getImage(file)
            .then((base64Image) => {
                return {
                    id: Date.now(),
                    originalName: file.name,
                    fileName: file.name,
                    url: base64Image,
                    type: file.type
                }
            }));

        return Promise.all(promises);
    };

    function getImage(file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const fReader = new FileReader();
            const img = document.createElement('img');

            fReader.onload = () => {
                //@ts-ignore
                img.src = fReader.result;
                resolve(getBase64Image(img));
            }

            fReader.readAsDataURL(file);
        })
    };

    function getBase64Image(img: HTMLImageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        //@ts-ignore
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL('image/png');

        return dataURL;
    };
    const saveImages = (formData: FormData) => {
        upload(formData)
            .then(imageObject => {
                // const newUploadedImages = uploadedImages.slice();
                // newUploadedImages.push(imageObject);
                //@ts-ignore
                setUploadedImages([].concat(imageObject));
            })
            .catch(err => {
                console.log(err);
                setErrors([...errors, "Erroare la citirea imaginii"]);
            });
    };

    const handleInputChange = (event: any) => {
        // validate file size and file type
        const formData = new FormData();
        let fileList = event.target.files;
        if (!fileList.length) return;
        if (!Array.prototype.every.call(fileList, validFileType)) {
            setErrors([...errors, "Fisierul incarcat nu este o imagine"])
            //@ts-ignore
            alert(errors);
            return;
        }

        if (!Array.prototype.every.call(fileList, validFileSize)) {
            setErrors([...errors, "Imaginea are o marime prea mare, incarca imagini de maximi: " + maxFileSize + "mb"]);
            alert(errors);
            return;
        }

        // append the files to FormData
        let inputName = event.target.name;
        Array
            .from(Array(fileList.length).keys())
            .map(x => {
                formData.append(inputName, fileList[x], fileList[x].name);
            });
        // save it
        saveImages(formData);
    };

    const handleDeleteImage = (imageId: string) => {
        // first filter out the image from this.uploadedFiles
        setUploadedImages(uploadedImages.filter((value: any) => { return value.id !== imageId }));
    };

    const renderThumbnails = () => {
        return uploadedImages.map((item: any) => {
            return <img className={`img-thumbnail ${classes.Thumbnail}`} src={item.url || `${BASE_IMAGE_URL(item)}`} alt={item.originalName} key={item.originalName} onClick={() => { handleDeleteImage(item.id) }} />
        })
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <input name="images" disabled={isSaving} onChange={handleInputChange} accept="image/*" multiple
                        type="file" id="fileupload-example-1"
                        className="hide" />
                    {isInitial && <label className="fileupload_label" htmlFor="fileupload-example-1">Apasa pentru a incarca</label>}
                </Grid>
                <Grid item xs={12}>
                    {uploadedImages.length > 0 &&
                        <div>
                            {renderThumbnails()}
                        </div>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

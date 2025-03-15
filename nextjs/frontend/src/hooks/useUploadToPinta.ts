import useLoading from "./useLoading"
interface PintaUpload {
    file: File,
    url: string,

}
const useUploadToPinta = ({ file }: PintaUpload) => {
    const {isLoading, startLoading, stopLoading} = useLoading()

    const uploadFile = async () => {
        try {
            if(!file) {
                alert("no file to upload")
                return;
            } 

            startLoading();
            const data = new FormData();
            data.set('file', file);
            const uploadFile = await fetch('/api/files', {
                method: 'POST',
                body: data
            });

            const signedURL = await uploadFile.json()
            stopLoading();
            return signedURL;

        } catch (error) {
            console.log(error);
            stopLoading();
        }

        

    }
    return { uploadFile, isLoading }
}

export default useUploadToPinta;
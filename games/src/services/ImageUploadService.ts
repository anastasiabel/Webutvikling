import axios from "axios";

export const IMG_FOLDER = 'https://localhost:7053/images';

const ImageUploadService = (
    () => {

        const imageUploadEndpoint = "https://localhost:7053/uploadimage";
        const uploadImage = async (image: File) => {
            const formData = new FormData();
            formData.append("file", image);

            const resultat = await axios({
                url: imageUploadEndpoint, 
                method: "POST",
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            });
            formData.delete("file");
        }

        return {
            uploadImage
        }
    }
)();
export default ImageUploadService;
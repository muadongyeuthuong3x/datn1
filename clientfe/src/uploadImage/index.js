import axios from 'axios'
export const UploadFileCloudinary = async (data) => {
    const formDataFile = new FormData();
    console.log(data)
    formDataFile.append('file', data);
    formDataFile.append('upload_preset', `atx6ldkq`);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/oke-nhe/image/upload`, formDataFile)
    return res.data.secure_url;
}
export const UploadMuitiFie = async (listFile) => {
    const result = []
    await Promise.all(
        listFile.map(async (e) => {
            const dataRes = await UploadFileCloudinary(e?.originFileObj);
            return result.push(dataRes)
        }))
    return result
}
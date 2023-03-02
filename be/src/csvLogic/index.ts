import { extname, join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

export const csvFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.xlsx$/)) {
        return callback(new Error('Only  xlsx files are allowed!'), false);
    }
    callback(null, true);
};

export const csvFileName = (req, file, callback) => {
    callback(null, `${file.originalname}`);
};

export const getCSVFile = (fileName: string) => {
    const filePath = path.resolve(
        __dirname,
        '..',
        '..',
        'upload/',
        fileName,
    );


    return filePath.toString();
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};

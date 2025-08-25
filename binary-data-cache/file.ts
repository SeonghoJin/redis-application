import fs from 'node:fs';

export function fileToBin(filePath: string) {
    return new Promise<Buffer>(resolve => {
        fs.readFile(filePath, (_, data) => resolve(data));
    })
}

export function binToFile(binaryData: string | Buffer, outputPath: string) {
    return new Promise<void>((resolve, reject) => {
        // 이미 Buffer인 경우 그대로 사용, 문자열인 경우에만 변환
        const buffer = Buffer.isBuffer(binaryData) ? binaryData : Buffer.from(binaryData, 'base64');

        fs.writeFile(outputPath, buffer, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}
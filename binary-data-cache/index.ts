import { client } from "../common/index.js";
import { binToFile, fileToBin } from "./file.js"

// 이미지를 Redis에 저장 (주석 해제하여 실행)
// (async () => {
//     const imageBuffer = await fileToBin('binary-data-cache\\public\\download.jfif');
//     console.log('Image buffer length:', imageBuffer.length);

//     // Buffer를 base64로 인코딩하여 저장
//     await client.set('image', imageBuffer.toString('base64'));
//     console.log('Image saved to Redis');
// })()

(async () => {
    const data = await client.get('image');

    if (data) {
        // base64로 저장된 데이터를 Buffer로 변환
        const imageBuffer = Buffer.from(data, 'base64');
        await binToFile(imageBuffer, 'binary-data-cache\\output\\test-image.jfif');
        console.log('Image saved to output path');
    } else {
        console.log('No image data found in Redis');
    }
})()
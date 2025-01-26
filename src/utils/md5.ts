'use server'
import 'server-only'
import crypto from 'crypto';

export async function formFileMD5(file :File) {
    // const file = formData.get('file') as File;
    // const hash = crypto.createHash('md5');
    // hash.update(Buffer.from(await file.arrayBuffer()))

    const buffer = await file.arrayBuffer();
    return  crypto.createHash("md5").update(Buffer.from(buffer)).digest('hex');
}
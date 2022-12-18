import path from 'path';
import sanitize from 'sanitize-filename';
import youtubeDl from 'youtube-dl-exec';
import { TMP_PATH } from './config';

export function videoFileName({ title, ext }: Awaited<ReturnType<typeof youtubeDl>>) {
    return `${sanitize(title, { replacement: ' ' })}.${ext}`.replaceAll(' ', '_');
}

export function downloadPath({ id }: Awaited<ReturnType<typeof youtubeDl>>) {
    return path.join(TMP_PATH, id);
}

export function videoFilePath(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    return path.join(downloadPath(ytVideo), videoFileName(ytVideo));
}

export function manifestFilePath(ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    return path.join(downloadPath(ytVideo), 'manifest.json');
}

export function generateIPFSManifest(cid: string, ytVideo: Awaited<ReturnType<typeof youtubeDl>>) {
    const {
        acodec,
        asr,
        description,
        duration,
        ext,
        format_id,
        format_note,
        format,
        fps,
        height,
        id,
        protocol,
        tbr,
        thumbnail,
        title,
        vcodec,
        webpage_url,
        width
    } = ytVideo;

    return {
        acodec,
        asr,
        cid,
        description,
        duration,
        ext,
        format_id,
        format_note,
        format,
        fps,
        height,
        id,
        protocol,
        tbr,
        thumbnail,
        title,
        vcodec,
        webpage_url,
        width
    };
}

function removeMediaAndErrors(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => removeMediaAndErrors(item));
    }

    const keysToRemove = ['error', 'thumbnail', 'thumbnailError', 'videoURL', 'videoName', 'videoError', 'path', 'preview'];

    const newObj = {};
    for (const key in obj) {
        if (key === 'file') {
            newObj[key] = null;
        } else if (keysToRemove.includes(key)) {
            newObj[key] = '';
        } else {
            newObj[key] = removeMediaAndErrors(obj[key]);
        }
    }

    return newObj;
}

export default removeMediaAndErrors;
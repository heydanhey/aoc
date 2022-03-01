export function dataToArray(data) {
    return data.split(/\n/);
}

export function getFileName(url) {
    return new URL(url)
        .pathname
        .split('/')
        .pop()
        .split('.')
        .shift()
}


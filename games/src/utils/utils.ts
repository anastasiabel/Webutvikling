// https://stackoverflow.com/questions/1301512/truncate-a-string-straight-javascript
export const trim = (length : number, text? : string) => {
    if (!text) return '';
    
    if (text.length > length) {
        return text.substring(0, length) + '...';
    } else {
        return text;
    }
}


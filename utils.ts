export const getImagePath = (imageURL: string, width: string = "w500") => {
    return `http://image.tmdb.org/t/p/${width}${imageURL}`;
}
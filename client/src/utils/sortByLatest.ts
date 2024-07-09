import { Article } from "../store/atoms/currentUserArticles";

export default function sortByLatest(array: Article[]) : Article[] {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
          if (array[j].createdAt < array[j+1].createdAt) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
    }
    return array
}
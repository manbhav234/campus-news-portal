import { Article } from "../store/atoms/currentUserArticles";

export default function sortByLatest(toBeSorted: Article[]) : Article[] {
    for (let i = 0; i <= toBeSorted.length - 1; i++) {
        let j = i;
        while (j > 0 && toBeSorted[j - 1].createdAt <  toBeSorted[j].createdAt) {
            let temp = toBeSorted[j - 1];
            toBeSorted[j - 1] = toBeSorted[j];
            toBeSorted[j] = temp;
            j--;
        }
    }
    return toBeSorted
}
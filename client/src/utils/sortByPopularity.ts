import { Article } from "../store/atoms/currentUserArticles";

export default function sortByPopularity(array: Article[]) : Article[] {
    const popularity : Number[] = []
    array.map((article)=>{
        const noOfComments = article.comments.length
        let noOfReactions = 0;
        article.reactions.map((reaction)=>{noOfReactions += reaction.count})
        popularity.push(noOfComments + noOfReactions)
    })
    for (let i = 0; i < array.length-1; i++){
        let j = i;
        while (j > 0 && popularity[j - 1] <  popularity[j]) {
            let temp = array[j - 1];
            array[j - 1] = array[j];
            array[j] = temp;
            j--;
        }
    }
    return array
}
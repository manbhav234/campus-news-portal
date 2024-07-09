import { Article } from "../store/atoms/currentUserArticles";

export default function sortByPopularity(array: Article[]) : Article[] {
    const popularity : Number[] = []
    array.map((article)=>{
        const noOfComments = article.comments.length
        let noOfReactions = 0;
        article.reactions.map((reaction)=>{noOfReactions += reaction.count})
        popularity.push(noOfComments + noOfReactions)
    })
    console.log(popularity)
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
          if (popularity[j] < popularity[j+1]) {
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
          }
        }
    }
    return array
}
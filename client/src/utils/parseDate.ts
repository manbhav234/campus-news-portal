export default function parseDate(date: number) : string {
    return new Date(date).toString().split(' ').slice(1,4).join(' ')
}
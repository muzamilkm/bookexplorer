// nyt api types

export interface NYTReview {
    url: string
    publication_dt: string
    byline: string
    book_title: string
    book_author: string
    summary: string
}

export interface NYTReviewResponse {
    status: string
    num_results: number
    results: NYTReview[]
}

export interface NYTBestsellerBook {
    rank: number
    title: string
    author: string
    description: string
    primary_isbn13: string
    book_image: string
}

export interface NYTBestsellerList {
    list_name: string
    books: NYTBestsellerBook[]
}

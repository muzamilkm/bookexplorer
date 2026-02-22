// nyt article search types

export interface NYTArticle {
    headline: { main: string }
    abstract: string
    byline: { original: string }
    web_url: string
    pub_date: string
}

export interface NYTSearchResponse {
    status: string
    response: {
        docs: NYTArticle[]
    }
}

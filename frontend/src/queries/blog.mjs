export const BLOG_QUERY = `
  query Blog($limit: Int!, $offset: Int!) {
    blogEntries(limit: 1) {
      ... on page_Entry {
        id
        slug
        title
        pageSubheading
        pageContent {
          html
          chunks {
            __typename
            ... on image_Entry {
              title
              url
              image {
                url
                width
                height
              }
            }
            ... on callout_Entry {
              title,
              pageContent {
                html
              }
            }
            ... on blockquote_Entry {
              blockquote
              quoteAuthor
              quoteImage {
                url
                width
                height
              }
            }
            ... on CkeditorMarkup {
              html
            }
          }
        }
      }
    }
    blogPostsEntries(limit: $limit, offset: $offset) {
      ... on page_Entry {
        id
        slug
        title
        uri
        pageSubheading
        postDate @formatDateTime(format: "F j, Y")
        image {
          id
          alt
          url @transform(handle: "hero")
        }
      }
    }
    entryCount(section: "blogPosts")
  }
`

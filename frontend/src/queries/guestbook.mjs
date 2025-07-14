export const GUESTBOOK_QUERY = `
  query Guestbook {
    guestbookEntries: entries(section: "guestbook", limit: 1) {
      ... on page_Entry {
        id
        title
        pageSubheading
        authorId
        pageContent {
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
              title
              pageContent {
                html
              }
            }
            ... on CkeditorMarkup {
              html
            }
          }
        }
      }
    }
  }
`
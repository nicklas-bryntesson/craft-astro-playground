export const HOME_QUERY = `
  query Home {
    entry(section: "home", limit: 1) {
      ... on page_Entry {
        id
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
        image {
          url @transform(handle: "hero")
          alt
        }
      }
    }
  }
`
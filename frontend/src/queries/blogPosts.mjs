export const BLOG_POSTS_QUERY = `
  query BlogPosts($slug: [String]) {
    blogPostsEntries(slug: $slug) {
      ... on page_Entry {
        id
        slug
        title
        pageSubheading
        pageContent {
          html,
          chunks {
            __typename
            ... on image_Entry {
              title,
              url,
              image {
                url,
                width,
                height
              }
            },
            ... on callout_Entry {
              title,
              pageContent {
                html
              }
            },
            ... on CkeditorMarkup {
              html
            }
          }
        }
        authorName
        authorId
        postDate @formatDateTime(format: "F j, Y")
        image {
          alt
          url @transform(handle: "hero")
        }
        next(section: "blogPosts") {
          id
          slug
          uri
          title
          postDate @formatDateTime(format: "F j, Y")
        }
        prev(section: "blogPosts") {
          id
          slug
          uri
          title
          postDate @formatDateTime(format: "F j, Y")
        }
        category {
          ... on category_Entry {
            id
            title
          }
        }
      }
    }
  }
`

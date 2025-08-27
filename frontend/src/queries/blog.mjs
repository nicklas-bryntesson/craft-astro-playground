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
              quoteTextSize
              quoteLinkUrl
              quoteImage {
                alt
                avatar: url @transform(handle: "squareAvatar")
                avatarWidth: width @transform(handle: "squareAvatar")
                avatarHeight: height @transform(handle: "squareAvatar")
                blur: url @transform(handle: "squareAvatarBlur")
                blurWidth: width @transform(handle: "squareAvatarBlur")
                blurHeight: height @transform(handle: "squareAvatarBlur")
              }
            }
            ... on textWithImage_Entry {
              title
              textContentBlock {
                html
              }
              verticalTextAlignment
              image {
                url
                width
                height
              }
              aspectRatio
              horisontalImageAlignment
              blockLayout
              blockSurface {
                class
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

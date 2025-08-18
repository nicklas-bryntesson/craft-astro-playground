export const PAGE_QUERY = `
  query PageEntry($uri: [String]!) {
    entry(uri: $uri) {
      ancestors {
        id
        title
        uri
      }
      children {
        id
        title
        uri
      }
      ... on page_Entry {
        id
        title
        uri
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
            ... on blockquote_Entry {
              blockquote
              quoteAuthor
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
`;

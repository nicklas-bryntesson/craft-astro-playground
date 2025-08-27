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
                alt
                mainImageUrl: url @transform(handle: "squareAvatar")
                mainImageWidth: width @transform(handle: "squareAvatar")
                mainImageHeight: height @transform(handle: "squareAvatar")
                blur: url @transform(handle: "squareAvatarBlur")
                blurWidth: width @transform(handle: "squareAvatarBlur")
                blurHeight: height @transform(handle: "squareAvatarBlur")
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
        image {
          url @transform(handle: "hero")
          alt
        }
      }
    }
  }
`;

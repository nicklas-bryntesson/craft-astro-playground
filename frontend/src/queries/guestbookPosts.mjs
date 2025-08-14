export const GUESTBOOK_POSTS_QUERY = `
  query GuestbookPosts($limit: Int!, $offset: Int!) {
    guestbookPostsEntries(limit: $limit, offset: $offset) {
      ... on text_Entry {
        id
        title
        textBlock {
          html
        }
        postDate @formatDateTime(format: "F j, Y")
      }
    }
    entryCount(section: "guestbookPosts")
  }
`
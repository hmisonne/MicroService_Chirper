export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, createdAt } = tweet
  const { name, avatarURL } = author
  const author_id = author.id

  return {
    author_id,
    name,
    id,
    timestamp: createdAt,
    text,
    avatar: avatarURL,
    likes: !likes ? 0 : likes.length,
    replies: !replies ? 0 : replies.length,
    hasLiked: !likes ? false : likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}
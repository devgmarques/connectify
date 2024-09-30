type FollowFollowing = {
  followedId: string
}

export type Follow = {
  following: FollowFollowing[]
  _count: {
    followersAmount: number
    followingAmount: number
  }
}

import type { LikeableEntity } from '../types/api';

export function updateLikes<T extends LikeableEntity>(
  entity: T,
  userId: string
): T {
  const likedBy = [...entity.likedBy];
  const index = likedBy.indexOf(userId);

  if (index === -1) {
    likedBy.push(userId);
  } else {
    likedBy.splice(index, 1);
  }

  return {
    ...entity,
    likedBy,
    likesCount: likedBy.length,
  };
}

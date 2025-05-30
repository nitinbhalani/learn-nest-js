import { SetMetadata } from '@nestjs/common';

export const Test = () => {
  return SetMetadata('isPublic', true);
};

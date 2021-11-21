import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const SkipAuth = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);

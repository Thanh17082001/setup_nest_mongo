import { SetMetadata } from '@nestjs/common';
import { AppAbility } from './casl-ability.factory/casl-ability.factory';

export const CHECK_POLICIES_KEY = 'check_policies';
export const CheckPolicies = (...handlers: ((ability: AppAbility) => boolean)[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers);

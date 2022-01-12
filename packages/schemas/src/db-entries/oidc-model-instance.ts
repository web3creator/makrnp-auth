// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import { z } from 'zod';

import {
  OidcModelInstancePayload,
  oidcModelInstancePayloadGuard,
  GeneratedSchema,
  Guard,
} from '../foundations';

export type OidcModelInstanceUpdate = {
  modelName: string;
  id: string;
  payload: OidcModelInstancePayload;
  expiresAt: number;
  consumedAt?: number | null;
};

export type OidcModelInstance = {
  modelName: string;
  id: string;
  payload: OidcModelInstancePayload;
  expiresAt: number;
  consumedAt: number | null;
};

const guard: Guard<OidcModelInstanceUpdate> = z.object({
  modelName: z.string(),
  id: z.string(),
  payload: oidcModelInstancePayloadGuard,
  expiresAt: z.number(),
  consumedAt: z.number().optional(),
});

export const OidcModelInstances: GeneratedSchema<OidcModelInstanceUpdate> = Object.freeze({
  table: 'oidc_model_instances',
  tableSingular: 'oidc_model_instance',
  fields: {
    modelName: 'model_name',
    id: 'id',
    payload: 'payload',
    expiresAt: 'expires_at',
    consumedAt: 'consumed_at',
  },
  fieldKeys: ['modelName', 'id', 'payload', 'expiresAt', 'consumedAt'],
  guard,
});

import { conditionalString } from '@silverhand/essentials';
import camelcase from 'camelcase';
import pluralize from 'pluralize';

import { TableWithType } from './types';

export const generateSchema = ({ name, fields }: TableWithType) => {
  const modelName = pluralize(camelcase(name, { pascalCase: true }), 1);
  const databaseEntryType = `${modelName}Update`;
  return [
    `export type ${databaseEntryType} = {`,
    ...fields.map(
      ({ name, type, isArray, nullable, hasDefaultValue }) =>
        `  ${camelcase(name)}${conditionalString(
          (nullable || hasDefaultValue) && '?'
        )}: ${type}${conditionalString(isArray && '[]')}${conditionalString(
          nullable && !hasDefaultValue && ' | null'
        )};`
    ),
    '};',
    '',
    `export type ${modelName} = {`,
    ...fields.map(
      ({ name, type, isArray, nullable, hasDefaultValue }) =>
        `  ${camelcase(name)}: ${type}${conditionalString(isArray && '[]')}${
          nullable && !hasDefaultValue ? ' | null' : ''
        };`
    ),
    '};',
    '',
    `const guard: Guard<${databaseEntryType}> = z.object({`,
    ...fields.map(({ name, type, isArray, isEnum, nullable, hasDefaultValue, tsType }) => {
      if (tsType) {
        return `  ${camelcase(name)}: ${camelcase(tsType)}Guard${conditionalString(
          (nullable || hasDefaultValue) && '.optional()'
        )},`;
      }

      return `  ${camelcase(name)}: z.${
        isEnum ? `nativeEnum(${type})` : `${type}()`
      }${conditionalString(isArray && '.array()')}${conditionalString(
        (nullable || hasDefaultValue) && '.optional()'
      )},`;
    }),
    '  });',
    '',
    `export const ${camelcase(name, {
      pascalCase: true,
    })}: GeneratedSchema<${databaseEntryType}> = Object.freeze({`,
    `  table: '${name}',`,
    `  tableSingular: '${pluralize(name, 1)}',`,
    '  fields: {',
    ...fields.map(({ name }) => `    ${camelcase(name)}: '${name}',`),
    '  },',
    '  fieldKeys: [',
    ...fields.map(({ name }) => `    '${camelcase(name)}',`),
    '  ],',
    '  guard,',
    '});',
  ].join('\n');
};

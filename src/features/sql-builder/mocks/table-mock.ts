// Entities
import { ColumnTypesE } from '@entities/sql-builder';

export enum ColumnsFieldsE {
  ID = 'id',
  USER_EMAIL = 'user_email',
  USER_FIRST_NAME = 'user_first_name',
  USER_LAST_NAME = 'user_last_name',
  SCREEN_WIDTH = 'screen_width',
  SCREEN_HEIGHT = 'screen_height',
  VISITS = 'visits',
  PAGE_RESPONSE = 'page_response',
  DOMAIN = 'domain',
  PATH = 'path',
}

export const TABLE_MOCK = {
  label: 'Sessions',
  value: 'sessions',
  columns: [
    { value: ColumnsFieldsE.USER_EMAIL, label: 'User Email', type: ColumnTypesE.STRING },
    { value: ColumnsFieldsE.SCREEN_WIDTH, label: 'Screen Width', type: ColumnTypesE.NUMBER },
    { value: ColumnsFieldsE.SCREEN_HEIGHT, label: 'Screen Height', type: ColumnTypesE.NUMBER },
    { value: ColumnsFieldsE.VISITS, label: '# of Visits', type: ColumnTypesE.NUMBER },
    { value: ColumnsFieldsE.USER_FIRST_NAME, label: 'First Name', type: ColumnTypesE.STRING },
    { value: ColumnsFieldsE.USER_LAST_NAME, label: 'Last Name', type: ColumnTypesE.STRING },
    {
      value: ColumnsFieldsE.PAGE_RESPONSE,
      label: 'Page Response time (ms)',
      type: ColumnTypesE.NUMBER,
    },
    { value: ColumnsFieldsE.DOMAIN, label: 'Domain', type: ColumnTypesE.STRING },
    { value: ColumnsFieldsE.PATH, label: 'Page Path', type: ColumnTypesE.STRING },
  ],
};

import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server'

export const searchParams = {
  query: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
}

export const searchParamsCache = createSearchParamsCache(searchParams)
export const serialize = createSerializer(searchParams)

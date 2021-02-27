import { parseISO, lightFormat } from 'date-fns';

export const parseDate = (value) => {
  try {
    const dateInstance = parseISO(value);
    return lightFormat(dateInstance, 'dd.MM.yyyy');
  } catch (e) {
    return e?.message;
  }
};

export const parseAmount = (value) => {
  return new Intl.NumberFormat('ru-RU').format(value);
};

export const getAndParseValue = (value, key) => {
  if (key === 'date') {
    return parseDate(value[key]);
  }
  if (key === 'amount') {
    return parseAmount(value[key]);
  }

  return value[key];
};

const CACHE = 'CACHE';
export const getCache = () => {
  try {
    return JSON.parse(localStorage.getItem(CACHE));
  } catch (e) {
    console.error(`error load cache: ${e?.message}`);
    return null;
  }
};

export const setCache = (data) => {
  localStorage.setItem(CACHE, JSON.stringify(data));
};

export const clearCache = () => {
  localStorage.clear(CACHE);
};

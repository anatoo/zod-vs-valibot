import { string, parse } from 'valibot';

const a = string();
console.log(parse(a, "hoge"));
import { string } from 'zod';

const a = string();
console.log(a.parse("hoge"));
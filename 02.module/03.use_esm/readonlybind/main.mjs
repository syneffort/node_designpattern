import { count, increment } from "./counter.mjs";

console.log(count);
increment();
console.log(count);
// count++; // 에러 발생. import된 값는 읽기전용 처리됨
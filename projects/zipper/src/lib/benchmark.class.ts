import { BehaviorSubject } from "rxjs";
import { CompressAlgorithm } from "./algorithm.class";

export class Benchmark {
  time: BehaviorSubject<number> = new BehaviorSubject(0);
  success: BehaviorSubject<number> = new BehaviorSubject(0);
  total: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor (
    public algorithm: CompressAlgorithm,
  ) {}

  run (runs: number) {
    const start = performance.now();
    while (runs--) {
      try {
        this.total.next(this.total.getValue() + 1);
        if (this.algorithm.run('uuueeeennzzzzz') === 'u3e4nnz5') {
          this.success.next(this.success.getValue() + 1);
        }
      } catch (e) {}
      this.time.next(performance.now() - start);
    }
  }
}

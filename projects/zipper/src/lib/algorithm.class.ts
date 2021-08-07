
export class CompressAlgorithm {
  constructor (
    public name: string,
    public algorithm: (input: string) => string,
  ) {}

  run (input: string): string {
    return this.algorithm(input);
  }
}

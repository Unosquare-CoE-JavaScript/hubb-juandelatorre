import { Injectable } from '@angular/core';
import { CompressAlgorithm } from 'projects/zipper/src/api';

@Injectable()
export class AlgorithmsService {
  private algorithms: CompressAlgorithm[] = [];

  constructor() { }

  getAlgorithmsList (): CompressAlgorithm[] {
    return [ ...this.algorithms ];
  }
}

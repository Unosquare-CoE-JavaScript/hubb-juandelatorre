import { Component, OnInit } from '@angular/core';
import { Benchmark, CompressAlgorithm } from 'projects/zipper/src/api';
import { AlgorithmsService } from '../algorithms/algorithms.service';

@Component({
  selector: 'app-benchmarks',
  templateUrl: './benchmarks.component.html',
  styleUrls: ['./benchmarks.component.scss']
})
export class BenchmarksComponent implements OnInit {
  benchmarks!: { bench: Benchmark, algo: CompressAlgorithm }[]
  constructor (
    private algoService: AlgorithmsService
  ) {
    this.benchmarks = algoService.getAlgorithmsList()
      .map(algo => {
        const bench = { algo, bench: new Benchmark(algo) };
        bench.bench.run(1e3);
        return bench;
      })
  }

  ngOnInit(): void {
  }

}

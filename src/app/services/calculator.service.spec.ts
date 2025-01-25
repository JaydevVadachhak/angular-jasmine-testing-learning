import { TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';
import { LoggerService } from './logger.service';

describe('CalculatorService', () => {
  let calcService: CalculatorService;
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    calcService = TestBed.inject(CalculatorService);
    loggerService = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(calcService).toBeTruthy();
  });

  it('should add two numbers', () => {
    spyOn(loggerService, 'log');
    expect(calcService.add(10, 20)).toBe(30);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    spyOn(loggerService, 'log');
    expect(calcService.subtract(20, 10)).toBe(10);
    expect(loggerService.log).toHaveBeenCalledTimes(1);
  });
});

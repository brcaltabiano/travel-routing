const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { calculateBestRoute } = require('../features/queries/repository');
const { insertTrace } = require('../features/traces/repository');
const {
  defaultRoutes,
  defaultExpectedRoutes,
  newTraces,
  newExpectedRoutes,
} = require('./constants');

const inputPath = path.join(__dirname, '../input-routes.csv');

fs.writeFileSync(inputPath, defaultRoutes, {
  encoding: 'utf-8',
});

describe('Cheapest travel routes', () => {
  defaultExpectedRoutes.forEach(t => {
    describe(`${t.origin}-${t.destiny}`, () => {
      it(`should return ${t.answer}`, () => {
        assert.equal(calculateBestRoute(t.origin, t.destiny), t.answer);
      });
    });
  });
});

describe('Adding new routes', () => {
  newTraces.forEach(trace => {
    const csvLine = `${trace.origin},${trace.destiny},${trace.cost}`;
    it(`should append ${csvLine} to input-routes.csv`, () => {
      insertTrace(trace);
      assert.equal(fs.readFileSync(inputPath, { encoding: 'utf-8' }).includes(csvLine), true);
    });
  });
});

describe('Previous queries should change', () => {
  newExpectedRoutes.forEach(t => {
    describe(`${t.origin}-${t.destiny}`, () => {
      it(`should return ${t.answer}`, () => {
        assert.equal(calculateBestRoute(t.origin, t.destiny), t.answer);
      });
    });
  });
});

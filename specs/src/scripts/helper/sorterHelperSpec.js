import descendingByRating from '../../../../src/scripts/helper/sorter-helper';

describe('Sorter Helper #descendingByRating', () => {
  it('must return 0 if sorter method is called without parameters', () => {
    expect(descendingByRating()).toBe(0);
  });

  it('must return 0 if sorter method is called with same parameters', () => {
    const restaurant = { rating: 4 };
    expect(descendingByRating(restaurant, restaurant)).toBe(0);
  });

  it('must return -1 if first rating grater than second rating', () => {
    const restaurant1 = { rating: 5 };
    const restaurant2 = { rating: 4 };
    expect(descendingByRating(restaurant1, restaurant2)).toBe(-1);
  });

  it('must return 1 if first rating less than second rating', () => {
    const restaurant1 = { rating: 4 };
    const restaurant2 = { rating: 5 };
    expect(descendingByRating(restaurant1, restaurant2)).toBe(1);
  });
});

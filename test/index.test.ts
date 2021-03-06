import { Paginate } from '../src';

describe('test the constructor', () => {
  it('should error if the array parameter is not an array', () => {
    expect(() => {
      new Paginate({ foo: 'bar' } as any, 2);
    }).toThrowError('You must pass in a valid Array object!');
  });

  it('should error if the size parameter is not a number', () => {
    expect(() => {
      new Paginate([1, 2, 3, 4], '2' as any);
    }).toThrowError('You must pass in a valid number for the page size!');
  });

  it('should never error', () => {
    expect(() => {
      new Paginate([1, 2, 3], 3);
    }).not.toThrowError();
  });
});

describe('Paginate#setArray', () => {
  it('should error if the array parameter is not an array', () => {
    expect(() => {
      new Paginate()
        .setArray({ foo: 'bar' } as any);
    }).toThrowError('You must pass in a valid Array object!');
  });

  it('should error if no elements in array', () => {
    expect(() => {
      new Paginate()
        .setArray([]);
    }).toThrowError('There must be at least (1) one element in the array!');
  });

  it('should be truthy if valid array is provided', () => {
    const paginated = new Paginate();
    expect(paginated.setArray([1, 2, 3])).toBeTruthy();
  });
});

describe('Paginate#setSize', () => {
  it('should error if the size parameter is not a number', () => {
    expect(() => {
      new Paginate()
        .setSize('2' as any);
    }).toThrowError('You must pass in a valid number for the page size!');
  });

  it('should error if the size per page is less than one', () => {
    expect(() => {
      new Paginate()
        .setSize(-1);
    }).toThrowError('The size of elements per page must be at least (1) one!');
  });

  it('should error if size per page is greater than array length', () => {
    expect(() => {
      new Paginate()
        .setArray([1, 2, 3])
        .setSize(4);
    }).toThrowError('The size of elements per page cannot be greater than the elements in the array!');
  });

  it('should be truthy if valid size is provided', () => {
    const paginated = new Paginate();
    paginated.setArray([1, 2, 3]);
    expect(paginated.setSize(3)).toBeTruthy();
  });
});

describe('Paginate#getPaginatedArray', () => {
  it('the number "3" should be on the second page', () => {
    const paginated = new Paginate([1, 2, 3, 4], 2);
    const pages = paginated.getPaginatedArray();
    expect(pages[1]).toContain(3);
  });
});

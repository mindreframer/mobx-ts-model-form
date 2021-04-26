import { FormArray, FormControl } from './internal';

describe('FormArray', () => {
  it('allows array-like operations', async () => {
    const newItem = (v: string) => {
      return new FormControl<string>(v);
    };
    const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2')], {});

    // add 3 at tail
    array.push(newItem('3'));
    expect(array.getValue()).toStrictEqual(['1', '2', '3']);

    // remove 1
    array.shift();
    expect(array.getValue()).toStrictEqual(['2', '3']);

    // add 1 upfront
    array.unshift(newItem('1'));
    expect(array.getValue()).toStrictEqual(['1', '2', '3']);

    // remove an item at position 1
    const midItem = array.get(1);
    expect(array.indexOf(midItem)).toBe(1);
    array.splice(array.indexOf(midItem), 1);
    expect(array.getValue()).toStrictEqual(['1', '3']);

    // insert an item at position 1
    array.splice(1, 0, newItem('2'));
    expect(array.getValue()).toStrictEqual(['1', '2', '3']);
  });
});

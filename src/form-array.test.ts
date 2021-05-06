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

  it('provides some extra functions for arrays', async () => {
    const newItem = (v: string) => {
      return new FormControl<string>(v);
    };
    const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2')], {});
    array.insertAt(1, newItem('3'));
    expect(array.getValue()).toStrictEqual(['1', '3', '2']);
    array.remove(array.get(1));
    expect(array.getValue()).toStrictEqual(['1', '2']);

    array.removeAt(1);
    expect(array.getValue()).toStrictEqual(['1']);
    array.removeAt(1);
    expect(array.getValue()).toStrictEqual(['1']);
  });

  describe('removeAt', () => {
    it('works properly for in-range positions', () => {
      const newItem = (v: string) => {
        return new FormControl<string>(v);
      };
      const array = new FormArray([newItem('1')], {});
      array.push(newItem('2'));
      array.push(newItem('3'));
      array.push(newItem('4'));
      array.removeAt(1);
      expect(array.getValue()).toStrictEqual(['1', '3', '4']);
      array.removeAt(2);
      expect(array.getValue()).toStrictEqual(['1', '3']);
    });
    it('works gracefully for out-of-bounds positions', () => {
      const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2')], {});

      // remove second item
      array.removeAt(1);
      expect(array.getValue()).toStrictEqual(['1']);

      // does not fail on out-of-range indicies
      array.removeAt(10);
      array.removeAt(-1);
      expect(array.getValue()).toStrictEqual(['1']);

      // remove last present item
      array.removeAt(0);
      expect(array.getValue()).toStrictEqual([]);
    });
  });

  describe('swap', () => {
    it('swaps 2 items', () => {
      const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2')], {});

      // swap 0 <-> 1
      array.swap(0, 1);
      expect(array.getValue()).toStrictEqual(['2', '1']);
      array.swap(0, 1);
      expect(array.getValue()).toStrictEqual(['1', '2']);
    });

    it('ignores out-of-brange positions', () => {
      const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2')], {});
      array.swap(-1, 1);
      expect(array.getValue()).toStrictEqual(['1', '2']);
      array.swap(0, 2);
      expect(array.getValue()).toStrictEqual(['1', '2']);
    });

    it('swaps 2 items in bigger arrays', () => {
      const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2'), new FormControl<string>('3'), new FormControl<string>('4')], {});

      // swap 0 <-> 1
      array.swap(0, 1);
      expect(array.getValue()).toStrictEqual(['2', '1', '3', '4']);
      array.swap(0, 1);
      expect(array.getValue()).toStrictEqual(['1', '2', '3', '4']);
    });
  });

  describe('Iteratable interface is accessible', () => {
    const array = new FormArray([new FormControl<string>('1'), new FormControl<string>('2'), new FormControl<string>('3'), new FormControl<string>('4')], {});
    const values = [];
    for (let control of array.getControls()) {
      values.push(control.getValue());
    }
    expect(values).toStrictEqual(['1', '2', '3', '4']);
  });
});

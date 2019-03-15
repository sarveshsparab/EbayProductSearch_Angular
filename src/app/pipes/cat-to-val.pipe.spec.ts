import { CatToValPipe } from './cat-to-val.pipe';

describe('CatToValPipe', () => {
  it('create an instance', () => {
    const pipe = new CatToValPipe();
    expect(pipe).toBeTruthy();
  });
});

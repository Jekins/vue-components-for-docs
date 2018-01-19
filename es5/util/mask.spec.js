import { test } from '~util/testing';
import { maskText, unmaskText } from './mask';

test('mask.js', function (_ref) {
  var mount = _ref.mount;

  // Mask
  it('should add delimiter', function () {
    expect(maskText('5', '(#')).toBe('(5');
  });

  it('should add delimiter if explicity typed', function () {
    expect(maskText('(', '(#')).toBe('(');
  });

  it('should add delimiters and masks', function () {
    expect(maskText('4567', '(###) #')).toBe('(456) 7');
    expect(maskText('444444444', '#### - #### - #### - ####')).toBe('4444 - 4444 - 4');
    expect(maskText('A314444', 'A## - ####')).toBe('A31 - 4444');
  });

  it('should fill mask blanks', function () {
    expect(maskText('55', '## - ##')).toBe('55 - ');
  });

  it('should not fill mask blanks if told not to', function () {
    expect(maskText('55', '## - ##', true)).toBe('55');
  });

  it('should not fill if no value is provided', function () {
    expect(maskText('', '## - ##')).toBe('');
  });

  it('should only allow exact input if dontFillMaskBlanks is true', function () {
    expect(maskText('4567', '(###) #', true)).toBe('');
    expect(maskText('(456)', '(###) #', true)).toBe('(456)');
  });

  it('should convert alphanumeric to the proper case', function () {
    expect(maskText('aa', 'Aa')).toBe('Aa');
    expect(maskText('AA', 'aa')).toBe('aa');
    expect(maskText('A1', 'Aa')).toBe('A');
    expect(maskText('12abAB', 'NnNnNn')).toBe('12AbAb');
  });

  it('should not fill if wrong value is provided even if it is correct later in mask', function () {
    expect(maskText('a', '#a')).toBe('');
  });

  /* Not sure how to implement this
  it('should not fill in delimiter value if it does not match', () => {
    expect(maskText('a', '(')).toBe('')
  })
  */

  it('should fill last characters if they are all delimiters', function () {
    expect(maskText('1', '#)')).toBe('1)');
    expect(maskText('123', '(###)!!')).toBe('(123)!!');
  });

  // Unmasks
  it('should remove delimiter', function () {
    expect(unmaskText('(5')).toBe('5');
  });

  it('should return proper text length', function () {
    expect(unmaskText('1111')).toBe('1111');
  });

  it('should remove delimiters and masks', function () {
    expect(unmaskText('(123)4')).toBe('1234');
    expect(unmaskText('(456) 7)')).toBe('4567');
    expect(unmaskText('4444 - 4444 - 4')).toBe('444444444');
    expect(unmaskText('A31 - 4444')).toBe('A314444');
  });

  it('should include all possible matching values', function () {
    expect(unmaskText('555')).toBe('555');
  });

  it('should mask numbers', function () {
    expect(maskText(1234, '##.##')).toBe('12.34');
  });
});
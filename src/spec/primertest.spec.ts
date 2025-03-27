describe('Las expectativas pueden tener muchos matchers', () => {
  it('la expectativa tiene que ser positiva', () => {
    expect(true).toBe(true);
  });
  it('o negativa (la podemos negar con .not )', () => {
    expect(false).not.toBe(true);
  });
  it('toBe significa === ', () => {
    const a = 12;
    const b = a;
    expect(a).toBe(b);
    expect(b).not.toBeNull();
  });
  it('y también nos sirve para comprar objetos', () => {
    const foo = { a: 12, b: 34 };
    const bar = { a: 12, b: 34 };
    expect(foo).toEqual(bar);
  });
});

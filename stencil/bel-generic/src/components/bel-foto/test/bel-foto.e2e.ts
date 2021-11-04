import { newE2EPage } from '@stencil/core/testing';

describe('bel-foto', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<bel-foto></bel-foto>');

    const element = await page.find('bel-foto');
    expect(element).toHaveClass('hydrated');
  });
});

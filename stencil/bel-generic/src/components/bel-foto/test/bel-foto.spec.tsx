import { newSpecPage } from '@stencil/core/testing';
import { BelFoto } from '../bel-foto';

describe('bel-foto', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [BelFoto],
      html: `<bel-foto></bel-foto>`,
    });
    expect(page.root).toEqualHtml(`
      <bel-foto>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </bel-foto>
    `);
  });
});

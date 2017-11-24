import React from 'react';
import { renderToString } from 'react-dom/server';
import Masonry, { ResponsiveMasonry } from '../';

describe('server-side rendering', () => {
  it('should render on server', () => {
    const content = 'Custom content inside ResponsiveMasonry wrapper';
    const result = renderToString(<ResponsiveMasonry>
      <Masonry><div>{content}</div></Masonry>
    </ResponsiveMasonry>);

    expect(result.match(RegExp(content))).not.toBeNull();
  })
});

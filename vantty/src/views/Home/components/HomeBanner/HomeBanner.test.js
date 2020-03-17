import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from 'utils/test-utils';
import HomeBanner from './index';

describe('HomeBanner', () => {
  test(`render component`, () => {
    render(
      <MemoryRouter>
        <HomeBanner image="fakeImage" text="Any text" buttonText="Click me" />
      </MemoryRouter>
    );
  });
});

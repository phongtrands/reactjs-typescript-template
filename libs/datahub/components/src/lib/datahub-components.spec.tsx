import { render } from '@testing-library/react';

import DatahubComponents from './datahub-components';

describe('DatahubComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatahubComponents />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import DatahubFeature from './datahub-main';

describe('DatahubFeature', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatahubFeature />);
    expect(baseElement).toBeTruthy();
  });
});

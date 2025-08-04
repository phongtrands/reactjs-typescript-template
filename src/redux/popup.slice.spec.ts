import popupSlice from './popup.slice';

const { actions, reducer } = popupSlice;

describe('popupSlice', () => {
  let initialState: ReturnType<typeof reducer>;

  beforeEach(() => {
    initialState = reducer(undefined, { type: '' });
  });

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      open: false,
      type: '',
      title: '',
      content: '',
      onOk: expect.any(Function),
    });
  });

  it('should handle openPopup with all fields', () => {
    const mockOnOk = jest.fn();
    const payload = {
      type: 'confirm',
      title: 'Confirm delete',
      content: 'Are you sure?',
      onOk: mockOnOk,
    };

    const newState = reducer(initialState, actions.openPopup(payload));

    expect(newState.open).toBe(true);
    expect(newState.type).toBe('confirm');
    expect(newState.title).toBe('Confirm delete');
    expect(newState.content).toBe('Are you sure?');
    expect(newState.onOk).toBe(mockOnOk);
  });

  it('should handle openPopup with partial fields', () => {
    const newState = reducer(initialState, actions.openPopup({}));
    expect(newState.open).toBe(true);
    expect(newState.type).toBe('');
    expect(newState.title).toBe('');
    expect(newState.content).toBe('');
  });

  it('should handle closePopup', () => {
    const openedState = reducer(initialState, actions.openPopup({ type: 'info', title: 'Test', content: 'Content' }));

    const closedState = reducer(openedState, actions.closePopup());

    expect(closedState.open).toBe(false);
    expect(closedState.type).toBe('');
    expect(closedState.title).toBe('');
    expect(closedState.content).toBe('');
  });
});

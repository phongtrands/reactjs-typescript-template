export const MESSAGES = {
  FILE: {
    DOWNLOAD_SUCCESS: 'File download successfully',
    DOWNLOAD_FAILED: 'File download failed',
    REJECT_SUCCESS: 'Reject data successfully',
    REJECT_FAILED: 'Reject data failed',
    TEST_RUN_NO_ERROR: 'Test run data completed with no error',
    TEST_RUN_WITH_ERROR: 'Test run data completed with error',
    ACTUAL_RUN_NO_ERROR: 'Actual run data completed with no error',
    ACTUAL_RUN_WITH_ERROR: 'Actual run data completed with error',
  },
  BANK: {
    NOT_FOUND: 'Bank information not found.',
  },
  CALENDAR: {
    INVALID_FORMAT: 'Invalid format. Correct: YYYY-MM-DD / YYYY-MM-DD or YYYY-MM-DD',
    INVALID_DATE: 'Invalid date',
    INVALID_YEAR: 'Invalid year. Only accepts 1900 - 2100',
    INVALID_RANGE: 'Start date must be before or equal to end date',
  },
};

export const POPUP_MESSAGES = {
  FILE_REJECT: {
    TITLE: 'Files Reject Confirmation',
    CONTENT: 'Do you want to reject these files ?',
  },
  FILE_CONFIRM: {
    TITLE: 'Confirm File Submission',
    CONTENT: 'Press OK to confirm ?',
  },
  FILE_ACTUAL_RUN: {
    TITLE: 'File Run Confirmation',
    CONTENT: 'Do you want to actual run these files ?',
  },
};

const API_V1_PREFIX = '/api/v1';

export const API_URLS = {
  MT940: `${API_V1_PREFIX}/mt940-file`,
  HOST_FILES: `${API_V1_PREFIX}/host-file`,
  BANKS: `${API_V1_PREFIX}/bank`,
  ACCOUNTS: `${API_V1_PREFIX}/account`,

  MATCHING: {
    EPAYMENTS: `${API_V1_PREFIX}/matching-epayment`,
    NON_EPAYMENTS: `${API_V1_PREFIX}/matching-non-epayment`,
  },

  CONFIRMATIONS: {
    SAPFIN: `${API_V1_PREFIX}/confirmations/sapfin`,
  },

  EXCEPTIONS: {
    MT940: `${API_V1_PREFIX}/exception-mt940`,
    HOST_FILES: `${API_V1_PREFIX}/exception-host-file`,
  },

  EXPORTS: {
    CSV: `${API_V1_PREFIX}/export-csv`,
  },
};

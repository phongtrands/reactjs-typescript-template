const API_V1_PREFIX = '/api/v1';

export const API_URLS = {
  MT940: `${API_V1_PREFIX}/mt940-files`,
  HOST_FILES: `${API_V1_PREFIX}/host-files`,
  BANKS: `${API_V1_PREFIX}/banks`,
  ACCOUNTS: `${API_V1_PREFIX}/accounts`,

  MATCHING: {
    EPAYMENTS: `${API_V1_PREFIX}/matching/epayments`,
    NON_EPAYMENTS: `${API_V1_PREFIX}/matching/non-epayments`,
  },

  CONFIRMATIONS: {
    SAPFIN: `${API_V1_PREFIX}/confirmations/sapfin`,
  },

  EXCEPTIONS: {
    MT940: `${API_V1_PREFIX}/exceptions/mt940`,
    HOST_FILES: `${API_V1_PREFIX}/exceptions/host-files`,
  },

  EXPORTS: {
    CSV: `${API_V1_PREFIX}/exports/csv`,
  },
};
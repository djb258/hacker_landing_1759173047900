// API Preview stub - placeholder for future backend integration
export const previewAPI = {
  // Health check endpoint
  health: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: true, status: 'API preview stub working' });
      }, 100);
    });
  },

  // Processes endpoints
  processes: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            ok: true, 
            data: [], 
            message: 'Processes endpoint stub - replace with real API' 
          });
        }, 200);
      });
    },

    getById: async (id: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            ok: true, 
            data: null, 
            message: `Process ${id} endpoint stub - replace with real API` 
          });
        }, 200);
      });
    }
  },

  // Steps endpoints
  steps: {
    getByProcessId: async (processId: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            ok: true, 
            data: [], 
            message: `Steps for process ${processId} endpoint stub - replace with real API` 
          });
        }, 200);
      });
    },

    updateStatus: async (stepId: string, status: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            ok: true, 
            message: `Step ${stepId} status updated to ${status} (stub)` 
          });
        }, 200);
      });
    }
  }
};

export default previewAPI;
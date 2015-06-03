/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['WriteOn App'],
  /**
   * Your New Relic license key.
   */
  // license_key : 'b5851fa3eee6f854687a409d99c58207a3e10f56', //beta
  license_key : '564daf5f302451b8e136e5919ceae2aadd5a4f19', //next

  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  }
};

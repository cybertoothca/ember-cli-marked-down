module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  browser_start_timeout: 60,
  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        '--disable-web-security',
        '--disable-gpu',
        '--headless',
        '--no-sandbox',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  }
};

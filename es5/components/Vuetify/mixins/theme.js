var THEME_DEFAULTS = {
  'vf-primary': '#1976D2',
  'vf-secondary': '#424242',
  'vf-accent': '#82B1FF',
  'vf-error': '#FF5252',
  'vf-info': '#2196F3',
  'vf-success': '#4CAF50',
  'vf-warning': '#FFC107'
};

export default function theme(theme) {
  theme = theme || {};

  return Object.assign({}, THEME_DEFAULTS, theme);
}
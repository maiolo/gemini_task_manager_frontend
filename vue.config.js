// vue.config.js

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/gemini_task_manager_frontend/' // Replace with your actual repository name if deploying to GitHub Pages
      : '/'
}

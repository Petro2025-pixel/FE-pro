const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 1. Точка входа: Наш основной JavaScript-файл (он будет импортировать SCSS)
  entry: './main22_1.js', 
  
  // 2. Выходной файл: Куда Webpack должен собрать бандл
  output: {
    filename: 'main22_1.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  // 3. Модули (Лоадеры): Правила для обработки разных типов файлов
  module: {
  rules: [
    {
        // 1. Правило для SCSS (для ваших стилей)
        test: /\.scss$/, 
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader', 
            'sass-loader', 
        ],
    },
    {
        // 🔥 ДОБАВИТЬ ЭТО ПРАВИЛО: Для импорта обычных CSS-файлов (например, Bootstrap)
        test: /\.css$/, 
        use: [
            MiniCssExtractPlugin.loader, // Также извлекаем в отдельный CSS-файл
            'css-loader', 
        ],
    },
  ],
},
plugins: [
    new MiniCssExtractPlugin({
        filename: 'main22_1.css', 
    }),
    // 🔥 ДОБАВИТЬ ЭТОТ ПЛАГИН:
    new HtmlWebpackPlugin({
        template: './index22_1.html', // Берем ваш исходный HTML
        filename: 'index22_1.html',       // Генерируем его в папке dist
        inject: 'body',                   // Все скрипты и стили будут внедрены автоматически
    }),
],
  // Режим работы
  mode: 'production', // Или 'production' 'development'
};
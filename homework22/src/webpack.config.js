const path = require('path');

module.exports = {
  // 1. Точка входа: Наш основной JavaScript-файл (он будет импортировать SCSS)
  entry: './main22_1.js', 
  
  // 2. Выходной файл: Куда Webpack должен собрать бандл
  output: {
    filename: 'main22_1.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 3. Модули (Лоадеры): Правила для обработки разных типов файлов
  module: {
    rules: [
      {
        test: /\.scss$/, // Регулярное выражение для всех файлов .scss
        use: [
          // 4. Порядок выполнения лоадеров (справа налево / снизу вверх):
          
          // 1. style-loader: Вставляет CSS в DOM
          'style-loader', 
          
          // 2. css-loader: Интерпретирует CSS
          'css-loader', 
          
          // 3. sass-loader: Компилирует SCSS в CSS
          'sass-loader', 
        ],
      },
    ],
  },

  // Режим работы
  mode: 'development', // Или 'production'
};
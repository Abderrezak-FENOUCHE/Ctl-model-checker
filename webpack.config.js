const path=require('path')
const mode=process.env.isDev ?'development':'production'
console.log(mode);
module.exports={
    mode,
    entry:{
        index:'./src/index.js'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'js/[name].js'
 
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          }
        ]
      }
}
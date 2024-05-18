const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias(
        {
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@images': path.resolve(__dirname, 'src/assets/img'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@inputs': path.resolve(__dirname, 'src/components/inputs'),
            '@greenhouse': path.resolve(__dirname, 'src/components/greenhouse'),
        }
    )
);

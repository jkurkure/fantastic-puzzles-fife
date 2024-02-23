var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
    "env": {
        "es6": true
    },

    "ecmaFeatures": {
        // env=es6 doesn't include modules, which we are using
        "modules": true
    },

    "extends": "eslint:recommended",

    "rules":{
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "off",
        "no-undef": "off",
        "no-extra-semi": "off"
      }
};
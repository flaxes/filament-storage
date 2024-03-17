const authService = require("../src/services/auth.service");
const [, , USER, PASS] = process.argv;

console.log(USER, PASS);
authService.registerUser({ username: USER, password: PASS }).then(console.log);

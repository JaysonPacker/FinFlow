const controllers = require("./controllers");
const mid = require("./middleware");
const express = require("express");
const router = express.Router();
router.get("/getIncome", mid.requiresLogin, controllers.Income.getIncomes);
router.post("/addIncome", mid.requiresLogin, controllers.Income.addIncome);
router.delete(
  "/deleteIncome",
  mid.requiresLogin,
  controllers.Income.deleteIncome
);
router.get("/getExpense", mid.requiresLogin, controllers.Expense.getExpenses);
router.post("/addExpense", mid.requiresLogin, controllers.Expense.addExpense);
router.delete(
  "/deleteExpense",
  mid.requiresLogin,
  controllers.Expense.deleteExpense
);
router.get(
  "/getDashboardData",
  mid.requiresLogin,
  controllers.Dashboard.getDashboardData
);

router.post(
  "/login",
  mid.requiresSecure,
  mid.requiresLogout,

  controllers.Account.login
);

router.post(
  "/signup",
  mid.requiresSecure,
  mid.requiresLogout,

  controllers.Account.signup
);

router.post(
  "/updatePassword",
  mid.requiresLogin,
  controllers.Account.updatePassword
);

router.post("/logout", mid.requiresLogin, controllers.Account.logout);
router.post("/verifyLogin", mid.requiresLogin, controllers.Account.verifyLogin);

module.exports = router;

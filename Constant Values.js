const sqlite3 = require('sqlite3').verbose;

var attributes =
(
  function()
  {
    return
    {
      ID: function() { return 0; },
      FIRST_NAME : function() { return 1; },
      LAST_NAME : function() { return 2; },
      AGE : function() {  return 3; },
      GENDER : function() { return 4; },
      PHONE : function() { return 5; },
      EMAIL : function() { return 6; },
      CITY : function() { return 7; },
      USERNAME : function() { return 8; },
      IP_ADDRESS : function() { return 9; },
      LANGUAGE : function() { return 10; },
      CREDIT_CARD_TYPE : function() { return 11; },
      CREDIT_CARD_NUMBER : function() { return 12; },
      ORDERS_PER_MONTHS : function() { return 13; },
      CUSTOMER_LIFETIME_SPENDING : function() { return 14; },
      BUYING_PROBABILITY : function() { return 15; }
  };
}());

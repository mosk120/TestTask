@isTest
private class TestCreateCase {
    @isTest static void test() {
        Test.startTest();
        Account acct1 = new Account(Name='New Acct1', Rating='Cold');
        insert acct1;
        Account acct2 = new Account(Name='New Acct2', Rating='Warm');
        insert acct2;
        Account acct3 = new Account(Name='New Acct3', Rating='Hot');
        insert acct3;
        Test.stopTest();
        System.assertEquals(3, [SELECT Id FROM Case].size());
    }

    @isTest static void testGetAccountList() {
    Test.startTest();
    ContactController.getAccountList(0, 10);
    Test.stopTest();
  }

  @isTest static void testSearchAccount() {
    Test.startTest();
    ContactController.findAccounts('Test');
    Test.stopTest();
  }
}

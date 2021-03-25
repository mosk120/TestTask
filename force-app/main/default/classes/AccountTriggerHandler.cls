public class AccountTriggerHandler extends TriggerHandler {

    public override void afterInsert() {
        List<Case> cases = new List<Case>();
        for (Account acct : (List<Account>) Trigger.new) {
         Case c = new Case(Status = 'Working', Origin = 'New Contact', OwnerId = acct.OwnerId, AccountId = acct.Id);
             if (acct.Rating == 'Hot') {
                c.Priority = 'High';
            } else if (acct.Rating == 'Warm') {
                c.Priority = 'Medium';
            } else if (acct.Rating == 'Cold') {
                c.Priority = 'Low';
            }
            cases.add(c);
        }
        insert cases;
    }
}

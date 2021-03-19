trigger AccountTrigger on Account (after insert) {
    List<Case> cases = new List<Case>();
    for (Account acct : Trigger.new) {
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

        //private static void create method
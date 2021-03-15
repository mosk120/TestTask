trigger CreateCaseTrigger on Account (after insert) {
    if (Trigger.isInsert) {
        List<Case> CaseList = new List<Case>();
        for (Account acct : Trigger.new) {
         Case c = new Case(Status = 'Working', Origin = 'New Contact', OwnerId = acct.OwnerId, AccountId = acct.Id);
             if (acct.Rating == 'Hot') {
                c.Priority = 'High';
            } else if (acct.Rating == 'Warm') {
                c.Priority = 'Medium';
            } else if (acct.Rating == 'Cold') {
                c.Priority = 'Low';
            }
            CaseList.add(c);
            if (CaseList.size() > 0) {
            insert CaseList;
            }
         }
        }
}